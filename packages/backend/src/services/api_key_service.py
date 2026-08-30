"""API Key service for secure key generation, storage, and validation."""

import hashlib
import hmac
import secrets
from datetime import datetime, timezone

from sqlalchemy import and_, select
from sqlalchemy.ext.asyncio import AsyncSession

from models.api_key import ApiKey


def generate_api_key() -> str:
    """
    Generate a cryptographically secure API key.

    Format: brave_live_<random_bytes>
    Returns: 64-character API key with prefix
    """
    # Generate 32 bytes of randomness, encode as URL-safe base64
    random_part = secrets.token_urlsafe(32)
    # Prefix with 'live_' for easy identification
    return f"live_{random_part}"


def hash_api_key(api_key: str) -> str:
    """Hash an API key deterministically using SHA-256 for fast indexed lookup."""
    return hashlib.sha256(api_key.encode("utf-8")).hexdigest()


def verify_api_key(api_key: str, hashed_key: str) -> bool:
    """Verify an API key against its hash using constant-time comparison."""
    calculated_hash = hash_api_key(api_key)
    return hmac.compare_digest(calculated_hash, hashed_key)


class ApiKeyService:
    """Service for managing API keys."""

    @staticmethod
    def extract_key_parts(api_key: str) -> tuple[str, str]:
        """
        Extract prefix and suffix from API key for display.

        Prefix: first 8 characters after 'brave_live_'
        Suffix: last 4 characters
        """
        # Remove prefix 'live_' if present
        if api_key.startswith("live_"):
            key_body = api_key[11:]
        else:
            key_body = api_key

        prefix = key_body[:8] if len(key_body) >= 8 else key_body
        suffix = (
            key_body[-4:] if len(key_body) >= 4 else key_body[-len(key_body) :]
        )

        return prefix, suffix

    @staticmethod
    async def create_api_key(
        db: AsyncSession,
        user_id: str,
        name: str,
    ) -> tuple[str, str, str, str]:
        """
        Create and store a new API key.

        Returns: (api_key, key_prefix, key_suffix, key_id)
        api_key: Full key (shown only once)
        key_prefix: First 8 characters (for masking)
        key_suffix: Last 4 characters (for masking)
        key_id: Database ID of the stored key
        """
        # Generate raw API key
        api_key = generate_api_key()

        # Hash the key
        key_hash = hash_api_key(api_key)

        # Extract prefix and suffix
        key_prefix, key_suffix = ApiKeyService.extract_key_parts(api_key)

        # Create database record
        db_key = ApiKey(
            user_id=user_id,
            name=name,
            key_hash=key_hash,
            key_prefix=key_prefix,
            key_suffix=key_suffix,
        )

        db.add(db_key)
        await db.flush()  # Get the ID without committing

        return api_key, key_prefix, key_suffix, str(db_key.id)

    @staticmethod
    async def get_user_api_keys(
        db: AsyncSession,
        user_id: str,
        active_only: bool = True,
    ) -> list[ApiKey]:
        """Get all API keys for a user."""
        query = select(ApiKey).where(ApiKey.user_id == user_id)

        if active_only:
            query = query.where(ApiKey.is_active == True)  # noqa: E712

        query = query.order_by(ApiKey.created_at.desc())

        result = await db.execute(query)
        return list(result.scalars().all())

    @staticmethod
    async def get_api_key_by_id(
        db: AsyncSession,
        key_id: str,
        user_id: str,
    ) -> ApiKey | None:
        """Get a specific API key by ID and user ID."""
        query = select(ApiKey).where(
            and_(ApiKey.id == key_id, ApiKey.user_id == user_id)
        )
        result = await db.execute(query)
        return result.scalar_one_or_none()

    @staticmethod
    async def get_api_key_by_hash(
        db: AsyncSession,
        api_key: str,
    ) -> ApiKey | None:
        """Get API key record by the full key hash."""
        key_hash = hash_api_key(api_key)
        query = select(ApiKey).where(
            and_(
                ApiKey.key_hash == key_hash,
                ApiKey.is_active == True,  # noqa: E712
            )
        )
        result = await db.execute(query)
        return result.scalar_one_or_none()

    @staticmethod
    async def validate_api_key(
        db: AsyncSession,
        api_key: str,
        user_id: str | None = None,
    ) -> tuple[bool, ApiKey | None]:
        """
        Validate an API key.

        Returns: (is_valid, api_key_record)
        is_valid: True if key is valid and active
        api_key_record: The ApiKey object if valid, None otherwise
        """
        key_record = await ApiKeyService.get_api_key_by_hash(db, api_key)

        if not key_record:
            return False, None

        # Check if active
        if not key_record.is_active:
            return False, None

        # Check user_id if provided
        if user_id and key_record.user_id != user_id:
            return False, None

        return True, key_record

    @staticmethod
    async def update_key_last_used(
        db: AsyncSession,
        key_id: str,
    ) -> None:
        """Update the last_used_at timestamp for a key."""
        result = await db.execute(select(ApiKey).where(ApiKey.id == key_id))
        key = result.scalar_one_or_none()

        if key:
            key.update_last_used()

    @staticmethod
    async def revoke_api_key(
        db: AsyncSession,
        key_id: str,
        user_id: str,
    ) -> ApiKey | None:
        """Revoke (deactivate) an API key."""
        result = await db.execute(
            select(ApiKey).where(
                and_(ApiKey.id == key_id, ApiKey.user_id == user_id)
            )
        )
        key = result.scalar_one_or_none()

        if key:
            key.revoke()

        return key

    @staticmethod
    async def delete_api_key(
        db: AsyncSession,
        key_id: str,
        user_id: str,
    ) -> bool:
        """Delete an API key."""
        result = await db.execute(
            select(ApiKey).where(
                and_(ApiKey.id == key_id, ApiKey.user_id == user_id)
            )
        )
        key = result.scalar_one_or_none()

        if key:
            await db.delete(key)
            return True

        return False


# Global service instance
api_key_service = ApiKeyService()
