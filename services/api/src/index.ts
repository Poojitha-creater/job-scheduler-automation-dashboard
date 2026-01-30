import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const port = process.env.API_PORT || 4000;
app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});

export { app };
