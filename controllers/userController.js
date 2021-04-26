const getUser = async (req, res) => {
  try {
    const userInfo = {
      name: 'Rajesh Mishra',
      age: 25,
      gender: 'Male',
      mobile: 8908880324,
      email: 'rajesh.mishra2295@gmail.com'
    }
    res.send({status: 200, data: userInfo, message: 'API Success Message'});
  } catch(e) {
    res.send({status: 500, data: e, message: 'API Error Message'});
  }
};

module.exports = {
  getUser,
};