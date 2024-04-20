// Get the client
import mysql from 'mysql2/promise';
import 'dotenv/config';
import Conect from './connect';


class CreateDatabaseAll {
  public static async createDatabase() {
    const connection = await Conect();

    try {
      await connection.query('DROP DATABASE IF EXISTS `shopper`');
      await connection.query('CREATE DATABASE IF NOT EXISTS `shopper`');
      await connection.query('USE `shopper`');
      await connection.query(`CREATE TABLE IF NOT EXISTS products 
      ( 
          code BIGINT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          cost_price DECIMAL(9,2) NOT NULL,
          sales_price DECIMAL(9,2) NOT NULL
      );`);
      await connection.query(`CREATE TABLE IF NOT EXISTS packs 
      (
          id BIGINT AUTO_INCREMENT PRIMARY KEY,
          pack_id BIGINT NOT NULL,
          product_id BIGINT NOT NULL,
          qty BIGINT NOT NULL,
          FOREIGN KEY (pack_id) REFERENCES products(code),
          FOREIGN KEY (product_id) REFERENCES products(code)
      );`);
      await connection.query(`INSERT IGNORE INTO products (code, name, cost_price, sales_price) VALUES (16,'AZEITE PORTUGUÊS EXTRA VIRGEM GALLO 500ML',18.44,20.49);`);
      await connection.query(`INSERT IGNORE INTO products (code, name, cost_price, sales_price) VALUES (18,'BEBIDA ENERGÉTICA VIBE 2L',8.09,8.99);`);
      await connection.query(`INSERT IGNORE INTO products (code, name, cost_price, sales_price) VALUES (19,'ENERGÉTICO RED BULL ENERGY DRINK 250ML',6.56,7.29);`);
      await connection.query(`INSERT IGNORE INTO products (code, name, cost_price, sales_price) VALUES (20,'ENERGÉTICO RED BULL ENERGY DRINK 355ML',9.71,10.79);`);
      await connection.query(`INSERT IGNORE INTO products (code, name, cost_price, sales_price) VALUES (21,'BEBIDA ENERGÉTICA RED BULL RED EDITION 250ML',10.71,11.71);`);
      await connection.query(`INSERT IGNORE INTO products (code, name, cost_price, sales_price) VALUES (22,'ENERGÉTICO RED BULL ENERGY DRINK SEM AÇÚCAR 250ML',6.74,7.49);`);
      await connection.query(`INSERT IGNORE INTO products (code, name, cost_price, sales_price) VALUES (23,'ÁGUA MINERAL BONAFONT SEM GÁS 1,5L',2.15,2.39);`);
      await connection.query(`INSERT IGNORE INTO products (code, name, cost_price, sales_price) VALUES (24,'FILME DE PVC WYDA 28CMX15M',3.59,3.99);`);
      await connection.query(`INSERT IGNORE INTO products (code, name, cost_price, sales_price) VALUES (26,'ROLO DE PAPEL ALUMÍNIO WYDA 30CMX7,5M',5.21,5.79);`);
      await connection.query(`INSERT IGNORE INTO products (code, name, cost_price, sales_price) VALUES (1000,'BEBIDA ENERGÉTICA VIBE 2L - 6 UNIDADES',48.54,53.94);`);
      await connection.query(`INSERT IGNORE INTO products (code, name, cost_price, sales_price) VALUES (1010,'KIT ROLO DE ALUMÍNIO + FILME PVC WYDA',8.80,9.78);`);
      await connection.query(`INSERT IGNORE INTO products (code, name, cost_price, sales_price) VALUES (1020,'SUPER PACK RED BULL VARIADOS - 6 UNIDADES',51.81,57.00);`);
      await connection.execute(`INSERT IGNORE INTO packs (pack_id, product_id, qty) VALUES (1000,18,6);`);
      await connection.execute(`INSERT IGNORE INTO packs (pack_id, product_id, qty) VALUES (1010,24,1);`);
      await connection.execute(`INSERT IGNORE INTO packs (pack_id, product_id, qty) VALUES (1010,26,1);`);
      await connection.execute(`INSERT IGNORE INTO packs (pack_id, product_id, qty) VALUES (1020,19,3);`);
      await connection.execute(`INSERT IGNORE INTO packs (pack_id, product_id, qty) VALUES (1020,21,3);`)

      await connection.end();
    } catch (error) {
      console.log('Erro ao criar banco de dados:', error);
      
    }
  }
}

export default CreateDatabaseAll;