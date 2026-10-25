const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, default: '' },
    description: { type: String, default: '' },
    website: { type: String, default: '' },
  },
  { timestamps: true }
);

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

const contactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    message: String,
  },
  { timestamps: true }
);

const volunteerSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    focus: String,
    interest: String,
  },
  { timestamps: true }
);

const donationSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    amount: Number,
    purpose: String,
  },
  { timestamps: true }
);

const Company = mongoose.model('Company', companySchema);
const Registration = mongoose.model('Registration', registrationSchema);
const Contact = mongoose.model('Contact', contactSchema);
const Volunteer = mongoose.model('Volunteer', volunteerSchema);
const Donation = mongoose.model('Donation', donationSchema);

module.exports = {
  Company,
  Registration,
  Contact,
  Volunteer,
  Donation,
};
