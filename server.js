const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const projectRoot = __dirname;
const envPath = path.resolve(projectRoot, '.env');
const atlasEnvPath = path.resolve(projectRoot, 'atlas-credentials.env');

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

if (fs.existsSync(atlasEnvPath)) {
  dotenv.config({ path: atlasEnvPath, override: true });
}

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || '';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'blackorganization.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'));
});

const companyRoutes = require('./routes/companies');
const registrationRoutes = require('./routes/registrations');
app.use('/api/companies', companyRoutes);
app.use('/api/registrations', registrationRoutes);

async function connectToMongo() {
  if (!MONGODB_URI) {
    console.warn('Missing MONGODB_URI in environment. Add it to .env or atlas-credentials.env.');
    return false;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 20000,
      autoIndex: true,
    });

    console.log('Connected to MongoDB Atlas successfully.');
    return true;
  } catch (error) {
    const message = (error && error.message ? error.message : String(error)).toLowerCase();

    console.error('Failed to connect to MongoDB Atlas:', error.message || error);

    if (message.includes('not whitelisted') || message.includes('whitelist') || message.includes('econnrefused') || message.includes('timeout')) {
      console.warn('This usually means your current public IP is not allowed in MongoDB Atlas. Add your IP under Network Access > IP Whitelist in Atlas.');
    }

    console.warn('Continuing in local-mode without MongoDB connectivity. The server will still start, but database-backed routes will fail until Atlas is reachable.');
    return false;
  }
}

async function startServer() {
  await connectToMongo();

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

startServer();
