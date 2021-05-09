const cases = require("change-case");
const path = 'Applications';

const getApplicants = async(req, res) => {
  req.session.path = path;
  req.session.subpath = cases.sentenceCase('applicants');
  const sessionData = req.session;
  try {
    res.render('applications/applicants', {
      title: 'Application - Applicants',
      sessionData
    });
  } catch(e) {
    res.render('applications/applicants', {
      title: 'Application - Applicants',
      sessionData
    });
  }
};

module.exports = {
  getApplicants,
};