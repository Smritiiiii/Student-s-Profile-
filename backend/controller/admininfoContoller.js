
const Admin = require('../models/admininfoModel');

exports.uploadAdminPhoto = async (req, res) => {
    try {
        const { file } = req;
    
        if (!file) {
          return res.status(400).json({ error: 'No file uploaded' });
        }
        const email = req.user.email;

        
        const adminInfo = await Admin.findOne({ email: email }); 
    
        if (!adminInfo) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        adminInfo.photo = file.buffer;
        
    
        await adminInfo.save();
    
        res.status(200).json({ message: 'Photo uploaded successfully' });
      } catch (error) {
        console.error('Error uploading user photo:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    };

exports.getAdminInfo = async (req, res) => {
  try {
    const { email } = req.query;

    const adminInfo = await Admin.findOne({ email });

    if (!adminInfo) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const { name, email: adminEmail, adminId, faculty, startDate, photo } = adminInfo;

    const photoData = photo ? photo.toString('base64') : null;

    res.status(200).json({ name, email: adminEmail, adminId, faculty, startDate, photo: photoData });
  } catch (error) {
    console.error('Error fetching admin data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
