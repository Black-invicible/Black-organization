const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'black_org.db');
const db = new sqlite3.Database(dbPath);

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows || []);
    });
  });
}

async function initializeDatabase() {
  await run(`
    CREATE TABLE IF NOT EXISTS registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      lastName TEXT,
      email TEXT,
      phone TEXT,
      country TEXT,
      city TEXT,
      address TEXT,
      company TEXT,
      clientType TEXT,
      about TEXT,
      consent INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      phone TEXT,
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS volunteers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      focus TEXT,
      interest TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS donations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      amount REAL,
      purpose TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS companies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT,
      description TEXT,
      website TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const companyCount = await get('SELECT COUNT(*) AS count FROM companies');
  if (!companyCount || Number(companyCount.count) === 0) {
    const seedCompanies = [
      ['Black Fashion', 'Fashion House', 'Clothing designed for confidence and identity.', 'black-fashion.html'],
      ['Designwurld', 'Graphics & Design', 'Branding, creative direction, and design systems.', 'DSW.html'],
      ['OworldTech', 'Software Development', 'Web platforms and software engineering for digital growth.', 'OworldTech.html'],
      ['Creative Academy', 'Education & Creative Studio', 'Learning, research, and creative production in one place.', 'CreativeAcademy v2.1.html'],
      ['Golden Empire International', 'Corporate & Strategy', 'Leadership, planning, and global coordination.', 'goldenempireintl.html'],
      ['Black Organization Info', 'Media & Information', 'A central directory for the entire organization.', 'allinfo.html']
    ];

    for (const [name, category, description, website] of seedCompanies) {
      await run(
        'INSERT INTO companies (name, category, description, website) VALUES (?, ?, ?, ?)',
        [name, category, description, website]
      );
    }
  }
}

async function listCompanies() {
  return await all('SELECT * FROM companies ORDER BY id ASC');
}

async function listRegistrations() {
  return await all('SELECT * FROM registrations ORDER BY id DESC');
}

async function addRegistration(payload) {
  const fields = [
    payload.firstName,
    payload.lastName,
    payload.email,
    payload.phone,
    payload.country,
    payload.city,
    payload.address,
    payload.company,
    payload.clientType,
    payload.about,
    payload.consent ? 1 : 0
  ];

  const result = await run(
    `INSERT INTO registrations (
      firstName, lastName, email, phone, country, city, address, company, clientType, about, consent
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    fields
  );

  return { id: result.id, ...payload, consent: payload.consent ? 1 : 0 };
}

async function addContactMessage(payload) {
  const result = await run(
    'INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)',
    [payload.name, payload.email, payload.phone || '', payload.message || '']
  );

  return { id: result.id, ...payload };
}

async function addVolunteer(payload) {
  const result = await run(
    'INSERT INTO volunteers (name, email, focus, interest) VALUES (?, ?, ?, ?)',
    [payload.name, payload.email, payload.focus, payload.interest]
  );

  return { id: result.id, ...payload };
}

async function addDonation(payload) {
  const result = await run(
    'INSERT INTO donations (name, email, amount, purpose) VALUES (?, ?, ?, ?)',
    [payload.name, payload.email, Number(payload.amount || 0), payload.purpose || 'General support']
  );

  return { id: result.id, ...payload, amount: Number(payload.amount || 0) };
}

async function getStats() {
  const [registrations, contacts, volunteers, donations] = await Promise.all([
    get('SELECT COUNT(*) AS count FROM registrations'),
    get('SELECT COUNT(*) AS count FROM contacts'),
    get('SELECT COUNT(*) AS count FROM volunteers'),
    get('SELECT COUNT(*) AS count FROM donations')
  ]);

  return {
    registrations: Number(registrations?.count || 0),
    contacts: Number(contacts?.count || 0),
    volunteers: Number(volunteers?.count || 0),
    donations: Number(donations?.count || 0)
  };
}

module.exports = {
  db,
  initializeDatabase,
  listCompanies,
  listRegistrations,
  addRegistration,
  addContactMessage,
  addVolunteer,
  addDonation,
  getStats,
  run,
  get,
  all
};
