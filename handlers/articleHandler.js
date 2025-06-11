const Joi = require('joi');
const ArticleModel = require('../models/articles.js');

const getAllArticlesHandler = async (request, h) => {
  try {
    const articles = await ArticleModel.getAllArticles();
    return h.response({
      status: 'success',
      data: articles,
    });
  } catch (error) {
    return h
      .response({
        status: 'error',
        message: error.message,
      })
      .code(500);
  }
};

const getArticleByIdHandler = async (request, h) => {
  try {
    const { id } = request.params;
    const article = await ArticleModel.getArticleById(id);

    if (!article) {
      return h
        .response({
          status: 'fail',
          message: 'Artikel tidak ditemukan',
        })
        .code(404);
    }

    return h.response({
      status: 'success',
      data: article,
    });
  } catch (error) {
    return h
      .response({
        status: 'error',
        message: error.message,
      })
      .code(500);
  }
};

const createArticleHandler = async (request, h) => {
  // Validasi payload dengan Joi, tanpa admin_id dari user
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    slug: Joi.string().min(3).max(255).required(),
    content: Joi.string().required(),
    excerpt: Joi.string().allow(null, ''),
    image: Joi.string().uri().allow(null, ''),
    status: Joi.string().valid('draft', 'published').default('draft'),
    published_at: Joi.date().iso().allow(null, ''),
  });

  const { error, value } = schema.validate(request.payload);
  if (error) {
    return h
      .response({
        status: 'fail',
        message: error.details[0].message,
      })
      .code(400);
  }

  try {
    // Ambil admin_id dari token JWT
    const admin_id = request.auth.credentials.id;

    const articleData = {
      ...value,
      admin_id,
    };

    const result = await ArticleModel.createArticle(articleData);

    return h
      .response({
        status: 'success',
        message: 'Artikel berhasil dibuat',
        data: { articleId: result.insertId },
      })
      .code(201);
  } catch (error) {
    return h
      .response({
        status: 'error',
        message: error.message,
      })
      .code(500);
  }
};

const updateArticleHandler = async (request, h) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).optional(),
    slug: Joi.string().min(3).max(255).optional(),
    content: Joi.string().optional(),
    excerpt: Joi.string().allow(null, '').optional(),
    image: Joi.string().uri().allow(null, '').optional(),
    status: Joi.string().valid('draft', 'published').optional(),
    published_at: Joi.date().iso().allow(null, '').optional(),
  });

  const { error, value } = schema.validate(request.payload);
  if (error) {
    return h
      .response({
        status: 'fail',
        message: error.details[0].message,
      })
      .code(400);
  }

  try {
    const { id } = request.params;
    const updated = await ArticleModel.updateArticle(id, value);

    if (!updated) {
      return h
        .response({
          status: 'fail',
          message: 'Artikel tidak ditemukan untuk diperbarui',
        })
        .code(404);
    }

    return h.response({
      status: 'success',
      message: 'Artikel berhasil diperbarui',
    });
  } catch (error) {
    return h
      .response({
        status: 'error',
        message: error.message,
      })
      .code(500);
  }
};

const deleteArticleHandler = async (request, h) => {
  try {
    const { id } = request.params;
    const deleted = await ArticleModel.deleteArticle(id);

    if (!deleted) {
      return h
        .response({
          status: 'fail',
          message: 'Artikel tidak ditemukan untuk dihapus',
        })
        .code(404);
    }

    return h.response({
      status: 'success',
      message: 'Artikel berhasil dihapus',
    });
  } catch (error) {
    return h
      .response({
        status: 'error',
        message: error.message,
      })
      .code(500);
  }
};

module.exports = {
  getAllArticlesHandler,
  getArticleByIdHandler,
  createArticleHandler,
  updateArticleHandler,
  deleteArticleHandler,
};
