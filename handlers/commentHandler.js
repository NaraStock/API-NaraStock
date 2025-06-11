const commentsModel = require('../models/comments.js');

const getCommentsByArticleId = async (request, h) => {
  const { id: articleId } = request.params;
  const comments = await commentsModel.getCommentsByArticleId(articleId);
  return h.response({ comments }).code(200);
};

const postComment = async (request, h) => {
  const { id: articleId } = request.params;
  const { text } = request.payload;
  const userId = request.auth.credentials.id;

  if (!text || text.trim() === '') {
    return h.response({ message: 'Komentar tidak boleh kosong' }).code(400);
  }

  const commentId = await commentsModel.addComment({ articleId, userId, text });

  if (!commentId) {
    return h.response({ message: 'Gagal menambahkan komentar' }).code(500);
  }

  return h
    .response({
      message: 'Komentar berhasil ditambahkan',
      commentId,
    })
    .code(201);
};

module.exports = { getCommentsByArticleId, postComment };
