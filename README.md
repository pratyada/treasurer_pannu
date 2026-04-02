# TreasuryPulse India

India's premier treasury intelligence platform for junior finance professionals.
Curated daily by Pranav — Finance & Treasury Leader.

## What is TreasuryPulse?

A niche ₹50/month subscription platform with two sections:
- **Daily News** — RBI/SEBI updates, forex, G-sec, money market news (free + paid)
- **Insider Section** — Pranav's original analysis, frameworks, career insights (paid only)

Future: Treasury-only Job Board, LinkedIn auto-posting, and a book research database.

---

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Database**: Prisma ORM + SQLite (dev) / PostgreSQL (prod)
- **Auth**: NextAuth.js (admin login via email/password)
- **Payments**: Razorpay (₹50/month, UPI AutoPay)
- **Scrapers**: Python (RBI, SEBI, RSS) + GitHub Actions (daily 6 AM IST)

---

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/pratyada/treasurer_pannu.git
cd treasurer_pannu
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env.local
```

Edit `.env.local` — fill in admin credentials and Razorpay test keys.

Generate secrets:
```bash
openssl rand -base64 32   # for NEXTAUTH_SECRET
openssl rand -hex 32      # for SCRAPER_API_KEY
```

### 3. Database Setup

```bash
npx prisma migrate dev --name init
npm run db:seed
```

### 4. Run

```bash
npm run dev
```

- App: http://localhost:3000
- Admin: http://localhost:3000/admin

---

## Admin Panel

Log in at `/admin/login` with your `ADMIN_EMAIL` + `ADMIN_PASSWORD`.

| Page | What you can do |
|---|---|
| Dashboard | Subscriber count, revenue, recent articles |
| Write Article | Publish Daily News or Insider articles with rich editor |
| Scraped Drafts | Review auto-scraped content, approve or reject |
| Subscribers | View all subscribers and monthly revenue |
| LinkedIn Generator | Generate LinkedIn posts from articles |
| Jobs Board | Manage treasury job postings |

---

## Python Scrapers

Scrapers run automatically via GitHub Actions at 6 AM IST daily.
All scraped content goes to Admin → Drafts for Pranav's review.

### Manual Run

```bash
cd scrapers
pip install -r requirements.txt
cp .env.example .env   # Add APP_URL and SCRAPER_API_KEY

python3 rbi_scraper.py       # RBI notifications
python3 sebi_scraper.py      # SEBI circulars
python3 rss_aggregator.py    # Financial news RSS
python3 push_to_db.py        # Push to app
```

### GitHub Actions Secrets

Add in repo Settings → Secrets → Actions:

| Secret | Value |
|---|---|
| `APP_URL` | Your deployed URL |
| `SCRAPER_API_KEY` | Must match `.env.local` value |

---

## Deploy to Vercel

```bash
npm i -g vercel && vercel --prod
```

For production DB: use Supabase (free PostgreSQL) and update `DATABASE_URL`.

---

## Razorpay Production Setup

1. Apply at razorpay.com, complete KYC
2. Get live keys from Dashboard
3. Add webhook: `https://your-domain.com/api/razorpay/webhook`
4. Enable events: `payment.captured`, `subscription.cancelled`

---

## Roadmap

- [x] Phase 1: Blog + Subscription + Admin Panel + Scrapers + LinkedIn Generator
- [ ] Phase 2: Claude AI summarization, Razorpay recurring mandates, email newsletter
- [ ] Phase 3: Treasury Job Board, book chapter export
- [ ] Phase 4: Mobile app

---

*TreasuryPulse India — All rights reserved.*
