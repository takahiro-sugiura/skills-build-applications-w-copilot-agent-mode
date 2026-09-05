import { Router } from 'express';
import type { RequestHandler } from 'express';
import { Activity } from '../models/activity.js';

const router = Router();

const listActivities: RequestHandler = async (_request, response, next) => {
  try {
    const activities = await Activity.find().lean();
    response.json(activities);
  } catch (error) {
    next(error);
  }
};

router.get('/', listActivities);

export default router;