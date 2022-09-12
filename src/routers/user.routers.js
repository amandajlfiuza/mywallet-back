import express from 'express';
import { postRegister, getCashflow, getBalance, updateStatus, logOut } from '../controllers/user.controllers.js';
import { checkRegister } from '../middlewares/schemas.middlewares.js';
import { checkToken } from '../middlewares/token.middlewares.js';

const userRouter = express.Router();

userRouter.post('/cashflow', checkToken, checkRegister, postRegister);
userRouter.get('/cashflow', checkToken, getCashflow);
userRouter.get('/balance', checkToken, getBalance);
userRouter.post('/status', checkToken, updateStatus);
userRouter.post('/log-out', checkToken, logOut);

export default userRouter;