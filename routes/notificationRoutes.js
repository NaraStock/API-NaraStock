const Joi = require('joi');
const { getUserNotificationsHandler, broadcastNotificationHandler } = require('../handlers/notificationsHandler');

module.exports = [
  {
    method: 'GET',
    path: '/notifications',
    handler: getUserNotificationsHandler,
    options: {
      auth: 'jwt', // wajib login pakai JWT
      description: 'Ambil notifikasi user yang login',
      tags: ['api', 'notifications'],
    },
  },
  {
    method: 'POST',
    path: '/notifications/broadcast',
    handler: broadcastNotificationHandler,
    options: {
      auth: false, // tanpa auth user, tapi wajib pakai API Key header
      description: 'Trigger broadcast notifikasi ke semua user',
      tags: ['api', 'notifications'],
      validate: {
        headers: Joi.object({
          'x-api-key': Joi.string().required(),
        }).unknown(), // boleh ada header lain selain x-api-key
        payload: Joi.object({
          message: Joi.string().optional(),
        }),
      },
    },
  },
];
