import express from 'express';
import { AuthService } from '../services/auth';

const authRouter = express.Router();
const authService = new AuthService();

authRouter.post('/register', authService.register);
authRouter.post('/login', authService.login);
authRouter.get('/logout', authService.logout);
authRouter.get('/github', authService.authenticateWithGitHub);
authRouter.get('/github/callback', authService.handleGitHubCallback);

export default authRouter;
