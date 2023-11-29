
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
 
});

adminUserSchema.statics.login = async function (email, password) {
  const admin = await this.findOne({ email });

  if (!admin) {
    throw new Error('Invalid email');
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);

  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  return admin;
};



module.exports = mongoose.model('Admin', adminUserSchema);
