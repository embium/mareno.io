# Mareno.io - Brave Search Integration Platform

A production-ready API platform featuring secure API key management and integrated Brave Search capabilities built with FastAPI, SvelteKit, and PostgreSQL.

## 🎯 Overview

This monorepo contains:

- **Backend** (`packages/backend/`) - FastAPI REST API with Brave Search integration
- **Frontend** (`packages/frontend/`) - SvelteKit dashboard with API key management UI

## 📋 Quick Start

### 1. Backend Setup

```bash
cd packages/backend

# Create virtual environment
python -m venv venv
source venv/Scripts/activate  # or: venv\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Set up environment
cp .env.example .env
# Edit .env with your settings

# Run migrations
python -m alembic upgrade head

# Start server
uvicorn main:app --reload
```

Backend runs at: **http://localhost:8000**

### 2. Frontend Setup

```bash
cd packages/frontend

# Install dependencies
npm install
# or
pnpm install

# Set up environment
cp .env.example .env.local
# Edit .env.local if needed

# Start dev server
npm run dev
# or
pnpm dev
```

Frontend runs at: **http://localhost:5173**

## 🔑 Core Features

### API Key Management
- 🔐 Secure generation with cryptographic randomness
- 🔒 Argon2id hashing (enterprise-grade security)
- 👁️ One-time full key display policy
- 🎭 Masked format on subsequent views (prefix...suffix)
- 📊 Usage tracking and audit logs
- ⏱️ Last-used timestamps

### Search Integration
- 🌐 **Web Search** - Query millions of web pages
- 📰 **News Search** - Latest news articles
- 🔍 **Advanced Filters** - SafeSearch, region, time limits, pagination
- 📄 **Content Extraction** - Optional full-page text extraction
- ⚡ **Fast Performance** - Optimized for speed

### API Documentation
- 📚 **Swagger UI** - Interactive API explorer (`/docs`)
- 📖 **ReDoc** - Beautiful API documentation (`/redoc`)
- 🔄 **Auto-Generated** - Docs sync with code automatically
- 📋 **Complete Coverage** - All endpoints documented with examples

### Authentication
- 🔑 **Session-Based (JWT)** - For user management
- 🎫 **API Key-Based** - For search operations
- 🔄 **Token Refresh** - Automatic token management
- 🛡️ **Secure Cookies** - httpOnly and secure flags

## 📁 Project Structure

```
packages/
├── backend/
│   ├── src/
│   │   ├── integrations/brave/     # Brave Search engine
│   │   ├── models/                 # SQLAlchemy ORM models
│   │   ├── services/               # Business logic
│   │   ├── routers/                # API endpoints
│   │   ├── schemas/                # Pydantic request/response models
│   │   └── core/                   # Config, security, dependencies
│   ├── alembic/                    # Database migrations
│   ├── main.py                     # FastAPI entry point
│   ├── requirements.txt            # Python dependencies
│   ├── pyproject.toml              # Project config
│   └── IMPLEMENTATION.md           # Detailed technical docs
├── frontend/
│   ├── src/
│   │   ├── routes/                 # SvelteKit pages
│   │   ├── lib/
│   │   │   ├── api/                # API clients
│   │   │   ├── components/         # Reusable components
│   │   │   └── stores/             # Svelte stores
│   │   └── app.svelte              # Root layout
│   ├── package.json                # NPM dependencies
│   ├── vite.config.ts              # Vite config
│   └── svelte.config.js            # SvelteKit config
├── QUICKSTART.md                   # Getting started guide
├── IMPLEMENTATION.md               # Technical overview
├── IMPLEMENTATION_SUMMARY.md       # High-level summary
└── DEPLOYMENT_CHECKLIST.md         # Pre-deployment tasks
```

## 🔌 API Endpoints

### Authentication
```
POST   /auth/register              # Register new user
POST   /auth/login                 # Login with credentials
POST   /auth/refresh               # Refresh JWT token
POST   /auth/logout                # Logout (revoke session)
```

### API Key Management
```
POST   /api/api-keys               # Generate new key
GET    /api/api-keys               # List user's keys
DELETE /api/api-keys/{key_id}      # Revoke key
```

### Search
```
POST   /api/search/web             # Web search
POST   /api/search/news            # News search
```

### Health
```
GET    /health                     # Health check
GET    /                           # Root status
```

## 📊 Database Schema

### API Keys Table

```sql
api_keys (
  id            VARCHAR(36) PRIMARY KEY,
  user_id       VARCHAR(36) REFERENCES users(id),
  name          VARCHAR(255),
  key_hash      TEXT UNIQUE,
  key_prefix    VARCHAR(8),
  key_suffix    VARCHAR(4),
  is_active     BOOLEAN,
  created_at    TIMESTAMP,
  last_used_at  TIMESTAMP,
  revoked_at    TIMESTAMP,
  
  -- Indexes for performance
  INDEX (user_id, is_active),
  INDEX (key_hash, is_active)
);
```

## 🔐 Security Features

✅ **Argon2id Hashing** - Industry-standard password/key hashing  
✅ **JWT Authentication** - Secure session tokens  
✅ **API Key Validation** - Per-request verification  
✅ **CORS Protection** - Cross-origin request filtering  
✅ **SQL Injection Prevention** - Parameterized queries  
✅ **XSS Prevention** - Template escaping  
✅ **Rate Limiting** - Per-endpoint/per-key limits  
✅ **Audit Logging** - All operations logged  

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [QUICKSTART.md](./QUICKSTART.md) | Getting started in 5 minutes |
| [IMPLEMENTATION.md](./backend/IMPLEMENTATION.md) | Detailed technical documentation |
| [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) | High-level overview |
| [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) | Pre-deployment verification |
| `/docs` | Interactive Swagger UI |
| `/redoc` | Beautiful ReDoc documentation |

## 🧪 Testing

### Manual Testing

```bash
# 1. Get JWT token
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# 2. Generate API key
curl -X POST http://localhost:8000/api/api-keys \
  -H "Authorization: Bearer <token>" \
  -d '{"name":"My Key"}'

# 3. Search the web
curl -X POST http://localhost:8000/api/search/web \
  -H "X-API-Key: <key>" \
  -d '{"query":"python","count":5}'
```

### View API Docs

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
- OpenAPI Schema: http://localhost:8000/openapi.json

## 🚀 Deployment

See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for complete deployment guide.

### Quick Deploy

```bash
# Backend
cd packages/backend
python -m alembic upgrade head
uvicorn main:app --host 0.0.0.0 --port 8000

# Frontend
cd packages/frontend
npm run build
npm run preview
```

## 📦 Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **Alembic** - Database migrations
- **Argon2** - Secure password hashing
- **pydantic** - Data validation
- **asyncpg** - Async PostgreSQL driver

### Frontend
- **SvelteKit** - Full-stack framework
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Lucide** - Icon library
- **Sonner** - Toast notifications

### Database
- **PostgreSQL** - Primary database
- **Redis** - Optional caching/sessions

## 🛠️ Development

### Backend

```bash
cd packages/backend

# Run with auto-reload
uvicorn main:app --reload

# Run migrations
python -m alembic upgrade head

# Create new migration
python -m alembic revision --autogenerate -m "description"

# View logs
tail -f logs/app.log
```

### Frontend

```bash
cd packages/frontend

# Development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run type checking
npm run check
```

## 📝 Environment Variables

### Backend (.env)

```env
DATABASE_URL=postgresql://user:pass@localhost/dbname
REDIS_URL=redis://localhost:6379
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
VITE_API_TIMEOUT=30000
```

## 🐛 Troubleshooting

### Backend Won't Start
- Check Python version (3.10+)
- Verify virtual environment activated
- Run `pip install -r requirements.txt`
- Check database connection

### Frontend Build Fails
- Delete `node_modules` and `.svelte-kit`
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

### Database Migration Issues
- Check migration files: `python -m alembic current`
- Review error logs carefully
- Verify database permissions
- Check connection string

### API Key Validation Fails
- Ensure key starts with `brave_live_`
- Check key is active (not revoked)
- Verify correct header format
- Check user owns key

### Search Returns No Results
- Verify query is not empty
- Check Brave Search service status
- Review network connectivity
- Check error logs for specifics

## 📞 Support

For issues, questions, or contributions:

1. Check the [documentation](./IMPLEMENTATION.md)
2. Review [QUICKSTART.md](./QUICKSTART.md)
3. Check error logs and OpenAPI docs
4. Review [troubleshooting section](#-troubleshooting)

## 📄 License

[Your License Here]

## 🎉 Credits

Built with ❤️ for the Mareno.io platform.

---

**Version:** 2.0.0  
**Status:** Production Ready ✓  
**Last Updated:** August 30, 2024  

For detailed implementation notes, see [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)
