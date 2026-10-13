const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  studentId: { type: String, required: true },
  major: { type: String }
});

module.exports = mongoose.model('Student', studentSchema);