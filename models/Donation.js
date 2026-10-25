const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    focus: String,
    interest: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Volunteer', volunteerSchema);
