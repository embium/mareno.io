"""Schemas package - Pydantic models for request/response validation and documentation."""

from schemas.answer import (
    AnswerCitation,
    AnswerRequest,
    AnswerResponse,
    BingAnswerRequest,
    BingAnswerResponse,
    BingCitationSchema,
)
from schemas.api_key import (
    ApiKeyCreate,
    ApiKeyCreateResponse,
    ApiKeyDeleteResponse,
    ApiKeyListResponse,
    ApiKeyResponse,
)
from schemas.auth import (
    ChangePasswordRequest,
    CheckUsernameResponse,
    DeleteAccountRequest,
    ForgotPasswordRequest,
    LoginRequest,
    LoginResponse,
    MessageResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
    RegisterUserRequest,
    RegisterUserResponse,
    ResendVerificationRequest,
    ResetPasswordRequest,
    UpdateUserRequest,
    UserResponse,
    VerifyEmailRequest,
    VerifyEmailResponse,
)
from schemas.common import (
    ErrorResponse,
    ValidationErrorItem,
    ValidationErrorResponse,
)
from schemas.search import (
    SearchRequest,
    SearchResponse,
    SearchResult,
)

__all__ = [
    # API Keys
    "ApiKeyCreate",
    "ApiKeyCreateResponse",
    "ApiKeyResponse",
    "ApiKeyListResponse",
    "ApiKeyDeleteResponse",
    # Search
    "SearchRequest",
    "SearchResponse",
    "SearchResult",
    # Auth
    "RegisterUserRequest",
    "RegisterUserResponse",
    "LoginRequest",
    "LoginResponse",
    "RefreshTokenRequest",
    "RefreshTokenResponse",
    "VerifyEmailRequest",
    "VerifyEmailResponse",
    "ResendVerificationRequest",
    "ForgotPasswordRequest",
    "ResetPasswordRequest",
    "CheckUsernameResponse",
    # User
    "UserResponse",
    "UpdateUserRequest",
    "ChangePasswordRequest",
    "DeleteAccountRequest",
    # Common
    "MessageResponse",
    "ErrorResponse",
    "ValidationErrorItem",
    "ValidationErrorResponse",
    # Answers
    "AnswerCitation",
    "AnswerRequest",
    "AnswerResponse",
    "BingAnswerRequest",
    "BingAnswerResponse",
    "BingCitationSchema",
]
