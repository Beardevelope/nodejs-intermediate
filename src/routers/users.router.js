import { Router } from 'express';
import { needSignin } from '../middlewares/need-signin.middleware.js';
import userController from '../controller/user.contoller.js';

const usersRouter = Router();
const UserController = new userController();

usersRouter.get('/me', needSignin, UserController.getUserInfo);
export { usersRouter };
