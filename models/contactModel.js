const { getDb } = require('../config/db');

const createContact = async ({ fullname, email, phone, subject, message }) => {
  try {
    const pool = getDb();
    if (!pool) throw new Error('Database not connected');

    const query = `
      INSERT INTO contacts (fullname, email, phone, subject, message)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(query, [fullname, email, phone, subject, message]);

    return {
      success: true,
      insertId: result.insertId,
      message: 'Pesan kontak berhasil disimpan',
    };
  } catch (error) {
    console.error('Error createContact:', error.message);
    return {
      success: false,
      message: 'Gagal menyimpan pesan kontak',
      error: error.message,
    };
  }
};

const getAllContacts = async () => {
  try {
    const pool = getDb();
    if (!pool) throw new Error('Database not connected');

    const query = `SELECT * FROM contacts ORDER BY created_at DESC`;

    const [rows] = await pool.execute(query);
    return {
      success: true,
      data: rows,
    };
  } catch (error) {
    console.error('Error getAllContacts:', error.message);
    return {
      success: false,
      message: 'Gagal mengambil data kontak',
      error: error.message,
    };
  }
};

module.exports = {
  createContact,
  getAllContacts,
};
