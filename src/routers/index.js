import express from 'express';
import authRouter from './auth.routers.js';
import userRouter from './user.routers.js';

const router = express.Router();

router.use(authRouter);
router.use(userRouter);

export default router;