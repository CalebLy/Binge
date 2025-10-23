import express from 'express';
import healthRouter from './routes/health.ts';
const app = express();
const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

app.get('/', (req, res) => {
  console.log('Check #1');
  res.send('Hi');
});

app.use('/health', healthRouter);
