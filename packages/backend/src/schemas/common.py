"""Common schemas for standard API responses and errors."""

from typing import Any, List, Optional
from pydantic import BaseModel, Field


class ErrorResponse(BaseModel):
    """Standard error response."""

    detail: str = Field(
        ...,
        description="Detailed description of the error",
        examples=["Invalid authentication credentials"],
    )


class ValidationErrorItem(BaseModel):
    """Validation error detail."""

    loc: List[Any] = Field(..., description="Location of the validation error")
    msg: str = Field(..., description="Error message")
    type: str = Field(..., description="Error type identifier")


class ValidationErrorResponse(BaseModel):
    """Request validation error response."""

    detail: List[ValidationErrorItem] = Field(
        ..., description="List of validation errors"
    )


class MessageResponse(BaseModel):
    """Generic success message response."""

    message: str = Field(
        ...,
        description="Status or operation message",
        examples=["Operation completed successfully"],
    )
