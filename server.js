const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || '';
const rootDir = __dirname;
const publicDir = path.join(rootDir, 'public');

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

function injectSiteScript(html) {
  if (!html || html.includes('/site.js')) return html;
  return html.replace(/<\/body>/i, '<script src="/site.js"></script>\n</body>');
}

app.use((req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  if (!req.path.endsWith('.html')) return next();

  const relativePath = req.path.startsWith('/public/')
    ? req.path.replace(/^\/public\//, '')
    : req.path.replace(/^\//, '');

  const filePath = path.join(rootDir, req.path.startsWith('/public/') ? 'public' : '', relativePath);

  if (!fs.existsSync(filePath)) return next();

  const html = fs.readFileSync(filePath, 'utf8');
  return res.send(injectSiteScript(html));
});

app.use(express.static(publicDir));
app.use(express.static(rootDir));

const companyRoutes = require('./routes/companies');
const registrationRoutes = require('./routes/registrations');

app.use('/api', companyRoutes);
app.use('/api', registrationRoutes);

app.get('/health', (req, res) => {
  res.json({ ok: true, status: 'healthy', service: 'black-organization' });
});

app.get('/', (req, res) => {
  const homeFile = path.join(rootDir, 'blackorganization.html');
  const html = fs.readFileSync(homeFile, 'utf8');
  res.send(injectSiteScript(html));
});

app.get('/register', (req, res) => {
  const registerFile = path.join(rootDir, 'register.html');
  const html = fs.readFileSync(registerFile, 'utf8');
  res.send(injectSiteScript(html));
});

app.get('/admin', (req, res) => {
  const adminFile = path.join(publicDir, 'admin.html');
  const html = fs.readFileSync(adminFile, 'utf8');
  res.send(injectSiteScript(html));
});

async function connectToMongo() {
  if (!MONGODB_URI) {
    console.warn('Missing MONGODB_URI in environment. Add it to .env or your hosting settings.');
    return false;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 20000,
      autoIndex: true,
    });

    console.log('Connected to MongoDB successfully.');
    return true;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message || error);
    console.warn('Server will still start in degraded mode; database-backed routes will fail until MongoDB is available.');
    return false;
  }
}

async function startServer() {
  await connectToMongo();

  app.listen(PORT, () => {
    console.log(`Black Organization server running at http://localhost:${PORT}`);
  });
}

startServer();
