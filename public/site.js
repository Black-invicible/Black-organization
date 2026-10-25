const express = require('express');
const { listRegistrations, addRegistration, addContactMessage, addVolunteer, addDonation } = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const records = await listRegistrations();
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Unable to load registrations.', error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const required = ['firstName', 'lastName', 'email', 'country'];
    const invalid = required.find((field) => !req.body?.[field]);

    if (invalid) {
      return res.status(400).json({ message: `${invalid} is required.` });
    }

    const record = await addRegistration(req.body);
    res.status(201).json({ message: 'Registration saved successfully.', record });
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

    const record = await addContactMessage(req.body);
    res.status(201).json({ message: 'Message saved successfully.', record });
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

    const record = await addVolunteer(req.body);
    res.status(201).json({ message: 'Volunteer registration saved successfully.', record });
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

    const record = await addDonation(req.body);
    res.status(201).json({ message: 'Donation saved successfully.', record });
  } catch (error) {
    res.status(500).json({ message: 'Unable to save donation.', error: error.message });
  }
});

module.exports = router;
