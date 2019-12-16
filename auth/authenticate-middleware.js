const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets.js');

module.exports = (req, res, next) => {
  if(req.decodedJwt) {
    next();
  } else if(req.headers.authorization) {
    let token = req.headers.authorization;
    token.includes('Bearer ') ? token : res.status(400).json({ message: "Unable to verify authorization header type, please make sure you have the header authorization type of 'Bearer ' (with a space) before your token."});
    token = token.slice(7, token.length).trim();

    jwt.verify(token, jwtSecret, (err, decodedJwt) => {
      if(err) {
        res.status(400).json({ message: 'Unable to verify token', error: err });
      } else {
        req.decodedJwt = decodedJwt;
        next();
      }
    })
  } else {
    res.status(401).json({ you: 'shall not pass!' });
  }
};
