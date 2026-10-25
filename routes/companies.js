const express = require('express');
const { listCompanies } = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const companies = await listCompanies();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Unable to load companies.', error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, category, description, website } = req.body || {};

    if (!name) {
      return res.status(400).json({ message: 'Company name is required.' });
    }

    const result = await require('../db').run(
      'INSERT INTO companies (name, category, description, website) VALUES (?, ?, ?, ?)',
      [name, category || '', description || '', website || '']
    );

    res.status(201).json({ id: result.id, name, category, description, website });
  } catch (error) {
    res.status(500).json({ message: 'Unable to save company.', error: error.message });
  }
});

module.exports = router;
