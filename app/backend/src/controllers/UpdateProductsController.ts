import { Request, Response, NextFunction } from 'express';
import { UpdateProductsService } from '../services/UpdateProductsService';

export class UpdateProductsController {
  public static async contents(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {

      const updateContentsAll = await UpdateProductsService.contents(req.body);
      if (updateContentsAll === null || updateContentsAll === undefined) {
        return res.status(404).json({
          mensagem: 'Not found'
        })
      }
      res.status(200).json({
        mensagem: 'Produto(s) atualizado(s) com sucesso',
        updateContentsAll
      })
    } catch (error) {
      next(error)
    }
  }
}
