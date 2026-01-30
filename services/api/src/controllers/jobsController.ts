import { Request, Response } from 'express';
import prisma from '../prisma';
import axios from 'axios';

export async function createJob(req: Request, res: Response) {
  try {
    const { taskName, payload, priority } = req.body;
    const job = await prisma.job.create({
      data: { taskName, payload, priority, status: 'pending' }
    });
    res.status(201).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create job' });
  }
}

export async function listJobs(req: Request, res: Response) {
  try {
    const where: any = {};
    if (req.query.status) where.status = String(req.query.status);
    if (req.query.priority) where.priority = String(req.query.priority);
    const jobs = await prisma.job.findMany({ where, orderBy: { createdAt: 'desc' } });
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to list jobs' });
  }
}

export async function getJob(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch job' });
  }
}

export async function runJob(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const existing = await prisma.job.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: 'Job not found' });

    // set running
    await prisma.job.update({ where: { id }, data: { status: 'running' } });

    // simulate work
    setTimeout(async () => {
      const completedAt = new Date();
      await prisma.job.update({ where: { id }, data: { status: 'completed', completedAt } });

      // trigger webhook
      const webhookUrl = process.env.WEBHOOK_SITE_URL;
      const body = {
        jobId: id,
        taskName: existing.taskName,
        priority: existing.priority,
        payload: existing.payload,
        completedAt
      };
      try {
        const response = await axios.post(webhookUrl || '', body, { timeout: 5000 });
        await prisma.webhookLog.create({ data: { jobId: id, request: body, response: { status: response.status, data: response.data } } });
        console.log('Webhook sent', response.status);
      } catch (err: any) {
        await prisma.webhookLog.create({ data: { jobId: id, request: body, response: { error: err.message } } });
        console.error('Webhook failed', err.message);
      }
    }, 3000);

    res.json({ message: 'Job started' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to run job' });
  }
}

export async function webhookTest(req: Request, res: Response) {
  try {
    console.log('Webhook test received:', req.body);
    res.json({ ok: true, received: req.body });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Webhook test failed' });
  }
}
