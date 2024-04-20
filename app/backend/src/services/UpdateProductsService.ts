import HttpException from '../utils/HttpException';
import { UpdateProductsModel } from '../models/UpdateProductsModel';

export class UpdateProductsService {
    public static async contents(body: {
        product_code: string,
        new_price: string,
        map: Function,
    }) {
        try {
            const updateProductsModel = await UpdateProductsModel.updateProducts(body);
            return updateProductsModel;
        } catch (error) {
            if (UpdateProductsModel === null || UpdateProductsModel === undefined) {
                throw new HttpException(404, 'Not found')
            }
        }

    }
}
