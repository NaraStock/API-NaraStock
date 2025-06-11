const bcrypt = require('bcrypt');
const jwt = require('@hapi/jwt');
const { getAdminByEmail } = require('../models/admins'); // async DB model

const login = async (request, h) => {
  const { email, password } = request.payload;

  const admin = await getAdminByEmail(email); // ambil dari DB
  if (!admin) {
    return h.response({ message: 'Invalid email' }).code(401);
  }

  const isValid = await bcrypt.compare(password, admin.password);
  if (!isValid) {
    return h.response({ message: 'Invalid password' }).code(401);
  }

  const token = jwt.token.generate(
    {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    },
    {
      key: process.env.JWT_SECRET,
      algorithm: 'HS256',
    }
  );

  return h
    .response({
      message: 'Login success',
      token,
    })
    .code(200);
};

module.exports = { login };
