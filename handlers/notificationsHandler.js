require('dotenv').config();
const API_KEY = process.env.NOTIF_API_KEY;

const { createNotification, getNotificationsByUser, getAllUsers } = require('../models/notificationsModel');

const getUserNotificationsHandler = async (request, h) => {
  try {
    const userId = request.auth.credentials.id;
    const notifications = await getNotificationsByUser(userId);

    return h
      .response({
        status: 'success',
        data: notifications || [],
      })
      .code(200);
  } catch (error) {
    console.error('[GET NOTIFICATIONS ERROR]', error);
    return h
      .response({
        status: 'fail',
        message: 'Gagal mengambil notifikasi.',
      })
      .code(500);
  }
};

const broadcastNotificationHandler = async (request, h) => {
  try {
    const apiKeyHeader = request.headers['x-api-key'];
    if (apiKeyHeader !== API_KEY) {
      return h.response({ status: 'fail', message: 'Unauthorized' }).code(401);
    }

    const message = request.payload?.message || 'Hallo, ada prediksi analisis saham terbaru nihh!';

    const users = await getAllUsers();

    for (const user of users) {
      await createNotification({
        user_id: user.id,
        message,
      });
    }

    return h
      .response({
        status: 'success',
        message: 'Notifikasi dikirim ke semua user.',
      })
      .code(201);
  } catch (error) {
    console.error('[BROADCAST ERROR]', error);
    return h
      .response({
        status: 'fail',
        message: 'Gagal mengirim notifikasi.',
      })
      .code(500);
  }
};

module.exports = {
  getUserNotificationsHandler,
  broadcastNotificationHandler,
};
