const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const dotenv = require('dotenv');

dotenv.config();


const createToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    studentId: user.studentId,
    
  
  };

  return jwt.sign(payload, process.env.SECRET, { expiresIn: '40m' });
};



// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email is in the correct format
    if (!email.endsWith("@deerwalk.edu.np")) {
      return res.status(403).json({ alert: "Access denied. Please use a valid email." });
    }
 
    

    // Check if both email and password are provided
    if (!email || !password) {
      return res.status(400).json({ alert: "Email and password are required." });
    }

    const user = await User.findOne({ email });

    
    if (!user) {
      return res.status(401).json({ alert: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);


    

    if (isPasswordValid) {
      const token = createToken(user);
      return res.status(200).json({ user: { _id: user._id, email: user.email, studentId: user.studentId }, token });
    } else {
      console.log('Password comparison failed');
      return res.status(401).json({ alert: 'Invalid email or password' });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.getUserInfo = (req, res) => {
  res.status(200).json(req.user);
};
