const express = require('express');
const router = express.Router();
// const requireAuth = require('../middleware/requireAuth');
const Info = require('../models/infoModel');

// POST route to save student information
router.post('/saveStudentInfo',  async (req, res) => {
  try {
    const { name, email, studentId, startDate } = req.body;


    // Create a new Info document with the provided data
    const newStudent = new Info({
      name,
      email,
      studentId,
      startDate,
    });

    // Save the new student information to the database
    await newStudent.save();

    res.status(200).json({ message: 'Student information saved successfully' });
  } catch (error) {
    console.error('Error saving student information:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
