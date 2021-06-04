module.exports = (req, res, next) => {
  try {
    console.log(req.session);
    const redirectUrl = req.originalUrl;
    if (req.session.user) {
      next();
    } else {
      res.redirect('/?redirectUrl=' + redirectUrl);
    }
  } catch(e) {
    console.log('Error:', e);
    res.redirect('/');
  }
};