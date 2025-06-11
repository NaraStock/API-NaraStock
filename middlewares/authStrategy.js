const Jwt = require('@hapi/jwt');

const authStrategy = {
  name: 'jwt',
  scheme: 'jwt',
  options: {
    keys: process.env.JWT_SECRET,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      nbf: true,
      exp: true,
      maxAgeSec: 14400, // 4 jam
    },
    validate: (artifacts, request, h) => {
      return {
        isValid: true,
        credentials: {
          id: artifacts.decoded.payload.id,
          email: artifacts.decoded.payload.email,
          role: artifacts.decoded.payload.role,
        },
      };
    },
  },
};

module.exports = authStrategy;
