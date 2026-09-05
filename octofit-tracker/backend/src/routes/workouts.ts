import { Router } from 'express';
import type { RequestHandler } from 'express';
import { Workout } from '../models/workout.js';

const router = Router();

const listWorkouts: RequestHandler = async (_request, response, next) => {
  try {
    const workouts = await Workout.find().lean();
    response.json(workouts);
  } catch (error) {
    next(error);
  }
};

router.get('/', listWorkouts);

export default router;