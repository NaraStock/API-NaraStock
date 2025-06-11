const Joi = require('joi');
const { getCommentsByArticleId, postComment } = require('../handlers/commentHandler');

const commentRoutes = [
  {
    method: 'GET',
    path: '/articles/{id}/comments',
    handler: getCommentsByArticleId,
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
    path: '/articles/{id}/comments',
    handler: postComment,
    options: {
      auth: 'jwt',
      validate: {
        params: Joi.object({
          id: Joi.number().integer().required(),
        }),
        payload: Joi.object({
          text: Joi.string().min(1).required(),
        }),
        failAction: (request, h, err) => {
          throw err;
        },
      },
    },
  },
];

module.exports = commentRoutes;
