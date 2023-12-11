import { Router } from 'express';
import ProductController from '../controller/products.controller.js';
import { needSignin } from '../middlewares/need-signin.middleware.js';

const productRouter = Router();
const productController = new ProductController();

productRouter.post('/', needSignin, productController.createProduct);
productRouter.get('/', productController.getProducts);
productRouter.get('/:productId', productController.getProductById);
productRouter.put('/:productId', needSignin, productController.updatedProduct);
productRouter.delete(
  '/:productId',
  needSignin,
  productController.deleteProduct,
);
export { productRouter };
