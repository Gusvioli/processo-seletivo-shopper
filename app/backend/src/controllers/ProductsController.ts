import { Request, Response, NextFunction } from 'express';
import { ProductsService } from '../services/ProductsService';

export class ProductsController {
  public static async contents(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const contentsAll = await ProductsService.contents(req.body);

      interface IRespostMsg {
        resposta: string,
        msg: string,
      }

      interface INewProductsModel {
        code: number,
        nome: string,
        atualizar: {
          code: number,
          resposta: string,
        },
        new_price: number,
        sales_price: number,
        respeita_as_regras_financeiro: IRespostMsg,
        respeita_as_regras_marketing: IRespostMsg,
        respeita_as_regras_produtos_pacotes: IRespostMsg,
        arquivo_CSV_valido_compras: IRespostMsg,
        campos_necessarios_existem: IRespostMsg,
        produto_informado_existe: IRespostMsg,
        valores_numericos_validos: IRespostMsg,     
      }
      
      const formatar = contentsAll[1].map((item: INewProductsModel) => {        
        return {
          data: item,
          code: item.code,
          name: item.nome,
          sales_price: item.sales_price,
          new_price: item.new_price,
          atualizar: contentsAll[2].filter((itm: INewProductsModel) => itm.code === item.code)[0].atualizar,
          arquivo_CSV_valido_compras: contentsAll[0].filter((item: INewProductsModel) => item.code === item.code).map((item: INewProductsModel) => item.arquivo_CSV_valido_compras)[0],

          campos_necessarios_existem: contentsAll[0].filter((item: INewProductsModel) => item.code === item.code).map((item: INewProductsModel) => item.campos_necessarios_existem)[0],
          
          produto_informado_existe: contentsAll[0].filter((item: INewProductsModel) => item.code === item.code).map((item: INewProductsModel) => item.produto_informado_existe)[0],

          valores_numericos_validos: contentsAll[0].filter((item: INewProductsModel) => item.code === item.code).map((item: INewProductsModel) => item.valores_numericos_validos)[0],

          respeita_as_regras_financeiro: {
            resposta: item.respeita_as_regras_financeiro.resposta,
            msg: item.respeita_as_regras_financeiro.msg,
          },
          respeita_as_regras_marketing: {
            resposta: item.respeita_as_regras_marketing.resposta,
            msg: item.respeita_as_regras_marketing.msg,
          },
          respeita_as_regras_produtos_pacotes: {
            resposta: item.respeita_as_regras_produtos_pacotes.resposta,
            msg: item.respeita_as_regras_produtos_pacotes.msg,
          
          },
        };
      });   

      res.status(200).json(formatar)
    } catch (error) {
      next(error)
    }
  }
}
