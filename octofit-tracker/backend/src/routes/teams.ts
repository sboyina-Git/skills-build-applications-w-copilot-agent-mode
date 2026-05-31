import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/teams/
router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'List teams', teams: [] });
});

// POST /api/teams/
router.post('/', (_req: Request, res: Response) => {
  res.status(201).json({ message: 'Create team' });
});

export default router;
