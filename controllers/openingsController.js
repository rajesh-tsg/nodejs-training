const db = require("../db/models");
const Openings = db.Openings;
const { Sequelize } = require("sequelize");
const cases = require("change-case");

const path = 'Openings';

const addOpening = async(req, res) => {
  try {
    const data = req.body;
    console.log(data);
    await Openings.create(data);
    res.status(200).send({status: 200, message: 'Job opening posted successfully'});
  } catch(e) {
    console.log(e);
    if (e.name === 'SequelizeUniqueConstraintError') {
      res.status(500).send({ status: 500, data: e.name, message: 'User with same Mobile or EmailID already exists' });
    } else if (e.name === 'SequelizeValidationError') {
      res.status(500).send({ status: 500, data: e.name, message: `Invalid ${e.errors[0].path}` });
    } else {
      res.status(500).send({ status: 500, data: e, message: 'API Error Message' });
    }
  }
};

const getJobOpenings = async(req, res) => {
  try {
    const data = await Openings.findAll({
      order: [['updatedAt', 'DESC']],
      attributes: ['id', 'openingName', 'location', 'department', 'updatedAt', 
      [Sequelize.literal(`CASE WHEN isActive = true THEN 'ACTIVE' ELSE 'INACTIVE' END`), 'status'],
    ]
    });
    res.status(200).send({status: 200, data, message: 'Job openings fetched successfully'});
  } catch(e) {
    console.log(e);
    res.status(500).send({status: 500, message: 'API Error. Please try again'});
  }
};

const jobs = async(req, res) => {
  req.session.path = path;
  req.session.subpath = cases.sentenceCase('jobs');
  const sessionData = req.session;
  try {
    res.render('openings/jobs', {
      title: 'Openings - Jobs',
      sessionData
    });
  } catch(e) {
    res.render('openings/jobs', {
      title: 'Openings - Jobs',
      sessionData
    });
  }
};

const jobOpeningDetails = async(req, res) => {
  req.session.path = path;
  req.session.subpath = cases.sentenceCase('job details');
  const openingId = req.params.openingid || '';
  const sessionData = req.session;
  try {
    res.render('openings/jobOpeningDetails', {
      title: 'Openings - Job Details',
      sessionData,
      openingId
    });
  } catch(e) {
    res.render('openings/jobOpeningDetails', {
      title: 'Openings - Job Details',
      sessionData,
      openingId
    });
  }
};

const updateJobOpeningStatus = async(req, res) => {
  try {
    let postData = req.body;
    console.log(postData);
    await Openings.update({
      isActive: postData.status,
    }, {
      where: {
        id: req.params.openingid,
      }
    });
    res.status(200).send({status: 200, message: `Updating job opening status...`});
  } catch(e) {
    console.log(e);
    res.status(500).send({status: 500, message: 'API Error. Please try again'});
  }
};

const getJobOpeningDetails = async(req, res) => {
  try {
    const openingId = req.params.openingid;
    const data = await Openings.findOne({
      where: {
        id: openingId,
      }
    });
    res.status(200).send({status: 200, data, message: 'Job details fetched!'});
  } catch(e) {
    console.log(e);
    res.status(500).send({status: 500, message: 'API Error. Please try again'});
  }
};

module.exports = {
  addOpening,
  getJobOpenings,
  jobs,
  updateJobOpeningStatus,
  getJobOpeningDetails,
  jobOpeningDetails,
}