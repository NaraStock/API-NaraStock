const { getDb, isConnected } = require('../config/db.js');

const getAllArticles = async () => {
  if (isConnected()) {
    const db = getDb();
    const [rows] = await db.query(`
      SELECT a.*, u.email AS author_email
      FROM articles a
      LEFT JOIN admins u ON a.admin_id = u.id
      ORDER BY a.created_at DESC
    `);
    return rows;
  }
  return [];
};

const getArticleById = async (id) => {
  if (isConnected()) {
    const db = getDb();
    const [rows] = await db.query(
      `
      SELECT a.*, u.email AS author_email
      FROM articles a
      LEFT JOIN admins u ON a.admin_id = u.id
      WHERE a.id = ?
      `,
      [id]
    );
    return rows[0];
  }
  return null;
};

const createArticle = async ({
  title,
  slug,
  content,
  excerpt = null,
  image = null,
  admin_id, // HARUS DIAMBIL DARI JWT (request.auth.credentials.id), jangan dari payload user
  status = 'draft',
  published_at = null,
}) => {
  if (isConnected()) {
    const db = getDb();
    const sql = `
      INSERT INTO articles (title, slug, content, excerpt, image, admin_id, status, published_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(sql, [title, slug, content, excerpt, image, admin_id, status, published_at]);
    return { insertId: result.insertId };
  }
  return null;
};

const updateArticle = async (id, { title, slug, content, excerpt = null, image = null, status = null, published_at = null }) => {
  if (isConnected()) {
    const existing = await getArticleById(id);
    if (!existing) return false;

    const fields = [];
    const values = [];

    if (title !== undefined) {
      fields.push('title = ?');
      values.push(title);
    }
    if (slug !== undefined) {
      fields.push('slug = ?');
      values.push(slug);
    }
    if (content !== undefined) {
      fields.push('content = ?');
      values.push(content);
    }
    if (excerpt !== undefined) {
      fields.push('excerpt = ?');
      values.push(excerpt);
    }
    if (image !== undefined) {
      fields.push('image = ?');
      values.push(image);
    }
    if (status !== undefined) {
      fields.push('status = ?');
      values.push(status);
    }
    if (published_at !== undefined) {
      fields.push('published_at = ?');
      values.push(published_at);
    }

    if (fields.length === 0) return false;

    const sql = `UPDATE articles SET ${fields.join(', ')} WHERE id = ?`;
    values.push(id);

    const db = getDb();
    const [result] = await db.execute(sql, values);
    return result.affectedRows > 0;
  }
  return false;
};

const deleteArticle = async (id) => {
  if (isConnected()) {
    const db = getDb();
    const [result] = await db.execute('DELETE FROM articles WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
  return false;
};

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};
