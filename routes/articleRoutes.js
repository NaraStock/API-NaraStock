const Joi = require('joi');
const handlers = require('../handlers/articleHandler.js');

module.exports = [
  {
    method: 'GET',
    path: '/articles',
    handler: handlers.getAllArticlesHandler,
    options: { auth: false },
  },
  {
    method: 'GET',
    path: '/articles/{id}',
    handler: handlers.getArticleByIdHandler,
    options: {
      auth: false,
      validate: {
        params: Joi.object({
          id: Joi.number().integer().required(),
        }),
        failAction: (request, h, err) => {
          throw err;
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/articles',
    handler: handlers.createArticleHandler,
    options: {
      auth: 'jwt', // harus login dulu
      validate: {
        payload: Joi.object({
          title: Joi.string().min(3).max(255).required(),
          slug: Joi.string().min(3).max(255).required(),
          content: Joi.string().required(),
          excerpt: Joi.string().allow('', null), // opsional
          image: Joi.string().uri().allow('', null), // opsional
          status: Joi.string().valid('draft', 'published').default('draft'),
          published_at: Joi.date().iso().allow(null), // opsional
        }),
        failAction: (request, h, err) => {
          throw err;
        },
      },
    },
  },
  {
    method: 'PUT',
    path: '/articles/{id}',
    handler: handlers.updateArticleHandler,
    options: {
      auth: 'jwt', // harus login dulu
      validate: {
        params: Joi.object({
          id: Joi.number().integer().required(),
        }),
        payload: Joi.object({
          title: Joi.string().min(3).max(255).optional(),
          slug: Joi.string().min(3).max(255).optional(),
          content: Joi.string().optional(),
          excerpt: Joi.string().allow('', null).optional(),
          image: Joi.string().uri().allow('', null).optional(),
          status: Joi.string().valid('draft', 'published').optional(),
          published_at: Joi.date().iso().allow(null).optional(),
        }),
        failAction: (request, h, err) => {
          throw err;
        },
      },
    },
  },
  {
    method: 'DELETE',
    path: '/articles/{id}',
    handler: handlers.deleteArticleHandler,
    options: {
      auth: 'jwt', // harus login dulu
      validate: {
        params: Joi.object({
          id: Joi.number().integer().required(),
        }),
        failAction: (request, h, err) => {
          throw err;
        },
      },
    },
  },
];
