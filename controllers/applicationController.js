const cases = require("change-case");
const db = require("../db/models");
const Applicants = db.Applicants;

const path = 'Applications';

const applicants = async(req, res) => {
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

const applicantProfile = async(req, res) => {
  req.session.path = path;
  req.session.subpath = cases.sentenceCase('applicants');
  const sessionData = req.session;
  sessionData.applicationId = req.params.profileid;
  try {
    res.render('applications/applicantProfile', {
      title: 'Application - Applicant Profile',
      sessionData
    });
  } catch(e) {
    res.render('applications/applicantProfile', {
      title: 'Application - Applicant Profile',
      sessionData
    });
  }
};

const getApplicantProfile = async(req, res) => {
  try {
    const applicationId = req.params.applicationid;
    const applicantData = await Applicants.findOne({
      plain: true, //ignores any extra information returned by Sequelize ORM
      where: {
        applicantID: applicationId,
      }
    });
    res.status(200).send({status: 200, data: applicantData, message: 'Applicant Data Fetched'});
  } catch(e) {
    console.log(e);
    res.status(500).send({status: 500, data: e, message: 'API Error'});
  }
};

module.exports = {
  applicants,
  applicantProfile,
  // getApplicants,
  getApplicantProfile,
};