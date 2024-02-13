const { TokenValidation } = require('../Utility/invalidToken.js');

function verifyJWTMiddleware(jwtUtil) {
  return function (request, response, next) {
    try {
      if (!request.headers.authorization) {
        response.status(401).json({
          status: false,
          message: 'Unauthenticated',
          data: null,
        });
        return;
      }

      const token = request.headers.authorization.split(' ')[1];

      if (
        (global.invalidTokens &&
          global.invalidTokens.some(
            (tokenData) => tokenData.token === token
          )) ||
        (global.validTokens &&
          !global.validTokens.some((validToken) => validToken.token === token))
      ) {
        return response.status(401).json({
          status: false,
          message: 'Invalid Token',
        });
      }

      request.user = jwtUtil.decode(token).data;

      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
          status: false,
          message: 'Token Expired',
          data: null,
        });
      } else {
        response.status(500).json({
          status: false,
          message: error,
          data: null,
        });
      }
    }
  };
}

module.exports = { verifyJWTMiddleware };
