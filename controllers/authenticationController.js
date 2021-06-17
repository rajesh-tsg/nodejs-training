const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
// const randomstring = require('randomstring');
// const moment = require('moment');
const config = require('../config/config.json');
const db = require("../db/models");
const User = db.Users;
const Op = db.Sequelize.Op;

const userRegistration = async (req, res) => {
  try {
    let postData = req.body;
    // postData.userID = `${moment().unix()}-${randomstring.generate({
    //   length: 6,
    //   readable: true,
    //   capitalization: 'uppercase',
    //   charset: 'alphanumeric'
    // })}`;
    // if (postData.accType === undefined) {
    //   postData.accType = 'Admin';
    //   postData.isAdmin = 1;
    // }
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
    if (e.name === 'SequelizeUniqueConstraintError') {
      res.status(500).send({ status: 500, data: e.name, message: 'User with same Mobile or EmailID already exists' });
    } else if (e.name === 'SequelizeValidationError') {
      res.status(500).send({ status: 500, data: e.name, message: `Invalid ${e.errors[0].path}` });
    } else {
      res.status(500).send({ status: 500, data: e, message: 'API Error Message' });
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
      attributes: ['id', 'name', 'accType', 'userID', ['password', 'hashedPass']]
    });
    if (!userData) {
      res.status(401).send({ message: 'User not found. Please try again' });
    } else {
      userData = userData.toJSON(); //.toJSON returns only the data 
      console.log(userData);
      // console.log(req.body.password, userData.hashedPass)
      const match = await bcrypt.compare(req.body.password, userData.hashedPass);
      // console.log(match);
      if (!match) {
        res.status(401).send({ message: 'Invalid Password. Please try again' });
      } else {
        const token = jwt.sign({ userId: userData.userID, isActive: true, userType: userData.accType }, config.jwtSecret, { expiresIn: '24h' });
        let sessionData = req.session;
        sessionData.user = {};
        sessionData.token = token;
        sessionData.user.name = userData.name;
        sessionData.user.email = userData.email;
        sessionData.user.userType = userData.accType;
        res.status(200).send({ token: token, userType: userData.accType, message: 'Login Successfull' });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: e, message: 'Login failed. Please try again' });
  }
};

const userLogout = async (req, res) => {
  try {
    let sessionData = req.session;
    const userType = sessionData.user.userType;
    const logout = await sessionData.destroy();
    // console.log(logout);
    if(userType === 'admin') {
      res.redirect('/admin-login');
    } else {
      res.redirect('/');
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: e, message: 'Logout Failed. Please try again' });
  }
}

const applicantLogin = async(req, res) => {
  try {
    // console.log(req.body.email);
    let userData = await User.findOne({
      where: {
        mobile: req.body.mobile
      },
    });
    if(!userData) {
      res.status(401).send({ message: 'User not found. Redirect to Signup' });
    } else if(userData.isAdmin === 1) {
      res.status(201).send({ message: 'User is Admin. Point to Admin Login' });
    } else if(userData.isAdmin === 0 && userData.accType === 'applicant') {
      // Log signup/register events in Visitors table
      res.status(200).send({ message: 'User registered. Continue login' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: e, message: 'Login failed. Please try again' });
  }
}

const forgotPassword = async(req, res) => {
  try {
    const postData = req.body;
    if(postData.newPassword === postData.confirmNewPassword) {
      await User.update({
          password: postData.newPassword
        }, {
        individualHooks: true,
        where: {
          email: postData.email
        }
      });
      res.status(200).send({message: 'Password updated successfully'});
    } else {
      res.status(500).send({ message: 'Forgot Password validation failed' });
    }
  } catch(e) {
    console.log(e);
    res.status(500).send({ error: e, message: 'Forgot Password failed. Please try again' });
  }
};

module.exports = {
  userRegistration,
  userLogin,
  userLogout,
  applicantLogin,
  forgotPassword,
};