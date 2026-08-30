"""Pydantic schemas for API Key endpoints."""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class ApiKeyCreate(BaseModel):
    """Schema for creating a new API key."""

    name: str = Field(
        ...,
        min_length=1,
        max_length=255,
        description="Custom name/label for this API key",
        examples=["Production API Key"],
    )


class ApiKeyCreateResponse(BaseModel):
    """Schema for API key creation response (includes full key, shown only once)."""

    id: str = Field(..., description="API key unique identifier")
    name: str = Field(..., description="Custom name/label for this API key")
    key: str = Field(
        ...,
        description="Full API key (shown only on creation, will not be revealed again)",
    )
    masked_key: str = Field(
        ..., description="Masked key format (prefix...suffix) for reference"
    )
    created_at: datetime = Field(..., description="ISO 8601 creation timestamp")

    class Config:
        """Pydantic config."""
        from_attributes = True


class ApiKeyResponse(BaseModel):
    """Schema for API key list/detail response (masked key, no full key)."""

    id: str = Field(..., description="API key unique identifier")
    name: str = Field(..., description="Custom name/label for this API key")
    masked_key: str = Field(
        ..., description="Masked key format (prefix...suffix) for identification"
    )
    is_active: bool = Field(
        ..., description="Whether this key is active and can be used"
    )
    created_at: datetime = Field(..., description="ISO 8601 creation timestamp")
    last_used_at: Optional[datetime] = Field(
        None, description="ISO 8601 timestamp of last usage, null if never used"
    )
    revoked_at: Optional[datetime] = Field(
        None,
        description="ISO 8601 timestamp when key was revoked, null if still active",
    )

    class Config:
        """Pydantic config."""
        from_attributes = True


class ApiKeyListResponse(BaseModel):
    """Schema for listing all API keys."""

    api_keys: list[ApiKeyResponse] = Field(
        ..., description="List of user's API keys"
    )
    count: int = Field(..., description="Total number of API keys")

    class Config:
        """Pydantic config."""
        from_attributes = True


class ApiKeyDeleteResponse(BaseModel):
    """Schema for delete operation response."""

    message: str = Field(..., description="Confirmation message")
    id: str = Field(..., description="ID of deleted API key")

    class Config:
        """Pydantic config."""
        from_attributes = True
