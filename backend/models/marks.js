

const mongoose = require('mongoose');

const markSchema = new mongoose.Schema({
  studentId: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  midterm: {
    MidSem1: Number,
    MidSem2: Number,
    MidSem3: Number,
    MidSem4: Number,
    MidSem5: Number
  },
  finalterm: {
    FinalSem1: Number,
    FinalSem2: Number,
    FinalSem3: Number,
    FinalSem4: Number,
    FinalSem5: Number
  }
})
 


module.exports = mongoose.model('Mark', markSchema);
