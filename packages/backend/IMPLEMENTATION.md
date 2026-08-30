# Brave Search Integration Implementation Guide

## Overview

This document describes the complete implementation of the Brave Search API integration with secure API key management, automatic OpenAPI documentation, and a SvelteKit frontend interface.

## Architecture

### Backend Structure

```
packages/backend/src/
├── integrations/
│   ├── __init__.py
│   └── brave/
│       ├── __init__.py
│       └── brave.py        # Brave Search engine integration
├── models/
│   ├── api_key.py          # SQLAlchemy API Key model
│   └── user.py             # User model (updated with api_keys relationship)
├── services/
│   ├── api_key_service.py  # API key generation, hashing, and validation
│   └── search_service.py   # Search service wrapper around brave integration
├── routers/
│   ├── api_keys.py         # API key management endpoints
│   ├── search.py           # Brave search endpoints
│   └── auth.py             # Authentication endpoints (existing)
├── schemas/
│   ├── api_key.py          # Pydantic models for API key endpoints
│   ├── search.py           # Pydantic models for search endpoints
│   └── auth.py             # Authentication schemas (existing)
├── core/
│   ├── database.py         # Database connection and session
│   ├── security.py         # Password & token hashing
│   ├── dependencies.py     # FastAPI dependencies (updated with API key validation)
│   └── config.py           # Settings and configuration
└── __init__.py

├── alembic/
│   └── versions/
│       └── 902aa1d30985_create_api_keys_table.py  # API keys table migration

main.py                       # FastAPI application entry point
```

### Frontend Structure

```
packages/frontend/src/
├── routes/(app)/dashboard/
│   └── api-keys/
│       └── +page.svelte     # API keys management UI
├── lib/
│   ├── api/
│   │   ├── api-keys.api.ts  # API client for API keys
│   │   └── client.ts        # Base HTTP client (existing)
│   ├── stores/
│   │   └── auth.svelte      # Authentication store (existing)
│   └── components/
│       └── dashboard/       # Dashboard components (existing)
```

## Database Schema

### api_keys Table

```sql
CREATE TABLE api_keys (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    key_hash TEXT NOT NULL UNIQUE,
    key_prefix VARCHAR(8) NOT NULL,
    key_suffix VARCHAR(4) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    last_used_at TIMESTAMP WITH TIME ZONE,
    revoked_at TIMESTAMP WITH TIME ZONE,

    -- Composite indexes for performance
    INDEX ix_api_keys_user_active (user_id, is_active),
    INDEX ix_api_keys_key_hash_active (key_hash, is_active)
);
```

## API Endpoints

### Authentication & Authorization

#### Session-Based (JWT) - For User Management

Used for managing API keys, viewing profile, etc.

```
POST   /auth/register              - Register new user
POST   /auth/login                 - Login with email/password
POST   /auth/refresh               - Refresh JWT token
POST   /auth/logout                - Logout (revoke session)
POST   /auth/email/verify          - Verify email
POST   /auth/password/forgot       - Request password reset
POST   /auth/password/reset        - Reset password
```

**Usage**: Send JWT in Authorization Bearer header or via httpOnly cookie

### API Key Management

#### Generate New API Key

```http
POST /api/api-keys
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Production API Key"
}

Response (201):
{
  "id": "key_123",
  "name": "Production API Key",
  "key": "brave_live_...",  // FULL KEY - shown only once
  "created_at": "2024-08-30T10:15:00Z"
}
```

#### List User's API Keys

```http
GET /api/api-keys
Authorization: Bearer <jwt_token>

Response (200):
{
  "api_keys": [
    {
      "id": "key_123",
      "name": "Production API Key",
      "is_active": true,
      "created_at": "2024-08-30T10:15:00Z",
      "last_used_at": "2024-08-30T11:30:00Z",
      "revoked_at": null
    }
  ],
  "count": 1
}
```

#### Revoke API Key

```http
DELETE /api/api-keys/{key_id}
Authorization: Bearer <jwt_token>

Response (200):
{
  "message": "API key revoked successfully",
  "id": "key_123"
}
```

### Search Endpoints

#### Web Search

```http
POST /api/search/web
X-API-Key: brave_live_...
Content-Type: application/json

{
  "query": "python fastapi",
  "count": 10,
  "region": "us-en",
  "safesearch": "moderate",
  "timelimit": null,
  "page": 1,
  "extraction": false
}

Response (200):
{
  "query": "python fastapi",
  "search_type": "web",
  "results": [
    {
      "title": "FastAPI",
      "url": "https://fastapi.tiangolo.com/",
      "description": "Modern, fast web framework for building APIs with Python",
      "thumbnail_url": null,
      "favicon_url": "https://fastapi.tiangolo.com/favicon.png",
      "page_age": "2024-01-15T12:00:00Z",
      "content": null
    }
  ],
  "count": 1
}
```

#### News Search

```http
POST /api/search/news
X-API-Key: brave_live_...
Content-Type: application/json

{
  "query": "artificial intelligence",
  "count": 5,
  "region": "us-en",
  "timelimit": "d",
  "page": 1,
  "extraction": false
}

Response (200):
{
  "query": "artificial intelligence",
  "search_type": "news",
  "results": [
    {
      "title": "Latest AI Breakthrough",
      "url": "https://example.com/news",
      "source": "TechNews",
      "description": "New AI model achieves breakthrough...",
      "thumbnail_url": "https://example.com/image.jpg",
      "page_age": "2024-08-30T10:00:00Z",
      "content": null
    }
  ],
  "count": 1
}
```

## Security Features

### API Key Management

1. **Generation**
   - Cryptographically secure random key using `secrets.token_urlsafe(32)`
   - Prefix: `brave_live_` for easy identification
   - Format: `brave_live_<base64_encoded_32_bytes>`

2. **Storage**
   - Keys are **hashed using Argon2id** before storage
   - **Never** stored in plaintext in database
   - Hash parameters:
     - Time cost: 2 iterations
     - Memory cost: 64 MB (65536 KiB)
     - Parallelism: 4 threads
     - Hash length: 32 bytes
     - Salt length: 16 bytes

3. **Display Policy**
   - **Full key shown only once** during creation
   - Subsequent views show masked format: `prefix...suffix`
   - Prefix: First 8 characters after `brave_live_`
   - Suffix: Last 4 characters

4. **Validation**
   - Verify API key against stored hash before each request
   - Check `is_active` flag
   - Update `last_used_at` for audit logging
   - Log all key usage

### Authentication

- **Session-based (JWT)**: For user management operations
  - 15-minute access tokens
  - 7-day refresh tokens
  - Stored in httpOnly cookies
  - Signed with HMAC-256

- **API Key-based**: For search operations
  - Submitted via `X-API-Key` header or `Authorization: Bearer <key>` header
  - Validated on every request
  - Associated with specific user
  - Can be revoked instantly

## Implementation Details

### API Key Service (`services/api_key_service.py`)

```python
# Key generation
api_key = generate_api_key()  # Returns: "brave_live_..."

# Key hashing (Argon2id)
hash = hash_api_key(api_key)

# Key verification
is_valid = verify_api_key(api_key, stored_hash)

# Create key in database
api_key, prefix, suffix, key_id = await api_key_service.create_api_key(
    db, user_id, "My Key"
)

# Validate key on request
is_valid, key_record = await api_key_service.validate_api_key(
    db, api_key, user_id=optional
)

# Get user's keys
keys = await api_key_service.get_user_api_keys(db, user_id)

# Revoke key
await api_key_service.revoke_api_key(db, key_id, user_id)

# Delete key
await api_key_service.delete_api_key(db, key_id, user_id)
```

### Search Service (`services/search_service.py`)

Wraps the existing `brave.py` module with:

- Parameter validation
- Logging and error handling
- Consistent error messages

```python
# Web search
results = search_service.search_web(
    query="python fastapi",
    count=10,
    region="us-en",
    safesearch="moderate",
    timelimit=None,
    page=1,
    extraction=False
)

# News search
results = search_service.search_news(
    query="AI",
    count=5,
    region="us-en",
    timelimit="d",
    page=1,
    extraction=False
)

# Validate parameters
is_valid, error_msg = search_service.validate_search_params(
    query, count, timelimit
)
```

### API Key Validation Dependency (`core/dependencies.py`)

Enhanced to include API key validation:

```python
# Existing: get_current_user() - validates JWT
# New: verify_api_key() - validates API key and updates last_used_at

@router.post("/api/search/web")
async def search_web(
    request: SearchRequest,
    key_record = Depends(verify_api_key),  # Validates API key
    db: AsyncSession = Depends(get_db),
):
    # key_record contains the ApiKey database object
    # Can access: key_record.id, key_record.user_id, key_record.is_active, etc.
```

## OpenAPI Documentation

All endpoints are automatically documented in Swagger UI (`/docs`) and ReDoc (`/redoc`).

### Documentation Features

1. **Tags**: Organized by endpoint group
   - Search
   - API Keys
   - Authentication
   - Users
   - Stripe
   - Health

2. **Descriptions**: Comprehensive endpoint descriptions with:
   - Purpose and behavior
   - Request/response examples
   - Error handling
   - Rate limits

3. **Schemas**: Full Pydantic models with:
   - Field descriptions
   - Type information
   - Validation rules
   - Example values

4. **Security Schemes**: Documented authentication methods
   - Bearer Token (JWT)
   - API Key (X-API-Key header)

## Database Migration

### Create API Keys Table

```bash
cd packages/backend
python -m alembic upgrade head
```

Migration file: `alembic/versions/902aa1d30985_create_api_keys_table.py`

Creates:

- `api_keys` table with all fields
- Composite indexes for performance
- Foreign key constraint to users

### Rollback

```bash
python -m alembic downgrade -1
```

## Frontend Integration

### API Client (`lib/api/api-keys.api.ts`)

```typescript
// Generate new key
const response = await apiKeysApi.generateKey('Production');
// Returns: { id, name, key, masked_key, created_at }

// List keys
const response = await apiKeysApi.listKeys();
// Returns: { api_keys: [...], count }

// Delete key
const response = await apiKeysApi.deleteKey(keyId);
// Returns: { message, id }
```

### API Keys Page (`routes/(app)/dashboard/api-keys/+page.svelte`)

Features:

- Generate new API key with custom name
- One-time full key display with copy-to-clipboard
- List all user's API keys with masked display
- Delete/revoke specific keys with confirmation
- Loading states and error handling
- Security warnings and guidance

## Error Handling

### HTTP Status Codes

- **200 OK**: Successful request
- **201 Created**: Resource created (API key generation)
- **400 Bad Request**: Invalid parameters
- **401 Unauthorized**: Missing/invalid authentication
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

### Error Response Format

```json
{
  "detail": "Invalid API key",
  "error_code": "INVALID_KEY"
}
```

## Rate Limiting

- Applied per API key
- Uses `slowapi` library
- Default: 100 requests per minute (configurable)

## Logging

All operations are logged with context:

- API key generation/revocation
- Key validation successes and failures
- Search requests and results
- Errors and exceptions

## Environment Variables

Required in `.env`:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/db

# JWT
JWT_SECRET_KEY=your-secret-key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=15
REFRESH_TOKEN_EXPIRE_DAYS=7

# Optional: Search
PROXY_URL=http://proxy.example.com:8080
```

## Testing

### Test API Key Generation

```bash
curl -X POST http://localhost:8000/api/api-keys \
  -H "Authorization: Bearer <jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Key"}'
```

### Test Web Search

```bash
curl -X POST http://localhost:8000/api/search/web \
  -H "X-API-Key: brave_live_..." \
  -H "Content-Type: application/json" \
  -d '{
    "query": "python",
    "count": 5,
    "safesearch": "moderate"
  }'
```

### Test News Search

```bash
curl -X POST http://localhost:8000/api/search/news \
  -H "X-API-Key: brave_live_..." \
  -H "Content-Type: application/json" \
  -d '{
    "query": "technology",
    "count": 5,
    "timelimit": "d"
  }'
```

## Production Considerations

1. **Security**
   - Use strong JWT secret key
   - Enable HTTPS
   - Use secure cookies
   - Implement rate limiting
   - Monitor key usage

2. **Performance**
   - Database indexes on api_keys table
   - Cache frequently used keys (if applicable)
   - Connection pooling

3. **Monitoring**
   - Log all API key usage
   - Alert on revocation rates
   - Monitor search latency
   - Track error rates

4. **Backup**
   - Regular database backups
   - Backup retention policy
   - Disaster recovery plan

## Troubleshooting

### Migration Issues

If Alembic revision chain is broken:

1. Check migration file `down_revision` values
2. Ensure head revision is correct: `python -m alembic heads`
3. Check current database version: `python -m alembic current`

### API Key Validation Fails

- Verify key format: should start with `brave_live_`
- Check key is active: `is_active = true`
- Confirm user owns key: `user_id` matches
- Check key not revoked: `revoked_at = null`

### Search Returns No Results

- Verify query is not empty
- Check Brave Search availability
- Review error logs for specific error
- Check network connectivity (if using proxy)

## Files Modified/Created

### Created Files

- `src/integrations/__init__.py` - Integrations package
- `src/integrations/brave/__init__.py` - Brave integration package
- `src/integrations/brave/brave.py` - Brave Search engine (relocated)
- `src/models/api_key.py` - API Key model
- `src/services/api_key_service.py` - API key service
- `src/services/search_service.py` - Search service wrapper
- `src/routers/api_keys.py` - API key endpoints
- `src/routers/search.py` - Search endpoints
- `src/schemas/api_key.py` - API key schemas
- `src/schemas/search.py` - Search schemas
- `alembic/versions/902aa1d30985_create_api_keys_table.py` - Database migration
- `packages/frontend/src/lib/api/api-keys.api.ts` - Frontend API client
- `packages/frontend/src/routes/(app)/dashboard/api-keys/+page.svelte` - API keys UI

### Modified Files

- `main.py` - Updated imports (already done in main.py)
- `src/models/user.py` - Added api_keys relationship
- `src/routers/__init__.py` - Added api_keys and search routers
- `src/schemas/__init__.py` - Added API key and search schemas
- `src/services/__init__.py` - Added api_key_service and search_service
- `alembic/env.py` - Updated model imports

### Relocated Files

- `src/services/brave.py` → `src/integrations/brave/brave.py` - Better package organization

## Next Steps

1. Run database migrations: `python -m alembic upgrade head`
2. Test API key generation endpoint
3. Test search endpoints with generated keys
4. Test frontend API keys page
5. Deploy to staging environment
6. Perform load testing
7. Deploy to production
