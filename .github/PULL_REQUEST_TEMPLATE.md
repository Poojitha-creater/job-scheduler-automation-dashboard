## Summary

Short description of the changes in this PR.

## What changed
- Implement frontend (Next.js) pages: Dashboard, Create Job, Job detail
- Implement backend (Express + Prisma) endpoints: POST /jobs, GET /jobs, GET /jobs/:id, POST /run-job/:id, POST /webhook-test
- Database: Prisma schema and migration for `Job` and `WebhookLog`
- Docker Compose for local dev (MySQL + API + Web)
- UI polish: Layout, Button, Badge components, improved tables and loading states
- Tests: Vitest skeletons for API controllers and frontend components

## Checklist
- [ ] Code is formatted and linted
- [ ] Tests added / updated
- [ ] Documentation updated (README)
- [ ] E2E smoke tested locally (create job → run job → webhook logged)

## How to test locally
1. Copy `.env.example` → `.env` and set `WEBHOOK_SITE_URL` (or use `http://localhost:4000/webhook-test` for local tests)
2. Start services: `docker compose up --build`
3. In `services/api`: `npm install && npx prisma generate && npx prisma migrate dev --name init`
4. Visit `http://localhost:3000` and exercise the UI. Create a job and click `Run` to validate webhook logs in DB.

## Notes
- Repository folder containing `&` or spaces may cause issues running tests on Windows PowerShell; consider renaming to `Job-Scheduler-Automation-Dashboard`.
- If you want I can open the PR on GitHub for you — provide the remote repo URL or add it to `origin` and I’ll push the branch.
