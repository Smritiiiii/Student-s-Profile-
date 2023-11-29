const mongoose = require('mongoose');

 const achievementSchema = new mongoose.Schema({
    email: { type: String, required: true },
    Internship: {
      date: String,
      placement: String,
      position: String,
    },
    Scholarship: {
      semester: String,
      position: String,
      amount: String,
    },
    Workshop: {
      name: String,
      'conducted by': String,
      mentor: String,
      date: String,
    },
  });
  
  const Achievement = mongoose.model('Achievement', achievementSchema);
  
  module.exports = Achievement;
  

module.exports = mongoose.model('Achievement', achievementSchema);
