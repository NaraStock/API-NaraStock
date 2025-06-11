const verifyRole = require('../middlewares/verifyRole');

const dashboardRoutes = [
  {
    method: 'GET',
    path: '/dashboard/admin',
    handler: (request, h) => {
      return h.response({ message: 'Welcome to Admin Dashboard' });
    },
    options: {
      auth: 'jwt',
      pre: [{ method: verifyRole('admin') }],
    },
  },
  {
    method: 'GET',
    path: '/dashboard/user',
    handler: (request, h) => {
      return h.response({ message: 'Welcome to User Dashboard' });
    },
    options: {
      auth: 'jwt',
      pre: [{ method: verifyRole('user') }],
    },
  },
];

module.exports = dashboardRoutes;
