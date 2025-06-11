require('dotenv').config();
const mysql = require('mysql2/promise');

let pool;

const connect = async () => {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'nara_stock_db',
      port: process.env.DB_PORT || 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    console.log('✅ Terhubung ke database MySQL (pool)');
  } catch (err) {
    console.error('❌ Gagal konek ke database:', err.message);
    pool = null;
  }
};

const getDb = () => pool;

const isConnected = () => !!pool;

module.exports = {
  connect,
  getDb,
  isConnected,
};
