import HttpException from '../utils/HttpException';
import { ProductsModel } from '../models/ProductsModel';
import { PacksModel } from '../models/PacksModel';

interface IProductsModel {
    [x: string]: any;
    code: number,
    nome: string,
    name?: string,
    cost_price: number,
    sales_price: number,
}

interface IPacksModel {
    pack_id: number,
    product_id: number,
    qty: number,
}

export class ProductsService {
    public static async contents(body: any): Promise<IProductsModel[]> {
        const contentsProducts = await ProductsModel.findAll() as IProductsModel[];
        const contentsPacks = await PacksModel.findAll() as IPacksModel[];

        if (contentsProducts === null || contentsProducts === undefined) {
            throw new HttpException(404, 'Not found')
        }
        
        const soma_new_pack = (item: any) => {
            const v = item.pack_id.map((array: any) => {
                return array.map((item: any) => ({
                    cost_price: Number(item.cost_price),
                    sales_price: Number(item.sales_price),
                    new_price: Number(item.new_price) || 0,
                    qty: item.qty,        
                }));
            });
            const v2 =  v.map((array: any) => {
                return array.reduce((acc: number, item: any) => {
                    acc += (item.sales_price * item.qty);
                    return acc;
                }, 0);
            });
            return Number(v2.reduce((total: number, valor: number) => total + valor, 0).toFixed(2));
        };
        
        const pack_price_total = (item: any) => {
            const filtrarSalesPrice = () => {
                return item.pack_id
                .map((array: any) => {
                    return array
                    .map((item: any) => ({
                        sales_price: Number(item.sales_price),
                        new_price: item.new_price,
                        qty: item.qty,        
                    }));
                })
                .flat()
                .filter((item: any) => !item['new_price'])
                .reduce((acc: number, item: any) => {
                    acc += (item.sales_price * item.qty);
                    return acc;
                }, 0);
            };
            const filtrarNewPrice = () => {
                return item.pack_id
                .map((array: any) => {
                    return array
                    .map((item: any) => ({
                        sales_price: Number(item.sales_price),
                        new_price: Number(item.new_price),
                        qty: item.qty,        
                    }));
                })
                .flat()
                .filter((item: any) => item['new_price'])
                .reduce((acc: number, item: any) => {
                    acc += (item.new_price * item.qty);
                    return acc;
                }, 0);
            };
            return Number((filtrarSalesPrice() + filtrarNewPrice()).toFixed(2));
        };
        
        const isPriceTenPercentHigher = (item: any) => {
            const newPrice = Number(item.new_price);
            const salesPrice = Number(item.sales_price);
            const expectedPrice = Number((salesPrice * 1.1).toFixed(2));
            return newPrice == expectedPrice;
        };
        
        const isNewPriceHigherOrEqualCostPrice = (item: any) => Number(item.new_price) >= Number(item.cost_price);
        
        const isValidPrice = (item: any) => !isNaN(Number(item.product_code)) && item.new_price.includes(".");
        
        const doesProductExist = (products: any, productCode: any) => products.some((product: any) => product.code === Number(productCode));
        
        const itensComuns = contentsProducts
            .filter((objeto1) =>
                body
                    .some((objeto2: { product_code: string }) => objeto2.product_code === String(objeto1.code))
            )
            .map((item: any) => ({
                code: item.code,
                nome: item.name,
                cost_price: item.cost_price,
                sales_price: item.sales_price,
                new_price: body.find((so: { product_code: string }) => so.product_code === String(item.code)).new_price,
                pack_id: contentsPacks
                    .filter((pack: any) => pack.pack_id === item.pack_id)
                    .map((pack: any) => contentsProducts
                        .filter((item) =>
                            item.code === pack.product_id)
                        .map((ma) => ({
                            code: ma.code,
                            nome: ma.name,
                            cost_price: ma.cost_price,
                            sales_price: ma.sales_price,
                            new_price: body.find((so: { product_code: string }) => so.product_code === String(ma.code))?.new_price,
                            qty: pack.qty,
                        }))
                    ),
                qty: item.qty,
            }));

        const outBodyValidacoesCSV = body.map((item: any) => ({
            product_code: item.product_code,
            new_price: item.new_price,
            arquivo_CSV_valido_compras: {
                resposta: item.new_price !== '' && item.product_code !== ''
                && doesProductExist(contentsProducts, item.product_code,)
                && isValidPrice(item)
                ? 'sim' : 'não',
                msg: item.new_price !== '' && item.product_code !== ''
                && doesProductExist(contentsProducts, item.product_code,)
                && isValidPrice(item) ? 'Arquivo CSV Válido' : 'Arquivo CSV Inválido'
            },
            campos_necessarios_existem: {
                resposta: item.new_price || item.product_code  ? 'sim' : 'não',
                msg: item.new_price || item.product_code ? 'Campos necessários existem' : 'Campos necessários não existem'
            },
            produto_informado_existe: {
                resposta: doesProductExist(contentsProducts, item.product_code,) ? 'sim' : 'não',
                msg: doesProductExist(contentsProducts, item.product_code,) ? 'Produto informado existe' : 'Produto informado não existe'
            },
            valores_numericos_validos: {
                resposta: isValidPrice(item) ? 'sim' : 'não',
                msg: isValidPrice(item) ? 'Valores numéricos válidos' : 'Valores numéricos inválidos'
            },
        }
        ));

        const outBodyRegras = itensComuns.map((item: any, index: number) => ({
            code: item.code,
            nome: item.nome,
            cost_price: item.cost_price,
            sales_price: item.sales_price,
            new_price: item.new_price,
            packs: item.pack_id,
            soma_new_pack: soma_new_pack(item),
            qty: item.qty,
            pack_price_total: pack_price_total(item),
            respeita_as_regras_financeiro: {
                resposta: isNewPriceHigherOrEqualCostPrice(item) ? 'sim' : 'não',
                msg: isNewPriceHigherOrEqualCostPrice(item) ? 'Respeita as regras financeiras(O novo preço de venda é maior ou igual ao custo)' : 'Não respeita as regras financeiras(O novo preço de venda é menor que o custo)'
            },
            respeita_as_regras_marketing: {
                resposta: isPriceTenPercentHigher(item) ? 'sim' : 'não',
                msg: isPriceTenPercentHigher(item) ? 'Respeita as regras de marketing(O novo preço de venda não pode ser diferente de 10% do preço atual de venda)' : 'Não respeita as regras de marketing(O novo preço de venda não pode ser diferente de 10% do preço atual de venda)'
            },            
            respeita_as_regras_produtos_pacotes: {
                resposta: soma_new_pack(item) <= pack_price_total(item) ? 'sim' : 'não',
                msg: soma_new_pack(item) <= pack_price_total(item) ? 'Respeita as regras de produtos e pacotes(O preço total dos pacotes é diferente do preço de venda)' : 'Não respeita as regras de produtos e pacotes(O preço total dos pacotes é diferente do preço de venda)'
            },
        }));        

        const atualizar = outBodyRegras.map((item: any) => ({
            code: item.code,
            atualizar: {
                resposta: item.respeita_as_regras_financeiro.resposta === 'sim'
                && item.respeita_as_regras_marketing.resposta === 'sim'
                && item.respeita_as_regras_produtos_pacotes.resposta === 'sim',
            }.resposta,
            validacoesCSV: outBodyValidacoesCSV.map((its: any) => ({
                resposta: its.arquivo_CSV_valido_compras.resposta === 'sim'
                && its.campos_necessarios_existem.resposta === 'sim'
                && its.produto_informado_existe.resposta === 'sim'
                && its.valores_numericos_validos.resposta === 'sim',
            })),
        }));
        
        return [outBodyValidacoesCSV, outBodyRegras, atualizar];
    }
}
