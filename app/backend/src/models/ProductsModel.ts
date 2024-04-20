import Conect from './db/connect';

export class ProductsModel {
  public static async findAll() {
    try {
      const connection = await Conect();
      const [rows] = await connection.execute(`
        SELECT
            p.code,
            p.name,
            p.cost_price,
            p.sales_price,
            IFNULL(pa.pack_id, NULL) AS pack_id,
            IFNULL(pa.qty, NULL) AS qty
        FROM
            shopper.products AS p
        LEFT JOIN
            shopper.packs AS pa
        ON
            p.code = pa.product_id;
      `);
      connection.end();
      return rows;
    } catch (error) {
      console.error('Erro ao consultar banco de dados:', error);
    }
  }
}
