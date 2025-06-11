require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const authRoutes = require('./routes/authRoutes'); // auth admin & user
const authStrategy = require('./middlewares/authStrategy');
const articleRoutes = require('./routes/articleRoutes.js');
const commentRoutes = require('./routes/commentRoutes.js');
const dashboardRoutes = require('./routes/dashboardRoutes.js');
const bookmarkRoutes = require('./routes/bookmarksRoutes.js'); // ⬅ Tambahkan ini
const contactRoutes = require('./routes/contactRoutes.js'); // ⬅ Import contact routes
const notificationRoutes = require('./routes/notificationRoutes');
const db = require('./config/db.js');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register(Jwt);

  server.auth.strategy(authStrategy.name, authStrategy.scheme, authStrategy.options);
  server.auth.default('jwt');

  await db.connect();

  // Route registration
  server.route(authRoutes);
  server.route(articleRoutes);
  server.route(commentRoutes);
  server.route(dashboardRoutes);
  server.route(bookmarkRoutes); // ⬅ Daftarkan di sini juga
  server.route(contactRoutes);
  server.route(notificationRoutes);

  // Root (public)
  server.route({
    method: 'GET',
    path: '/',
    handler: () => ({ message: 'NaraDev Backend API is running 🚀' }),
    options: {
      auth: false,
    },
  });

  await server.start();
  console.log('🚀 NaraDev Backend is LIVE!');
  console.log(`🌐 Access: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();
