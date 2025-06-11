const { getDb, isConnected } = require('../config/db.js');

const getUserByEmail = async (email) => {
  if (isConnected()) {
    const db = getDb();
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] || null;
  }
  return null;
};

const createUser = async ({ username, email, password, avatar = null }) => {
  if (isConnected()) {
    const db = getDb();
    const sql = `
      INSERT INTO users (username, email, password, avatar)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.execute(sql, [username, email, password, avatar]);
    return { insertId: result.insertId };
  }
  return null;
};

module.exports = {
  getUserByEmail,
  createUser,
};
