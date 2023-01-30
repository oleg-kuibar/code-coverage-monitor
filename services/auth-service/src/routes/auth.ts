import { Router } from 'express';
import {AuthService} from '../services/auth';

const { login, logout, signUp } = new AuthService();
const router = Router();

router.post('/signup', async (req, res) => {
    const user = await signUp(req.body);
    res.status(201).json(user);
});

router.post('/login', async (req, res) => {
    const { token, user } = await login(req.body);
    res.cookie('token', token, { httpOnly: true });
    res.json(user);
});

router.post('/logout', logout);

export default router;
