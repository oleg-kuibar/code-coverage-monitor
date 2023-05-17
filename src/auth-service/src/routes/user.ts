import express from 'express';
import { UserService } from '../services/user';

const userRouter = express.Router();
const userService = new UserService();

userRouter.get('/:id', userService.getUserById);
userRouter.get('/repositories', userService.getUserRepositories);
userRouter.get('/:id/repositories', userService.getUserRepositoriesById);

export default userRouter;
