import { Router } from 'express';
import {AuthService} from '../services/auth';

const { login, logout, register } = new AuthService();
const router = Router();

router.post('/register', async (req, res) => {
    const user = await register(req.body);
    res.status(201).json(user);
});

router.post('/login', async (req, res) => {
    const { token, user } = await login(req.body);
    res.cookie('token', token, { httpOnly: true });
    res.json(user);
});

router.post('/logout', logout);

export default router;
