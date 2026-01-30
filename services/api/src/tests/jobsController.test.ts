import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as jobsController from '../controllers/jobsController';
import prisma from '../prisma';
import axios from 'axios';

vi.mock('../prisma', () => ({
  job: {
    create: vi.fn(),
    findMany: vi.fn(),
    findUnique: vi.fn(),
    update: vi.fn()
  },
  webhookLog: {
    create: vi.fn()
  }
}));

vi.mock('axios');

describe('jobsController', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('createJob should create job and return 201', async () => {
    const req: any = { body: { taskName: 't', payload: { a: 1 }, priority: 'High' } };
    const res: any = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    (prisma.job.create as any).mockResolvedValue({ id: 1, ...req.body });
    await jobsController.createJob(req, res);
    expect(prisma.job.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('listJobs should return jobs', async () => {
    const req: any = { query: {} };
    const res: any = { json: vi.fn() };
    (prisma.job.findMany as any).mockResolvedValue([]);
    await jobsController.listJobs(req, res);
    expect(prisma.job.findMany).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith([]);
  });

  it('runJob should set running and trigger webhook', async () => {
    const req: any = { params: { id: '1' } };
    const res: any = { json: vi.fn() };
    (prisma.job.findUnique as any).mockResolvedValue({ id: 1, taskName: 't', priority: 'High', payload: { a: 1 } });
    (prisma.job.update as any).mockResolvedValue({});
    (axios.post as any).mockResolvedValue({ status: 200, data: { ok: true } });

    await jobsController.runJob(req, res);
    expect(prisma.job.update).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ message: 'Job started' });
  });
});
