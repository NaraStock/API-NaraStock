const { getDb, isConnected } = require('../config/db.js'); 

const getAdminByEmail = async (email) => {
  if (isConnected()) {
    const db = getDb();
    const [rows] = await db.query('SELECT * FROM admins WHERE email = ?', [email]);
    return rows[0] || null;
  }
  return null;
};

const createAdmin = async ({ username, email, password, role = 'admin', avatar = null }) => {
  if (isConnected()) {
    const db = getDb();
    const sql = `
      INSERT INTO admins (username, email, password, role, avatar)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(sql, [username, email, password, role, avatar]);
    return { insertId: result.insertId };
  }
  return null;
};

module.exports = {
  getAdminByEmail,
  createAdmin,
};
