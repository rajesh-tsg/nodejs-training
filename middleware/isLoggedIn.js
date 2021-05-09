module.exports = (req, res, next) => {
  try {
    console.log('Session Data: ', req.session);
    if (req.session.user) {
      res.redirect('/users/dashboard');
    } else {
      // throw 'Session Expired';
      next();
    }
  } catch {
    res.redirect('/');
  }
};