import { Router } from 'express';
import * as jobsController from '../controllers/jobsController';

const router = Router();

router.post('/jobs', jobsController.createJob);
router.get('/jobs', jobsController.listJobs);
router.get('/jobs/:id', jobsController.getJob);
router.post('/run-job/:id', jobsController.runJob);
router.post('/webhook-test', jobsController.webhookTest);

export default router;
