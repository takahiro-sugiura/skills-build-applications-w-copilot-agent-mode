import { Router } from 'express';
import type { RequestHandler } from 'express';
import { Team } from '../models/team.js';

const router = Router();

const listTeams: RequestHandler = async (_request, response, next) => {
  try {
    const teams = await Team.find().lean();
    response.json(teams);
  } catch (error) {
    next(error);
  }
};

router.get('/', listTeams);

export default router;