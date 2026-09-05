import { Router } from 'express';
import type { RequestHandler } from 'express';
import { User } from '../models/user.js';

const router = Router();

const listUsers: RequestHandler = async (_request, response, next) => {
  try {
    const users = await User.find().lean();
    response.json(users);
  } catch (error) {
    next(error);
  }
};

router.get('/', listUsers);

export default router;