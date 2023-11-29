

const User = require('../models/infoModel');

exports.uploadUserPhoto =  async (req, res) => {

  try {
    const { file } = req;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const userInfo = await User.findOne({ email: req.user.email }); 

    if (!userInfo) {
      return res.status(404).json({ error: 'User not found' });
    }

    userInfo.photo = file.buffer;
    

    await userInfo.save();

    res.status(200).json({ message: 'Photo uploaded successfully' });
  } catch (error) {
    console.error('Error uploading user photo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const { email } = req.query;

    const userInfo = await User.findOne({ email });

    if (!userInfo) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { name, email: userEmail, studentId, startDate, photo } = userInfo;

    const photoData = photo ? photo.toString('base64') : null;
    

      
    res.status(200).json({ name, email: userEmail, studentId, startDate, photo: photoData });

    // console.log(photoData)


  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};







