const getDashboard = async(req, res) => {
  try {
    const userType = req.param('userType');
    console.log(userType);
    if(userType === 'admin') {
      res.render('dashboard/adminDashboard', {title: 'Dashboard - Admin', path: 'Dashboard', subpath: 'Admin'});
    } else {
      res.render('dashboard/adminDashboard', {title: 'Dashboard - Admin'});
    }
  } catch(e) {
    res.render('/', {title: 'Login'});
  }
};

module.exports = {
  getDashboard,
};