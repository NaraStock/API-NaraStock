const { getDb, isConnected } = require('../config/db.js');

// Simpan notifikasi ke DB
const createNotification = async ({ user_id, message }) => {
  try {
    if (!isConnected()) return null;
    const db = getDb();
    const sql = `INSERT INTO notifications (user_id, message) VALUES (?, ?)`;
    const [result] = await db.execute(sql, [user_id, message]);
    return { insertId: result.insertId };
  } catch (error) {
    console.error('Error creating notification:', error.message);
    return null;
  }
};

// Ambil semua notifikasi berdasarkan user
const getNotificationsByUser = async (user_id) => {
  try {
    if (!isConnected()) return [];
    const db = getDb();
    const sql = `SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC`;
    const [rows] = await db.execute(sql, [user_id]);
    return rows;
  } catch (error) {
    console.error('Error getting notifications:', error.message);
    return [];
  }
};

// (Opsional) Ambil semua user dari tabel users
const getAllUsers = async () => {
  try {
    if (!isConnected()) return [];
    const db = getDb();
    const [rows] = await db.query('SELECT id, email FROM users');
    return rows;
  } catch (error) {
    console.error('Error getting all users:', error.message);
    return [];
  }
};

module.exports = {
  createNotification,
  getNotificationsByUser,
  getAllUsers, // ← ini nanti dipakai saat broadcast notifikasi
};
