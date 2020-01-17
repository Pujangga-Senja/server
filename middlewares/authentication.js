const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  // get auth header value
  const token = req.headers.token;

  // check if bearer is undefined
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, authData) => {
      console.log(err);
      if (err) {
        err.httpCode = 403;
        next(err);
        // res.sendStatus(403);
      } else {
        req.userData = authData;
        next();
      }
    });
  } else {
    // forbidden
    next({ httpCode: 403, message: 'No header is provided' });
    // res.sendStatus(403);
  }
}

module.exports = verifyToken;
