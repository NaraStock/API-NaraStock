const Joi = require('joi');
const BookmarkHandler = require('../handlers/bookmarksHandler');

module.exports = [
  {
    method: 'POST',
    path: '/bookmarks',
    handler: BookmarkHandler.create,
    options: {
      auth: 'jwt',
      validate: {
        payload: Joi.object({
          articleId: Joi.number().integer().required(),
        }),
      },
    },
  },
  {
    method: 'GET',
    path: '/bookmarks',
    handler: BookmarkHandler.getUserBookmarks,
    options: {
      auth: 'jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/bookmarks/{articleId}',
    handler: BookmarkHandler.delete,
    options: {
      auth: 'jwt',
      validate: {
        params: Joi.object({
          articleId: Joi.number().integer().required(),
        }),
      },
    },
  },
];
