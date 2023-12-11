import { Router } from 'express';
import AuthController from '../controller/auth.contoller.js';

const authRouter = Router();
// const productRouter = Router();
const authController = new AuthController();

authRouter.post('/signup', authController.signup);
authRouter.post('/signin', authController.signin);

export { authRouter };
