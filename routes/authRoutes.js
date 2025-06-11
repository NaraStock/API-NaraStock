const Joi = require('joi');
const { registerAdmin, loginAdmin } = require('../handlers/admin-authHandler');
const { register, login } = require('../handlers/userAuthHandler.js');

const authRoutes = [
  // ADMIN REGISTER & LOGIN
  {
    method: 'POST',
    path: '/auth/register/admin',
    handler: registerAdmin,
    options: {
      auth: false,
      validate: {
        payload: Joi.object({
          username: Joi.string().min(3).max(30).required(),
          email: Joi.string().email().required(),
          password: Joi.string().min(6).required(),
          role: Joi.string().valid('admin', 'super_admin').default('admin'),
        }),
        failAction: (request, h, err) => {
          throw err;
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/auth/login/admin',
    handler: loginAdmin,
    options: {
      auth: false,
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().min(6).required(),
        }),
        failAction: (request, h, err) => {
          throw err;
        },
      },
    },
  },

  // USER REGISTER & LOGIN
  {
    method: 'POST',
    path: '/auth/register/user',
    handler: register,
    options: {
      auth: false,
      validate: {
        payload: Joi.object({
          username: Joi.string().min(3).max(30).required(),
          email: Joi.string().email().required(),
          password: Joi.string().min(6).required(),
          // role user otomatis di handler, gak perlu di sini
        }),
        failAction: (request, h, err) => {
          throw err;
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/auth/login/user',
    handler: login,
    options: {
      auth: false,
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().min(6).required(),
        }),
        failAction: (request, h, err) => {
          throw err;
        },
      },
    },
  },
];

module.exports = authRoutes;
