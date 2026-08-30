# Quick Start Guide - Brave Search Integration

## Backend Setup

### 1. Database Migration

```bash
cd packages/backend
python -m alembic upgrade head
```

This creates the `api_keys` table with the necessary indexes.

### 2. Start Backend

```bash
cd packages/backend
uvicorn main:app --reload
```

Backend runs at: `http://localhost:8000`

## Testing the API

### 1. Get an Authentication Token

First, register or login to get a JWT token:

```bash
# Register
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "secure_password",
    "name": "Test User"
  }'

# Login
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "secure_password"
  }'

# Response will include access_token
```

### 2. Generate an API Key

```bash
curl -X POST http://localhost:8000/api/api-keys \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-Type: application/json" \
  -d '{"name": "My First API Key"}'

# Response:
# {
#   "id": "key_123",
#   "name": "My First API Key",
#   "key": "brave_live_YOUR_FULL_KEY_HERE",
#   "created_at": "2024-08-30T10:15:00Z"
# }

# IMPORTANT: Store the "key" value securely!
```

### 3. List Your API Keys

```bash
curl -X GET http://localhost:8000/api/api-keys \
  -H "Authorization: Bearer <your_access_token>"

# Response shows all your keys with masked display
```

### 4. Perform a Web Search

```bash
curl -X POST http://localhost:8000/api/search/web \
  -H "X-API-Key: brave_live_YOUR_FULL_KEY_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "python fastapi",
    "count": 5,
    "safesearch": "moderate"
  }'

# Response: JSON with search results
```

### 5. Perform a News Search

```bash
curl -X POST http://localhost:8000/api/search/news \
  -H "X-API-Key: brave_live_YOUR_FULL_KEY_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "artificial intelligence",
    "count": 5,
    "timelimit": "d"
  }'

# Response: JSON with news results
```

### 6. Revoke an API Key

```bash
curl -X DELETE http://localhost:8000/api/api-keys/{key_id} \
  -H "Authorization: Bearer <your_access_token>"
```

## View Interactive Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

These auto-generate from code and show:

- All endpoints with descriptions
- Request/response examples
- Authentication methods
- Schemas and validation rules

## Frontend Setup

### 1. Install Dependencies

```bash
cd packages/frontend
npm install
# or
pnpm install
```

### 2. Start Frontend

```bash
npm run dev
# or
pnpm dev
```

Frontend runs at: `http://localhost:5173`

### 3. Access API Keys Page

1. Navigate to `http://localhost:5173`
2. Register/Login
3. Go to Dashboard → API Keys
4. Create, view, and manage API keys through the UI

## API Key Security Best Practices

1. **Generation**
   - Give each key a descriptive name
   - Generate separate keys for different use cases (dev, prod, testing)

2. **Storage**
   - Store keys in environment variables or secure vault
   - Never commit keys to version control
   - Don't share keys via email or chat

3. **Usage**
   - Use `X-API-Key` header or `Authorization: Bearer` for authentication
   - Keep keys private and rotate periodically
   - Monitor key usage through logs

4. **Revocation**
   - Revoke keys immediately if compromised
   - Delete old keys you no longer use
   - Revocation is permanent and instant

## Search Parameters

### Web Search

```json
{
  "query": "search term", // Required
  "count": 10, // 1-100, default: 10
  "region": "us-en", // Region code, default: us-en
  "safesearch": "moderate", // off, moderate, on - default: moderate
  "timelimit": null, // d, w, m, y - optional
  "page": 1, // Page number, default: 1
  "extraction": false // Fetch full content, default: false
}
```

### News Search

```json
{
  "query": "search term", // Required
  "count": 10, // 1-100, default: 10
  "region": "us-en", // Region code, default: us-en
  "timelimit": null, // d, w, m, y - optional
  "page": 1, // Page number, default: 1
  "extraction": false // Fetch full content, default: false
}
```

### Time Limit Values

- `d` = Past day
- `w` = Past week
- `m` = Past month
- `y` = Past year

### Safe Search Values

- `off` = No filtering
- `moderate` = Balanced filtering (default)
- `on` = Strict filtering

## Troubleshooting

### "Invalid API key" Error

- Verify the full key is correct (starts with `brave_live_`)
- Check key is active (not revoked)
- Ensure you're passing the **full** key, not the masked version
- Try: `X-API-Key: <key>` header format

### "Query must be a non-empty string"

- Ensure query parameter is not empty
- Query must be 1-500 characters

### "Result count must be between 1 and 100"

- Count parameter must be 1-100
- Default is 10 if not specified

### Migration Fails

```bash
# Check current migration status
python -m alembic current

# If stuck, you can downgrade and upgrade
python -m alembic downgrade -1
python -m alembic upgrade head
```

### Frontend Can't Connect to Backend

- Ensure backend is running on port 8000
- Check CORS settings in `.env`
- Verify `FRONTEND_URL` in backend `.env`
- Check browser console for errors

## Environment Variables

### Backend (.env)

```env
DATABASE_URL=postgresql://user:password@localhost:5432/mareno
JWT_SECRET_KEY=your-secret-key-change-in-production
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=15
REFRESH_TOKEN_EXPIRE_DAYS=7
DEBUG=true
FRONTEND_URL=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

### Frontend (.env.local)

```env
VITE_API_URL=http://localhost:8000
```

## Project Files

### Backend Changes

```
packages/backend/
├── src/
│   ├── models/api_key.py                    (NEW)
│   ├── services/api_key_service.py         (NEW)
│   ├── services/search_service.py          (NEW)
│   ├── routers/api_keys.py                 (NEW)
│   ├── routers/search.py                   (NEW)
│   ├── schemas/api_key.py                  (NEW)
│   ├── schemas/search.py                   (NEW)
│   └── models/user.py                      (UPDATED - api_keys relationship)
├── alembic/versions/
│   └── 902aa1d30985_create_api_keys_table.py  (NEW)
└── IMPLEMENTATION.md                        (NEW)
```

### Frontend Changes

```
packages/frontend/src/
├── routes/(app)/dashboard/
│   └── api-keys/+page.svelte              (NEW)
└── lib/api/
    └── api-keys.api.ts                    (NEW)
```

## Next Steps

1. ✅ Run migrations
2. ✅ Start backend
3. ✅ Generate first API key
4. ✅ Test search endpoints
5. ✅ Start frontend
6. ✅ Test API keys UI
7. 📝 Read [IMPLEMENTATION.md](./backend/IMPLEMENTATION.md) for detailed docs
8. 🚀 Deploy to staging
9. 🎉 Deploy to production

## Support

For issues or questions:

1. Check error messages in console/logs
2. Review OpenAPI docs at `/docs`
3. Check [IMPLEMENTATION.md](./backend/IMPLEMENTATION.md)
4. Review code comments in implementation files
