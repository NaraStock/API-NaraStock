const BookmarkModel = require('../models/bookmarksModel.js');

const BookmarkHandler = {
  // Tambah bookmark
  async create(request, h) {
    try {
      const userId = request.auth.credentials.id;
      const { articleId } = request.payload;

      const result = await BookmarkModel.create(userId, articleId);

      if (result === null) {
        return h.response({ message: 'Artikel sudah dibookmark.' }).code(200);
      }

      return h.response({ message: 'Bookmark berhasil ditambahkan.', bookmarkId: result }).code(201);
    } catch (err) {
      console.error(err);
      return h.response({ error: 'Gagal menambahkan bookmark.' }).code(500);
    }
  },

  // Ambil semua bookmark user
  async getUserBookmarks(request, h) {
    try {
      const userId = request.auth.credentials.id;

      const bookmarks = await BookmarkModel.getUserBookmarks(userId);
      return h.response({ bookmarks }).code(200);
    } catch (err) {
      console.error(err);
      return h.response({ error: 'Gagal mengambil bookmark.' }).code(500);
    }
  },

  // Hapus bookmark
  async delete(request, h) {
    try {
      const userId = request.auth.credentials.id;
      const { articleId } = request.params;

      const affectedRows = await BookmarkModel.delete(userId, articleId);
      if (affectedRows === 0) {
        return h.response({ message: 'Bookmark tidak ditemukan.' }).code(404);
      }

      return h.response({ message: 'Bookmark berhasil dihapus.' }).code(200);
    } catch (err) {
      console.error(err);
      return h.response({ error: 'Gagal menghapus bookmark.' }).code(500);
    }
  },
};

module.exports = BookmarkHandler;
