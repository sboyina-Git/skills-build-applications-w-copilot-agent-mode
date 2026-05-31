import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/activities/
router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'List activities', activities: [] });
});

// POST /api/activities/
router.post('/', (_req: Request, res: Response) => {
  res.status(201).json({ message: 'Create activity' });
});

export default router;
