const bcrypt = require('bcrypt');
const Jwt = require('@hapi/jwt');
const { getUserByEmail, createUser } = require('../models/userModel');

const register = async (request, h) => {
  const { username, email, password } = request.payload;

  // Cek apakah email sudah terdaftar
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return h.response({ message: 'Email sudah terdaftar' }).code(400);
  }

  // Hash password dengan salt rounds 10
  const hashedPassword = await bcrypt.hash(password, 10);

  // Simpan user baru dengan role 'user' default
  const newUser = await createUser({
    username,
    email,
    password: hashedPassword,
    role: 'user',
    avatar: null,
  });

  return h.response({ message: 'Registrasi berhasil', userId: newUser.insertId }).code(201);
};

const login = async (request, h) => {
  const { email, password } = request.payload;

  // Cari user berdasarkan email
  const user = await getUserByEmail(email);
  if (!user) {
    return h.response({ message: 'Email atau password salah' }).code(401);
  }

  // Verifikasi password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return h.response({ message: 'Email atau password salah' }).code(401);
  }

  // Generate JWT token dengan payload berisi id, email, role, dan username
  const token = Jwt.token.generate(
    {
      id: user.id,
      email: user.email,
      role: user.role || 'user',
      username: user.username,
    },
    {
      key: process.env.JWT_SECRET,
      algorithm: 'HS256',
    }
  );

  return h.response({
    message: 'Login berhasil',
    token,
    id: user.id,
    email: user.email,
    role: user.role || 'user',
    username: user.username,
  }).code(200);
};

module.exports = {
  register,
  login,
};
