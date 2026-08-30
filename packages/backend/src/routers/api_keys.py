"""API Key management endpoints: generation, listing, and revocation."""

import logging
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import get_db
from core.dependencies import get_current_user
from models.user import User
from schemas.api_key import (
    ApiKeyCreate,
    ApiKeyCreateResponse,
    ApiKeyDeleteResponse,
    ApiKeyListResponse,
    ApiKeyResponse,
)
from services.api_key_service import api_key_service

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/api-keys", tags=["API Keys"])


@router.post(
    "",
    response_model=ApiKeyCreateResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Generate new API key",
    description="""
    Generate a new API key with a custom name.

    **Important**: The full API key is shown **only once** on creation.
    Store it securely immediately. After leaving this endpoint, the key cannot be retrieved again.

    The key uses Argon2id hashing with industry-standard security parameters.
    """,
)
async def generate_api_key(
    request: ApiKeyCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Generate and return a new API key for the authenticated user.

    **Authentication**: Requires valid user session (JWT access token)

    **Request Body**:
    - `name`: Custom label/name for this key (e.g., "Production", "Testing")

    **Response**: Contains full unhashed key (shown **only once**) plus creation metadata

    **Example Usage**:
    ```bash
    curl -X POST http://localhost:8000/api/api-keys \
      -H "Authorization: Bearer <access_token>" \
      -H "Content-Type: application/json" \
      -d '{"name": "Production API Key"}'
    ```
    """
    try:
        # Generate and store the key
        api_key, key_prefix, key_suffix, key_id = (
            await api_key_service.create_api_key(
                db,
                str(current_user.id),
                request.name,
            )
        )

        # Commit to database
        await db.commit()

        logger.info(f"API key generated for user {current_user.id}: {key_id}")

        return ApiKeyCreateResponse(
            id=key_id,
            name=request.name,
            key=api_key,
            masked_key=f"{key_prefix}...{key_suffix}",
            created_at=datetime.now(timezone.utc),
        )

    except Exception as e:
        logger.error(f"Error generating API key: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate API key",
        )


@router.get(
    "",
    response_model=ApiKeyListResponse,
    status_code=status.HTTP_200_OK,
    summary="List user's API keys",
    description="""
    Retrieve all API keys for the authenticated user.

    Displays masked keys (first 8 chars + '...' + last 4 chars) for security.
    Full keys are **never** displayed after creation.
    """,
)
async def list_api_keys(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    List all API keys for the authenticated user.

    **Authentication**: Requires valid user session (JWT access token)

    **Response**: Array of API key objects with masked keys, creation dates, and usage info

    **Example Usage**:
    ```bash
    curl -X GET http://localhost:8000/api/api-keys \
      -H "Authorization: Bearer <access_token>"
    ```

    **Note**: Only shows active keys. Revoked keys are hidden from this list.
    """
    try:
        api_keys = await api_key_service.get_user_api_keys(
            db, str(current_user.id), active_only=True
        )

        api_key_responses = [
            ApiKeyResponse.model_validate(key) for key in api_keys
        ]

        return ApiKeyListResponse(
            api_keys=api_key_responses,
            count=len(api_key_responses),
        )

    except Exception as e:
        logger.error(f"Error listing API keys for user {current_user.id}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve API keys",
        )


@router.delete(
    "/{key_id}",
    response_model=ApiKeyDeleteResponse,
    status_code=status.HTTP_200_OK,
    summary="Delete/revoke an API key",
    description="""
    Revoke and delete an API key.

    Once revoked, the key cannot be used for authentication.
    This action is **permanent** and cannot be undone.
    """,
)
async def delete_api_key(
    key_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Delete/revoke an API key by its ID.

    **Authentication**: Requires valid user session (JWT access token)

    **Path Parameters**:
    - `key_id`: ID of the API key to revoke

    **Response**: Confirmation message

    **Example Usage**:
    ```bash
    curl -X DELETE http://localhost:8000/api/api-keys/{key_id} \
      -H "Authorization: Bearer <access_token>"
    ```

    **Error Handling**:
    - 404: Key not found or belongs to different user
    - 401: User not authenticated
    """
    try:
        # Check if key exists and belongs to current user
        key = await api_key_service.get_api_key_by_id(
            db, key_id, str(current_user.id)
        )

        if not key:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="API key not found",
            )

        # Revoke the key
        await api_key_service.revoke_api_key(db, key_id, str(current_user.id))
        await db.commit()

        logger.info(f"API key {key_id} revoked for user {current_user.id}")

        return ApiKeyDeleteResponse(
            message="API key revoked successfully",
            id=key_id,
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error revoking API key {key_id}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to revoke API key",
        )
