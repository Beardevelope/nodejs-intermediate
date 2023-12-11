import { Router } from 'express';
import { authRouter } from './auth.router.js';
import { usersRouter } from './users.router.js';
import { productRouter } from './product.router.js';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/products', productRouter);

export { apiRouter };
