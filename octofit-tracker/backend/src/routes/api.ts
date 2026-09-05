import { Router } from 'express';
import activitiesRouter from './activities.js';
import leaderboardRouter from './leaderboard.js';
import teamsRouter from './teams.js';
import usersRouter from './users.js';
import workoutsRouter from './workouts.js';

const router = Router();

router.use('/users', usersRouter);
router.use('/teams', teamsRouter);
router.use('/activities', activitiesRouter);
router.use('/leaderboard', leaderboardRouter);
router.use('/workouts', workoutsRouter);

export default router;