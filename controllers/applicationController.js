const getApplicants = async(req, res) => {
  try {
    res.render('applications/applicants', {
      title: 'Application - Applicants',
      path: 'Application',
      subpath: 'Applicants',
    });
  } catch(e) {
    res.sender('error', {title: 'Error Page'});
  }
};

module.exports = {
  getApplicants,
};