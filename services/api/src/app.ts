import express from 'express';
import cors from 'cors';
import jobsRouter from './routes/jobs';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', jobsRouter);

export default app;
