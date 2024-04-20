import { Router } from 'express'
import { UpdateProductsController } from '../controllers/UpdateProductsController'
import UpdateProductsMiddleware from '../middlewares/UpdateProductsMiddleware';

const router = Router()

router.put('/updateproducts', UpdateProductsMiddleware, UpdateProductsController.contents);

export default router