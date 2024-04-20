import Conect from './db/connect';

export class PacksModel {
  public static async findAll() {
    try {
      const connection = await Conect();
      const [rows] = await connection.execute(`
        SELECT * FROM shopper.packs`);
      connection.end();
      return rows;
    } catch (error) {
      console.error('Erro ao consultar banco de dados:', error);
    }
  }
}
