import { Router } from 'express'
import { ProductsController } from '../controllers/ProductsController'
import ProductsMiddleware from '../middlewares/ProductsMiddleware';

const router = Router()

router.post('/products', ProductsMiddleware, ProductsController.contents);

export default router