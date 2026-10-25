const express = require('express');
const { Company, Registration, Contact, Volunteer, Donation } = require('../models');

const router = express.Router();

router.get('/companies', async (req, res) => {
  try {
    const companies = await Company.find().sort({ createdAt: -1 });
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Unable to load companies.', error: error.message });
  }
});

router.post('/companies', async (req, res) => {
  try {
    const { name, category, description, website } = req.body || {};

    if (!name) {
      return res.status(400).json({ message: 'Company name is required.' });
    }

    const company = await Company.create({
      name,
      category: category || '',
      description: description || '',
      website: website || '',
    });

    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: 'Unable to save company.', error: error.message });
  }
});

router.get('/registrations', async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Unable to load registrations.', error: error.message });
  }
});

router.post('/registrations', async (req, res) => {
  try {
    const { firstName, lastName, email, country } = req.body || {};

    if (!firstName || !lastName || !email || !country) {
      return res.status(400).json({ message: 'firstName, lastName, email, and country are required.' });
    }

    const registration = await Registration.create({
      ...req.body,
      consent: !!req.body?.consent,
    });

    res.status(201).json({ message: 'Registration saved successfully.', registration });
  } catch (error) {
    res.status(500).json({ message: 'Unable to create registration.', error: error.message });
  }
});

router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    const contact = await Contact.create({ ...req.body, phone: req.body.phone || '' });
    res.status(201).json({ message: 'Message saved successfully.', contact });
  } catch (error) {
    res.status(500).json({ message: 'Unable to save message.', error: error.message });
  }
});

router.post('/volunteer', async (req, res) => {
  try {
    const { name, email, focus, interest } = req.body || {};

    if (!name || !email || !focus || !interest) {
      return res.status(400).json({ message: 'Name, email, focus, and interest are required.' });
    }

    const volunteer = await Volunteer.create({ ...req.body });
    res.status(201).json({ message: 'Volunteer registration saved successfully.', volunteer });
  } catch (error) {
    res.status(500).json({ message: 'Unable to save volunteer form.', error: error.message });
  }
});

router.post('/donations', async (req, res) => {
  try {
    const { name, email, amount } = req.body || {};

    if (!name || !email || !amount) {
      return res.status(400).json({ message: 'Name, email, and amount are required.' });
    }

    const donation = await Donation.create({
      name,
      email,
      amount: Number(amount),
      purpose: req.body.purpose || 'General support',
    });

    res.status(201).json({ message: 'Donation saved successfully.', donation });
  } catch (error) {
    res.status(500).json({ message: 'Unable to save donation.', error: error.message });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const [registrations, contacts, volunteers, donations, companies] = await Promise.all([
      Registration.countDocuments(),
      Contact.countDocuments(),
      Volunteer.countDocuments(),
      Donation.countDocuments(),
      Company.countDocuments(),
    ]);

    res.json({
      registrations,
      contacts,
      volunteers,
      donations,
      companies,
    });
  } catch (error) {
    res.status(500).json({ message: 'Unable to load dashboard stats.', error: error.message });
  }
});

router.get('/admin', async (req, res) => {
  try {
    const [registrations, contacts, volunteers, donations, companies] = await Promise.all([
      Registration.find().sort({ createdAt: -1 }),
      Contact.find().sort({ createdAt: -1 }),
      Volunteer.find().sort({ createdAt: -1 }),
      Donation.find().sort({ createdAt: -1 }),
      Company.find().sort({ createdAt: -1 }),
    ]);

    res.json({
      stats: {
        registrations: registrations.length,
        contacts: contacts.length,
        volunteers: volunteers.length,
        donations: donations.length,
        companies: companies.length,
      },
      records: {
        registrations,
        contacts,
        volunteers,
        donations,
        companies,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Unable to load admin records.', error: error.message });
  }
});

module.exports = router;
