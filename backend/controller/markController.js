const Mark = require('../models/marks');

exports.getMarkData = async (req, res) => {
  try {
    // Ensure that req.user contains the user's email address correctly
    if (!req.user || !req.user.email) {
      return res.status(401).json({ error: 'User email not found in the request' });
    }

    // Fetch marks data for the authenticated user using their email
    const marks = await Mark.findOne({ email: req.user.email });


    res.status(200).json(marks);
  } catch (error) {
    
    res.status(500).json({ error: 'Internal server error' });
  }
};











































