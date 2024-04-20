import mysql from 'mysql2/promise';
import 'dotenv/config';

async function Conect() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        port: 3002,
      });
    return connection;
}

export default Conect;