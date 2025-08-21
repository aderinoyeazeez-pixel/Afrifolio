# Afrifolio MVP starter (fixed)

This version fixes the Prisma relation between Collection and Product and includes an idempotent seed.
It also includes a `vercel-build` script so your first Vercel deploy migrates and seeds automatically.

## Zero-local setup deploy
1. Push this repo to GitHub.
2. Create a free Postgres on Neon or Supabase and copy the connection string.
3. In Vercel → Project Settings → Environment Variables, add:
   - `DATABASE_URL`
   - `ADMIN_KEY`
4. In Vercel → Build & Development Settings → Build Command, set:
```
npm run vercel-build
```
5. Deploy. Visit `/admin?key=YOUR_ADMIN_KEY` to approve/feature brands.

## Local run (optional)
- `npm i`
- `.env` with `DATABASE_URL` and `ADMIN_KEY`
- `npm run db:push` then `npm run db:seed`
- `npm run dev`
