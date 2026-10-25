const express = require('express');
const { Company } = require('../models');

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

module.exports = router;
