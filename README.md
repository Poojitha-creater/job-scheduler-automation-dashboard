# Job Scheduler & Automation Dashboard

Minimal monorepo for Dotix tech test — Job Scheduler & Automation System.

## Overview
- Next.js frontend (`apps/web`) with Tailwind CSS
- Express API (`services/api`) with Prisma + MySQL
- Docker Compose for local dev (MySQL + API + Web)

## Quickstart
1. Copy `.env.example` to `.env` and set `WEBHOOK_SITE_URL` (e.g. https://webhook.site/<id>)
2. Start with Docker: `docker-compose up --build`
3. In another shell, run Prisma migrate & generate the client:

   - `cd services/api && npm install`
   - `npx prisma generate`
   - `npx prisma migrate dev --name init`

4. Visit `http://localhost:3000` for the dashboard, API runs on `http://localhost:4000`

## API
- POST /jobs
- GET /jobs
- GET /jobs/:id
- POST /run-job/:id
- POST /webhook-test

## Notes
- This is an initial scaffold. Next steps: polish UI, add tests, CI.
