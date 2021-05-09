const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

module.exports = (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, config.jwtSecret);
    console.log(decodedToken);
    const tokenStatus = decodedToken.isActive;
    // next();
    if (tokenStatus) {
      next();
    } else {
      throw 'Invalid token';
    }
  } catch {
    res.status(401).send({
      error: 'Authorization Failed. Invalid Token'
    });
  }
};