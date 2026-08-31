import logging

from fastapi import Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import get_db
from core.dependencies import extract_api_key_header
from services.api_key_service import api_key_service

logger = logging.getLogger(__name__)

async def verify_api_key(
    api_key: str = Depends(extract_api_key_header),
    db: AsyncSession = Depends(get_db),
):
    """
    Dependency to verify API key is valid and active.

    Validates the key and updates last-used timestamp for audit logging.
    """
    is_valid, key_record = await api_key_service.validate_api_key(db, api_key)

    if not is_valid or not key_record:
        logger.warning(
            f"Invalid or expired API key attempted: {api_key[:20]}..."
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or revoked API key",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Update last-used timestamp for audit logging
    try:
        await api_key_service.update_key_last_used(db, str(key_record.id))
        await db.commit()
    except Exception as e:
        logger.error(f"Failed to update key last-used timestamp: {e}")
        # Don't fail the request for this
        pass

    return key_record