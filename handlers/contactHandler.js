const ContactModel = require('../models/contactModel.js');

const createContactHandler = async (request, h) => {
  const payload = request.payload;

  // validasi sederhana bisa ditambah sesuai kebutuhan
  if (!payload.fullname || !payload.email || !payload.subject || !payload.message) {
    return h.response({ success: false, message: 'Data tidak lengkap' }).code(400);
  }

  const result = await ContactModel.createContact(payload);

  if (result.success) {
    return h.response({ success: true, message: 'Pesan berhasil dikirim' }).code(201);
  } else {
    return h.response({ success: false, message: result.message }).code(500);
  }
};

const getContactsHandler = async (request, h) => {
  const result = await ContactModel.getAllContacts();

  if (result.success) {
    return h.response({ success: true, data: result.data }).code(200);
  } else {
    return h.response({ success: false, message: result.message }).code(500);
  }
};

module.exports = {
  createContactHandler,
  getContactsHandler,
};
