const cases = require("change-case");
const getDashboard = async(req, res) => {
  try {
    // console.log('Session Data ', req.session.user );
    req.session.path = 'Dashboard';
    req.session.subpath = cases.sentenceCase(req.session.user.userType);
    const sessionData = req.session;
    const userType = cases.noCase(req.session.user.userType);
    if(userType === 'admin') {
      res.render('dashboard/adminDashboard', {title: `Dashboard - ${userType}`, sessionData});
    } else {
      res.render('dashboard/adminDashboard', {title: `Dashboard - ${userType}`, sessionData});
    }
  } catch(e) {
    res.render('/', {title: 'Login'});
  }
};

module.exports = {
  getDashboard,
};