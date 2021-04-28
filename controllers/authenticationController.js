const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const randomstring = require('randomstring');
const moment = require('moment');
const config = require('../config/config.json');
const db = require("../db/models");
const User = db.Users;
const Op = db.Sequelize.Op;

const userRegistration = async (req, res) => {
  try {
    let postData = req.body;
    postData.userID = `${moment().unix()}-${randomstring.generate({
      length: 6,
      readable: true,
      capitalization: 'uppercase',
      charset: 'alphanumeric'
    })}`;
    // const [userData, status] = await User.findOrCreate({ where: { email: postData.email }, defaults: postData});
    // const [userData, status] = await User.create(postData);
    const userData = await User.create(postData);
    console.log('DB operation: ', userData.toJSON());
    res.send({ status: 200, data: userData, message: 'User created successfully' });
    // if (status === false) {
    //   res.send({ status: 200, data: userData, message: 'User already exists' });
    // } else {
    //   res.send({ status: 200, data: userData, message: 'User created successfully' });
    // }
  } catch (e) {
    console.log(e.name);
    if(e.name === 'SequelizeUniqueConstraintError') {
      res.send({ status: 201, data: e.name, message: 'User with same Mobile or EmailID already exists' });
    } else if(e.name === 'SequelizeValidationError') {
      res.send({ status: 201, data: e.name, message: `Invalid ${e.errors[0].path}` });
    } else {
      res.send({ status: 500, data: e, message: 'API Error Message' });
    }
  }
};

const userLogin = async (req, res) => {
  try {
    // console.log(req.body.email);
    let userData = await User.findOne({
      plain: true, //ignores any extra information returned by Sequelize ORM
      where: {
        email: req.body.email
      },
      attributes: ['id', 'name', ['password', 'hashedPass']]
    });
    if (!userData) {
      res.status(401).send({ message: 'User not found' });
    } else {
      userData = userData.toJSON(); //.toJSON returns only the data 
      // console.log(userData);
      // console.log(req.body.password, userData.hashedPass)
      const match = await bcrypt.compare(req.body.password, userData.hashedPass);
      // console.log(match);
      if(!match) {
        res.status(401).send({ message: 'Invalid Password' });
      } else {
        const token = jwt.sign({ userId: userData.userID }, config.jwtSecret, { expiresIn: '24h' });
        res.status(200).send({ token, message: 'Login Successfull' });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: e, message: 'Login failed. Please try again' });
  }
};

module.exports = {
  userRegistration,
  userLogin,
};