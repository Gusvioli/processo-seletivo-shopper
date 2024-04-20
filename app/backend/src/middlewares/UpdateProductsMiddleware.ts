import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/HttpException';
import Joi from 'joi';

const schema = Joi.object({
  product_code: Joi.string().min(0).required(),
  new_price: Joi.string().min(0).required(),
}).required()

const ProductsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validateShema = Joi.array().items(schema).validate(
      req.body,
      { abortEarly: false },
    )
    if (validateShema.error) {
      return res.status(400).json({ error: validateShema.error.message })    
    } else {
      next()
    }
  } catch (error: any) {
    throw new HttpException(400, error.message)
  }
}

export default ProductsMiddleware
