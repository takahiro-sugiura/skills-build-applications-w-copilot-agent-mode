import { Router } from 'express';
import type { RequestHandler } from 'express';
import { LeaderboardEntry } from '../models/leaderboardEntry.js';

const router = Router();

const listLeaderboardEntries: RequestHandler = async (_request, response, next) => {
  try {
    const entries = await LeaderboardEntry.find().sort({ rank: 1 }).lean();
    response.json(entries);
  } catch (error) {
    next(error);
  }
};

router.get('/', listLeaderboardEntries);

export default router;