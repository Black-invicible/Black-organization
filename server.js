const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const { initializeDatabase, listCompanies, listRegistrations, addRegistration, addContactMessage, addVolunteer, addDonation, getStats } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;
const rootDir = __dirname;
const publicDir = path.join(rootDir, 'public');

app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(publicDir));
app.use(express.static(rootDir));

const companyRoutes = require('./routes/companies');
const registrationRoutes = require('./routes/registrations');

app.use('/api/companies', companyRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/contact', registrationRoutes);
app.use('/api/volunteer', registrationRoutes);
app.use('/api/donations', registrationRoutes);

app.get('/health', (req, res) => {
  res.json({ ok: true, status: 'healthy', service: 'black-organization' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(rootDir, 'blackorganization.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(rootDir, 'register.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(publicDir, 'admin.html'));
});

app.get('/api/stats', async (req, res) => {
  try {
    const stats = await getStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch stats.', error: error.message });
  }
});

async function startServer() {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Black Organization server running on http://localhost:${PORT}`);
      console.log(`Database ready at ${path.join(rootDir, 'data', 'black_org.db')}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
}

startServer();
