
const { Binary } = require('mongodb');
const mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  
  startDate: {
    type: Date, 
    required: true,
  },

  photo:{
    type: Buffer,
  }
});



module.exports = mongoose.model('Info', infoSchema);
