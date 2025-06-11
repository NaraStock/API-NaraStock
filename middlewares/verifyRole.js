const verifyRole = (requiredRole) => {
  return (request, h) => {
    const { role } = request.auth.credentials;

    if (role !== requiredRole) {
      return h.response({ message: 'Unauthorized: Role tidak diizinkan' }).code(403).takeover();
    }

    return h.continue;
  };
};

module.exports = verifyRole;
