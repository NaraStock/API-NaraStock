const bcrypt = require('bcrypt');
const jwt = require('@hapi/jwt');
const { getAdminByEmail, createAdmin } = require('../models/admins.js');

const registerAdmin = async (request, h) => {
  const { username, email, password, role = 'admin' } = request.payload;

  // Gunakan model untuk cek apakah email sudah ada
  const existing = await getAdminByEmail(email);
  if (existing) {
    return h.response({ message: 'Email sudah terdaftar' }).code(400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Gunakan model untuk insert admin baru
  const result = await createAdmin({ username, email, password: hashedPassword, role });

  return h.response({ message: 'Register success', adminId: result.insertId }).code(201);
};

const loginAdmin = async (request, h) => {
  const { email, password } = request.payload;

  // Gunakan model untuk ambil data admin
  const admin = await getAdminByEmail(email);
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
    { key: process.env.JWT_SECRET }
  );

  return h.response({ message: 'Login success', token }).code(200);
};

module.exports = { registerAdmin, loginAdmin };
