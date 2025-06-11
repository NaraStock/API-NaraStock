const { getDb, isConnected } = require('../config/db.js');

const getCommentsByArticleId = async (articleId) => {
  if (!isConnected()) return [];
  const db = getDb();
  const sql = `
      SELECT c.id, c.content, c.created_at, u.username, u.avatar
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.article_id = ? AND c.status = 'approved'
      ORDER BY c.created_at DESC
    `;
  const [rows] = await db.query(sql, [articleId]);
  console.log('Fetched comments:', rows);
  return rows;
};

const addComment = async ({ articleId, userId, text }) => {
  if (!isConnected()) return null;
  const db = getDb();
  // Simpan komentar dengan status langsung 'approved' agar langsung muncul
  const sql = `INSERT INTO comments (article_id, user_id, content, status) VALUES (?, ?, ?, 'approved')`;
  const [result] = await db.execute(sql, [articleId, userId, text]);
  return result.insertId;
};

module.exports = { getCommentsByArticleId, addComment };
