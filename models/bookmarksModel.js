const { getDb } = require('../config/db');

const BookmarkModel = {
  async create(userId, articleId) {
    const db = getDb();
    if (!db) throw new Error('Database belum terhubung');

    const [existing] = await db.query('SELECT * FROM bookmarks WHERE user_id = ? AND article_id = ?', [userId, articleId]);
    if (existing.length > 0) return null; // Sudah dibookmark

    const [result] = await db.query('INSERT INTO bookmarks (user_id, article_id) VALUES (?, ?)', [userId, articleId]);
    return result.insertId;
  },

  async getUserBookmarks(userId) {
    const db = getDb();
    if (!db) throw new Error('Database belum terhubung');

    const [rows] = await db.query(
      `SELECT b.id as bookmark_id, a.id as article_id, a.title, a.slug, a.content, a.image, a.published_at
       FROM bookmarks b
       JOIN articles a ON b.article_id = a.id
       WHERE b.user_id = ?`,
      [userId]
    );
    return rows;
  },

  async delete(userId, articleId) {
    const db = getDb();
    if (!db) throw new Error('Database belum terhubung');

    const [result] = await db.query('DELETE FROM bookmarks WHERE user_id = ? AND article_id = ?', [userId, articleId]);
    return result.affectedRows;
  },
};

module.exports = BookmarkModel;
