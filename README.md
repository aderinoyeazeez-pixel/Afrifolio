# Afrifolio MVP starter

A minimal Next.js App Router + Prisma + Tailwind project to demo Afrifolio.
It ships with brands and products, creator apply flow, local cart, and a basic admin view.

## Quick start

1. Clone repo and install
```
pnpm i
# or npm i
```

2. Set up database
- Create a free Postgres on Neon or Supabase
- Copy the connection string
- Create `.env` at project root and set:
```
DATABASE_URL="your-connection-string"
ADMIN_KEY="choose-a-secret"
```

3. Push schema and seed
```
npm run db:push
npm run db:seed
```

4. Run locally
```
npm run dev
```

5. Deploy to Vercel
- Create a new Vercel project from this repo
- Add the same env vars in Vercel project settings
- Trigger a deploy
- Visit `/admin?key=YOUR_ADMIN_KEY` to approve or feature brands

## What is included
- Next.js 14 App Router
- Prisma ORM with Postgres
- TailwindCSS
- Pages: Home, Brands, Brand detail, Product detail, Creator Apply, Cart, Admin
- API endpoint for product detail
- Seed data

## Notes
- Cart uses localStorage for demo checkout
- Payments, email and file uploads are not wired yet
- Add providers later when you want to show those flows


## Zero-local setup deploy (no local run)
If you want to skip running locally:
1. Push this repo to GitHub.
2. Create a free Postgres on Neon or Supabase and copy the connection string.
3. In Vercel project settings, set environment variables:
   - `DATABASE_URL` (your connection string)
   - `ADMIN_KEY` (any secret for /admin access)
4. In Vercel → Build & Development Settings → **Build Command**, set:
```
npm run vercel-build
```
This will run database migrations and an idempotent seed automatically on first deploy, then build the app.
5. Deploy. Your app should come up with demo data. Visit `/admin?key=YOUR_ADMIN_KEY` for approvals/featuring.
