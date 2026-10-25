const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    country: String,
    city: String,
    address: String,
    company: String,
    clientType: String,
    about: String,
    consent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Registration', registrationSchema);
