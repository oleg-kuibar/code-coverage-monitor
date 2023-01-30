import { Router } from 'express';
const router = Router();

// get own user data
router.get('/me', async (req, res) => {
    res.json(req.user);
});
