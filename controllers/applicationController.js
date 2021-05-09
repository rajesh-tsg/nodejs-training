const cases = require("change-case");
const moment = require('moment');
const db = require("../db/models");
const Applicants = db.Applicants;
const Timeline = db.Timeline;

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
  const applicationId = req.params.profileid || '';
  try {
    res.render('applications/applicantProfile', {
      title: 'Application - Applicant Profile',
      applicationId,
      moment,
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
    let applicantData = await Applicants.findOne({
      plain: true, //ignores any extra information returned by Sequelize ORM
      where: {
        applicantID: applicationId,
      }
    });
    applicantData = applicantData.toJSON();
    applicantData.category = (applicantData.isFresher === false ? 'Experienced' : 'Fresher');
    applicantData.experience = Math.floor(applicantData.experience/12) || 0;
    applicantData.appliedOn = moment(applicantData.createdAt).format('DD/MM/YYYY');
    // console.log(applicantData);
    // console.log(applicantData.isFresher === false ? 'Experienced' : 'Fresher');
    res.status(200).send({status: 200, data: applicantData, message: 'Applicant Data Fetched'});
  } catch(e) {
    console.log(e);
    res.status(500).send({status: 500, data: e, message: 'API Error'});
  }
};

const getTimeline = async(req, res) => {
  try {
    const applicationId = req.params.applicationid;
    let applicantData = await Timeline.findAll({
      //plain: true, //ignores any extra information returned by Sequelize ORM
      where: {
        applicantID: applicationId,
      }
    });
    if(applicantData) {
      // applicantData = applicantData.toJSON();
      // console.log(applicantData);
      res.status(200).send({status: 200, data: applicantData, message: 'Applicant Timeline Fetched'});
    } else {
      res.status(200).send({status: 200, data: 'No Informations Available', message: 'No Applicant Timeline Found'});
    }
  } catch(e) {
    console.log(e);
    res.status(500).send({status: 500, data: e, message: 'API Error'});
  }
};

const addTimeline = async(req, res) => {
  try {
    let postData = req.body;
    postData.applicantID = req.params.applicationid;
    const roundCounter = await Timeline.count({
      where: {
        applicantID: req.params.applicationid,
      }
    });
    if(parseInt(roundCounter, 10) === 0) {
      await Applicants.update({
        statusCode: 1,
        status: 'Processing',
      },
      {
        where: {
          applicantID: req.params.applicationid,
        }
      });
    }
    postData.round = `Round ${parseInt(roundCounter, 10) + 1}`;
    // console.log(postData);
    const timelineData = await Timeline.create(postData);
    res.status(200).send({status: 200, data: timelineData, message: 'Timeline created successfully'});
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
  getTimeline,
  addTimeline,
};