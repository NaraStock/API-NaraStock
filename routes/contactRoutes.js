const Joi = require('joi');
const { createContactHandler, getContactsHandler } = require('../handlers/contactHandler');

const contactRoutes = [
  {
    method: 'POST',
    path: '/contacts',
    options: {
      auth: false, 
      validate: {
        payload: Joi.object({
          fullname: Joi.string().max(255).required(),
          email: Joi.string().email().max(255).required(),
          phone: Joi.string().max(20).optional().allow(''),
          subject: Joi.string().max(100).required(),
          message: Joi.string().required(),
        }),
        failAction: (request, h, err) => {
          return h.response({ success: false, message: err.message }).takeover().code(400);
        },
      },
      handler: createContactHandler,
      tags: ['api'],
      description: 'Create a new contact message',
      notes: 'Saves a new contact message to database',
    },
  },
  {
    method: 'GET',
    path: '/contacts',
    options: {
      auth: false, 
      handler: getContactsHandler,
      tags: ['api'],
      description: 'Get all contacts',
      notes: 'Returns list of contact messages',
    },
  },
];

module.exports = contactRoutes; 
