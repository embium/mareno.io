"""FastAPI dependencies for authentication, database sessions, and security."""

from typing import Optional, Tuple

from fastapi import Cookie, Depends, Header, HTTPException, Security, status
from fastapi.security import (
    APIKeyHeader,
    HTTPAuthorizationCredentials,
    HTTPBearer,
)
from jose import JWTError
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import get_db
from core.security import token_service
from models.user import User
from services.auth_service import auth_service

# Security schemes for OpenAPI documentation
api_key_header_scheme = APIKeyHeader(
    name="X-API-Key",
    auto_error=False,
    description="API Key authentication via 'X-API-Key' header",
)

bearer_scheme = HTTPBearer(
    auto_error=False,
    description="API Key or Bearer Token via 'Authorization: Bearer <key>' header",
)


async def get_current_user(
    access_token: Optional[str] = Cookie(None),
    auth_credentials: Optional[HTTPAuthorizationCredentials] = Security(
        bearer_scheme
    ),
    db: AsyncSession = Depends(get_db),
) -> User:
    """
    Get current authenticated user from access token cookie or Authorization Bearer header.
    Used for web session authentication (e.g. managing API keys, profile).
    """
    token = access_token
    if not token and auth_credentials:
        token = auth_credentials.credentials

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated. Provide access token cookie or Authorization Bearer header.",
        )

    try:
        user = await auth_service.get_current_user_from_token(db, token)
        return user
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
        )


async def extract_api_key_header(
    x_api_key: Optional[str] = Security(api_key_header_scheme),
    auth_credentials: Optional[HTTPAuthorizationCredentials] = Security(
        bearer_scheme
    ),
    authorization: Optional[str] = Header(None),
) -> str:
    """
    Extract API key from 'X-API-Key' header or 'Authorization: Bearer <key>' / 'Authorization: ApiKey <key>'.
    """
    # 1. Check X-API-Key header
    if x_api_key and x_api_key.strip():
        return x_api_key.strip()

    # 2. Check Bearer credentials
    if auth_credentials and auth_credentials.credentials.strip():
        return auth_credentials.credentials.strip()

    # 3. Check custom Authorization header format (e.g. "ApiKey <key>" or raw key)
    if authorization:
        auth_val = authorization.strip()
        if auth_val.lower().startswith("bearer "):
            return auth_val[7:].strip()
        if auth_val.lower().startswith("apikey "):
            return auth_val[7:].strip()
        if auth_val.startswith("brave_live_"):
            return auth_val

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Missing API key. Provide key via 'X-API-Key' or 'Authorization: Bearer <key>' header.",
        headers={"WWW-Authenticate": "Bearer"},
    )
