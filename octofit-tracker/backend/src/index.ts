import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
const port = Number(process.env.PORT ?? 8000);

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB at', mongoUri);
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Octofit backend', port });
});

app.listen(port, () => {
  console.log(`Octofit backend listening on port ${port}`);
});
