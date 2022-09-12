import express from 'express';
import { createUser, postLogin } from '../controllers/auth.controllers.js';
import { checkNewUser, checkUserLogin } from '../middlewares/schemas.middlewares.js';

const authRouter = express.Router();

authRouter.post('/auth/sign-up', checkNewUser, createUser);
authRouter.post('/auth/sign-in', checkUserLogin, postLogin);

export default authRouter;