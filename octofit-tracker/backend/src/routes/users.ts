import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/users/
router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'List users', users: [] });
});

// POST /api/users/
router.post('/', (_req: Request, res: Response) => {
  res.status(201).json({ message: 'Create user' });
});

export default router;
