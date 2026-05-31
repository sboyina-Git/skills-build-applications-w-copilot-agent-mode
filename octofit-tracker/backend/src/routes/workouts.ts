import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/workouts/
router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'List workouts', workouts: [] });
});

// POST /api/workouts/
router.post('/', (_req: Request, res: Response) => {
  res.status(201).json({ message: 'Create workout' });
});

export default router;
