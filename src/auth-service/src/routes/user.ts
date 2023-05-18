import express from 'express';
import { UserService } from '../services/user';

const userRouter = express.Router();
const userService = new UserService();

userRouter.get('/:id', userService.getUserById);

export default userRouter;
