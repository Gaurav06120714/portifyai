# PortifyAI — AI Portfolio Generator

> Turn your resume into a stunning, hosted portfolio in under 60 seconds — powered by Claude AI.

[![CI/CD](https://github.com/Gaurav06120714/portifyai/actions/workflows/deploy.yml/badge.svg)](https://github.com/Gaurav06120714/portifyai/actions)

---

## ✨ Features

- **AI Resume Builder** — 12-step guided form; Claude writes polished bullet points and a professional summary
- **3 Premium Templates** — Aurora, Minimal, Cyber — swap at any time
- **Instant Hosting** — Every portfolio gets a public URL (`portifyai.com/portfolio/your-name`)
- **Free / Pro Plans** — Free: 3 portfolios, 1 template. Pro ($9/mo): unlimited + AI skill suggestions + custom domain
- **Light / Dark / System** theme across the entire UI
- **Clerk Auth** — Google, GitHub, email — passwordless

---

## 🗂 Project Structure

```
portifyai/
├── frontend/          # Next.js 15 App Router (TypeScript)
│   ├── src/app/       # Pages (route groups: marketing, dashboard, auth)
│   ├── src/components/
│   ├── src/context/   # ThemeContext, PlanContext
│   └── src/lib/       # api.ts, posthog.ts, sentry.ts
├── backend/           # FastAPI + SQLAlchemy + Celery
│   ├── app/
│   │   ├── routers/   # auth, resume, portfolio, billing
│   │   ├── services/  # resume_parser, resume_builder, portfolio_generator
│   │   ├── models/    # User, Resume, Portfolio, AIJob
│   │   └── core/      # config, limiter, cache, sentry
│   └── alembic/       # DB migrations
└── .github/workflows/ # CI/CD pipeline
```

---

## 🚀 Local Setup

### Prerequisites

- Node.js 20+
- Python 3.12+
- PostgreSQL 16
- Redis 7

### 1. Clone & install

```bash
git clone https://github.com/Gaurav06120714/portifyai.git
cd portifyai

# Frontend
cd frontend && npm install

# Backend
cd ../backend && python -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"
```

### 2. Environment variables

**`frontend/.env.local`**
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Optional
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
```

**`backend/.env`**
```env
DATABASE_URL=postgresql+asyncpg://user:pass@localhost:5432/portifyai
ANTHROPIC_API_KEY=sk-ant-...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRO_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
CLERK_JWKS_URL=https://<your-clerk-domain>/.well-known/jwks.json
REDIS_URL=redis://localhost:6379/0
SECRET_KEY=change-me-32-chars-minimum
FRONTEND_URL=http://localhost:3000
# Optional
SENTRY_DSN=https://...@sentry.io/...
# Storage (skip for local dev — upload feature disabled without S3)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=
AWS_REGION=us-east-1
```

### 3. Database

```bash
createdb portifyai
cd backend && alembic upgrade head
```

### 4. Run

```bash
# Terminal 1 — Backend
cd backend && uvicorn app.main:app --reload --port 8000

# Terminal 2 — Frontend
cd frontend && npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🌐 Production Deployment

### Frontend → Vercel

1. Import the `frontend/` folder on [vercel.com](https://vercel.com)
2. Add all `NEXT_PUBLIC_*` env vars in the Vercel dashboard
3. Every push to `main` auto-deploys via GitHub Actions

### Backend → Railway

1. Create a new Railway project, add a Postgres + Redis service
2. Set all backend env vars in Railway Variables
3. Railway reads `backend/railway.toml` and builds from `backend/Dockerfile`

### GitHub Actions Secrets

Add these in **Settings → Secrets → Actions**:

| Secret | Description |
|--------|-------------|
| `RAILWAY_TOKEN` | Railway API token |
| `VERCEL_TOKEN` | Vercel API token |
| `VERCEL_ORG_ID` | Vercel org ID |
| `VERCEL_PROJECT_ID` | Vercel project ID |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk pub key (for CI build) |
| `NEXT_PUBLIC_API_URL` | Production API URL |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog (optional) |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry (optional) |

---

## 🔑 API Overview

```
POST   /api/v1/resume/build           Build resume from form (rate: 10/min)
POST   /api/v1/resume/suggest-skills  AI skill suggestions (rate: 10/min)
POST   /api/v1/resume/upload          Upload PDF/DOCX
GET    /api/v1/resume/                List resumes

POST   /api/v1/portfolio/generate     Generate portfolio (rate: 10/min)
GET    /api/v1/portfolio/{id}/status  Poll generation status
GET    /api/v1/portfolio/p/{slug}     Public portfolio (cached 1hr)
PUT    /api/v1/portfolio/{id}/publish Toggle publish
GET    /api/v1/portfolio/sitemap      Public slugs for sitemap.xml

POST   /api/v1/billing/create-checkout  Stripe checkout session
GET    /api/v1/billing/status           Subscription status
GET    /api/v1/billing/portal           Customer portal URL

GET    /health                          Liveness probe
```

Swagger UI (dev only): [http://localhost:8000/api/v1/docs](http://localhost:8000/api/v1/docs)

---

## 🛡 Production Hardening

- **Rate limiting** — SlowAPI: 10 req/min on all AI endpoints
- **Redis caching** — Public portfolios cached 1hr, sitemap 24hr
- **Security headers** — HSTS, CSP, X-Frame-Options, Permissions-Policy
- **Image optimization** — Uploads compressed to WebP via Pillow before S3
- **Sentry** — Error tracking on both frontend and backend
- **PostHog** — User analytics with Clerk auto-identification
- **Clerk JWKS** — RS256 JWT verification, auto-create users on first API call

---

## 🎥 60-Second Demo Script

> Record with Loom or QuickTime. Narrate each step as you go.

| Time | Action |
|------|--------|
| 0–5s | Open portifyai.com — show hero + "Generate free" CTA |
| 5–15s | Sign up with Google (Clerk modal) → land on Dashboard |
| 15–25s | Click "AI Resume Builder" → fill Name, Years, 1 job, 1 project |
| 25–35s | Skip to step 12 "What roles are you targeting?" → click Build |
| 35–45s | Watch generating screen with live status update |
| 45–55s | Portfolio appears — scroll through sections, show public URL |
| 55–60s | Open pricing → show Pro plan → end on "Start free" CTA |

**Hook line:** *"I built my entire portfolio in 45 seconds — here's how."*

---

## 🧪 Testing

```bash
# Backend
cd backend && pytest -x -q

# Frontend lint + types
cd frontend && npx next lint && npx tsc --noEmit
```

---

## 📄 License

MIT © 2025 [Gaurav06120714](https://github.com/Gaurav06120714)
