const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  //   console.log('COOKIE REQ: ', req);
  try {
    const cookie = req.cookies[process.env.COOKIE_NAME];
    console.log('COOKIE : ', cookie);

    if (!cookie) throw new Error('You must log in to view this page.');

    const user = jwt.verify(cookie, process.env.JWT_SECRET);
    req.user = user;

    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
};
