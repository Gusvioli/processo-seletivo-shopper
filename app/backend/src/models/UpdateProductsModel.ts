import { object } from 'joi';
import Conect from './db/connect';

export class UpdateProductsModel {
    public static async updateProducts(body: {
        product_code: string,
        new_price: string,
        map: Function,
    }) {
        try {

            const parses = (valor: any) => {
                return JSON.parse(JSON.stringify(valor))
            }
            const connection = await Conect();
            const arr: any = [];

            const [rows] = body.map(async (item: {
                product_code: string, new_price: string
            }) => {
                arr.push({ code: item.product_code });
                const [rows] = await connection.query(`
                UPDATE shopper.products SET sales_price=(?) WHERE code=(?)
                `, [Number(item.new_price), Number(item.product_code)]);

                return rows;
            });

            const [products_packs] = await connection.query(`
            SELECT shopper.packs.*, shopper.products.sales_price
            FROM shopper.packs
            JOIN shopper.products ON shopper.packs.product_id = shopper.products.code
            `);

            const dados = parses(products_packs).map((item: any) => ({
                pack_id: item.pack_id,
                product_id: item.product_id,
                total: item.qty * Number(item.sales_price)
            }));

            const somaPorPackId = dados.reduce((acumulador: any, item: any) => {
                if (acumulador[item.pack_id]) {
                    acumulador[item.pack_id] += item.total;
                } else {
                    acumulador[item.pack_id] = item.total;
                }
                return acumulador;
            }, {});


            const [updates] = Object.entries(somaPorPackId).map(async ([pack_id, total]) => {
                const [paks_up] = await connection.query(`
                  UPDATE shopper.products SET sales_price=(?) WHERE code=(?)
                `, [total, pack_id]);
              
                return paks_up;
              });

            connection.end();
            const updatesW = await updates;
            // console.log([parses(updatesW), parses(rows)]);
            
            return [parses(updatesW), parses(rows)];
        } catch (error) {
            console.error('Erro ao inserir no banco de dados:', error);
            throw error; // Adicionando throw para propagar o erro para o caller
        }
    }
}

