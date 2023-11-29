
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  adminId: {
    type: String,
    required: true,
  },
  faculty: {
    type: String,
    required: true,
  },

  photo: {
    type: Buffer,
  },
});

module.exports = mongoose.model('Admininfo', adminSchema);
