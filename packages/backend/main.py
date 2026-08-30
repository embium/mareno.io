"""FastAPI application entry point with OpenAPI 3.0 documentation support."""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

from core import async_engine, settings
from core.database import Base
from core.queue import close_redis_pool, init_redis_pool
from core.rate_limit import limiter
from models.api_key import ApiKey  # noqa: F401 - registers ApiKey with Base.metadata
from models.user import EmailVerification, Session, User  # noqa: F401 - registers models
from routers import api_keys, auth, search, stripe as stripe_router, users

# Configure logging
logging.basicConfig(
    level=logging.INFO if settings.debug else logging.WARNING,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan events for startup and shutdown."""
    # Startup: Create database tables
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    try:
        await init_redis_pool()
    except Exception as exc:
        logger.warning(f"Redis initialization failed (optional in development): {exc}")

    logger.info("Application started successfully")

    yield

    # Shutdown: Close database connections
    try:
        await close_redis_pool()
    except Exception:
        pass
    await async_engine.dispose()
    logger.info("Application shutdown complete")


# OpenAPI tags metadata for clean Swagger and ReDoc documentation
openapi_tags = [
    {
        "name": "Search",
        "description": "Brave Search API endpoints. Supports web & news search, pagination, time filters, and text extraction. Requires API Key authentication.",
    },
    {
        "name": "API Keys",
        "description": "API Key management endpoints: generate cryptographically secure keys (with one-time full key reveal), list keys with masked previews, and revoke keys.",
    },
    {
        "name": "Authentication",
        "description": "User registration, password login, token refresh, email verification, password reset, and OAuth.",
    },
    {
        "name": "Users",
        "description": "User profile management and account deactivation.",
    },
    {
        "name": "Stripe",
        "description": "Billing and subscription management via Stripe.",
    },
    {
        "name": "Health",
        "description": "Service health check and status endpoints.",
    },
]

# Create FastAPI application with OpenAPI 3.0 configuration
app = FastAPI(
    title="Brave Search & API Platform",
    description="""
# Brave Search & API Platform

High-performance search API powered by Brave Search integration, featuring:

- **API Key Management**: Secure Argon2-hashed API keys with one-time generation reveal and instant revocation.
- **Search Integration**: Web and news search with SafeSearch, region filtering, time limits, and content extraction.
- **Interactive Documentation**: Available via **Swagger UI** (`/docs`) and **ReDoc** (`/redoc`).
- **Standard Authentication**: JWT session-based auth for user management and API keys for programmatic endpoints.
    """,
    version="2.0.0",
    openapi_tags=openapi_tags,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan,
)

# Configure Rate Limiting
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)  # type: ignore
app.add_middleware(SlowAPIMiddleware)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(search.router)
app.include_router(api_keys.router)
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(stripe_router.router)


@app.get("/", tags=["Health"], summary="Root status")
async def root():
    """Root endpoint for health and availability check."""
    return {
        "status": "running",
        "service": "Brave Search & API Platform",
        "version": "2.0.0",
        "docs": "/docs",
        "redoc": "/redoc",
    }


@app.get("/health", tags=["Health"], summary="Health check")
async def health():
    """Health check endpoint returning system operational status."""
    return {"status": "healthy"}
