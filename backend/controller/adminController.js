const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AdminUser = require('../models/adminModel');
const User = require('../models/userModel');
 const Marks = require('../models/marks');
const dotenv = require('dotenv');

dotenv.config();

const createToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
  };

  return jwt.sign(payload, process.env.SECRET, { expiresIn: '40m' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if both email and password are provided
    if (!email || !password) {
      return res.status(400).json({ alert: "Email and password are required." });
    }

    const adminUser = await AdminUser.findOne({ email });

    if (!adminUser) {
      return res.status(401).json({ alert: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, adminUser.password);

    if (isPasswordValid) {
      const token = createToken(adminUser);
      return res.status(200).json({ user: { _id: adminUser._id, email: adminUser.email }, token });
    } else {
      return res.status(401).json({ alert: 'Invalid email or password' });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.getAdminInfo = (req, res) => {
  res.status(200).json(req.user);
};

exports.generateCredentials = async (req, res) => {
  try {
    const { name, studentId } = req.body;

     // Check if the student already exists
     const existingStudent = await User.findOne({ studentId });

     if (existingStudent) {
       return res.status(400).json({ error: 'Student already exists' });
     }

    // Generate a random password
    const generatedPassword = Math.random().toString(36).slice(2);

    //gi Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    // Create a new User document with the generated credentials
    const newUser = new User({
      name,
      studentId,
      email: `${name}@deerwalk.edu.np`,
      password: hashedPassword,
      isFirstLogin: true,
    });

    // Save the new user information to the database
    await newUser.save();

    res.status(200).json({
      message: 'Login credentials generated successfully',
      email: newUser.email,
      password: generatedPassword,
    });
  } catch (error) {
    console.error('Error generating login credentials:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Hash the new password before updating it in the database
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await User.findOneAndUpdate({ email }, { password: hashedPassword, isFirstLogin: false  });

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};





exports.saveMarks = async (req, res) => {
  try {
    const { studentId, semester, midTerm, finalTerm } = req.body;

    // Validate if the semester is within the allowed range
    const user = await User.findOne({ studentId });
    if (!user) {
      return res.status(404).json({ error: 'Student not found' });
    }

    if (semester > user.currentSemester) {
      return res.status(400).json({ error: 'Cannot add marks for future semesters' });
    }

    const existingMarks = await Marks.findOne({ studentId, semester });
    if (existingMarks) {
      return res.status(400).json({ error: 'Marks already exist for this semester' });
    }

    const newMarks = new Marks({
      studentId,
      semester,
      midTerm,
      finalTerm,
    });

    await newMarks.save();

    res.status(200).json({ message: 'Marks saved successfully' });
  } catch (error) {
    console.error('Error saving marks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

