const dbConfig = require('../../config/db.config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  //logging: false  //To log all the running queries
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require('../models/Users.model')(sequelize, Sequelize);
db.Applicants = require('../models/Applicants.model')(sequelize, Sequelize);
db.Timeline = require('../models/Timeline.model')(sequelize, Sequelize);
db.Openings = require('../models/Openings.model')(sequelize, Sequelize);

module.exports = db;
