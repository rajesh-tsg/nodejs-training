const userRegistration = async(req, res) => {
  try {
    let postData = req.body;
    res.send({status: 200, data: postData, message: 'API Success Message'});
  } catch(e) {
    res.send({status: 500, data: e, message: 'API Error Message'});
  }
};

module.exports = {
  userRegistration,
};