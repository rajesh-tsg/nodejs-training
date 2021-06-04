const jobOpeningDetails = async(req, res) => {
  const openingId = req.params.openingid;
  try {
    res.render('public/job-details', {
      title: 'Openings - Jobs',
      openingId
    });
  } catch(e) {
    res.render('public/job-details', {
      title: 'Openings - Jobs',
      openingId
    });
  }
 };

module.exports = {
  jobOpeningDetails,
}