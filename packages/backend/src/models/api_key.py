"""API Key model for programmatic API authentication."""

from datetime import datetime, timezone
from typing import TYPE_CHECKING, Optional
from uuid import uuid4

from sqlalchemy import Boolean, DateTime, ForeignKey, String, Text, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.database import Base

if TYPE_CHECKING:
    from models.user import User


class ApiKey(Base):
    """API Key model for user programmatic access."""

    __tablename__ = "api_keys"

    # Fields
    id: Mapped[str] = mapped_column(String(36), primary_key=True, index=True)
    user_id: Mapped[str] = mapped_column(
        String(36),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    name: Mapped[str] = mapped_column(
        String(255), nullable=False, index=True
    )
    key_hash: Mapped[str] = mapped_column(Text, nullable=False, unique=True)
    key_prefix: Mapped[str] = mapped_column(
        String(8), nullable=False, index=True
    )
    key_suffix: Mapped[str] = mapped_column(String(4), nullable=False)
    is_active: Mapped[bool] = mapped_column(
        Boolean, default=True, nullable=False, index=True
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
        index=True,
    )
    last_used_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), nullable=True, index=True
    )
    revoked_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), nullable=True
    )

    # Relationships
    user: Mapped["User"] = relationship("User", back_populates="api_keys")

    # Indexes for performance
    __table_args__ = (
        Index("ix_api_keys_user_active", "user_id", "is_active"),
        Index("ix_api_keys_key_hash_active", "key_hash", "is_active"),
    )

    def __init__(
        self,
        user_id: str,
        name: str,
        key_hash: str,
        key_prefix: str,
        key_suffix: str,
        id: Optional[str] = None,
        **kwargs,
    ):
        """Initialize API key."""
        super().__init__(
            id=id or str(uuid4()),
            user_id=user_id,
            name=name,
            key_hash=key_hash,
            key_prefix=key_prefix,
            key_suffix=key_suffix,
            is_active=True,
            created_at=datetime.now(timezone.utc),
            last_used_at=None,
            revoked_at=None,
            **kwargs,
        )

    def revoke(self) -> None:
        """Revoke the API key."""
        self.is_active = False
        self.revoked_at = datetime.now(timezone.utc)

    def update_last_used(self) -> None:
        """Update last_used_at timestamp."""
        self.last_used_at = datetime.now(timezone.utc)

    @property
    def masked_key(self) -> str:
        """Return masked key format for display: prefix...suffix."""
        return f"{self.key_prefix}...{self.key_suffix}"

    def get_masked_key(self) -> str:
        """Return masked key format for display: prefix...suffix."""
        return self.masked_key

    def __repr__(self) -> str:
        return f"<ApiKey(id={self.id}, user_id={self.user_id}, name={self.name}, masked={self.get_masked_key()})>"
