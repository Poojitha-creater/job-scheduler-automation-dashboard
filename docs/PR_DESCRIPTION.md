Title: feat: MVP Job Scheduler & Automation Dashboard (UI + API + DB + Webhook)

Summary:
This PR delivers a working MVP for the Dotix Job Scheduler & Automation System assignment. It includes a Next.js frontend dashboard, an Express API with Prisma (MySQL) persistence, Docker Compose, and a webhook test integration. Basic tests and UI polish components are included.

Files/areas of interest:
- apps/web: Next.js frontend (pages: index, create, jobs/[id], components)
- services/api: Express API, controllers, Prisma schema, migrations
- prisma: schema.prisma
- docker-compose.yml, .env.example, README.md
- .github/PULL_REQUEST_TEMPLATE.md, CHANGELOG.md

Testing steps:
1. Copy .env.example to .env and set env values
2. docker compose up --build
3. cd services/api && npm install && npx prisma generate && npx prisma migrate dev --name init
4. Visit http://localhost:3000, create a job, run it, and observe webhook logs

Notes:
- Windows PowerShell users: folder names with `&` can break some commands; consider renaming the folder to remove special characters.
