# Black Organization

This project is a full-stack business website and backend for Black Organization, built with Express and MongoDB.

## Features

- Live Express server for the website and API
- MongoDB-backed data storage for registrations, contact messages, company records, volunteers, and donations
- Admin dashboard showing count totals and full saved record tables
- Static HTML pages served from the repo root and `public/` folder
- Production-ready setup using environment variables and a health endpoint

## Project structure

- `server.js` — app entry point and server configuration
- `routes/` — API routes for registration and company data
- `models/` — MongoDB schemas and models
- `public/` — frontend pages and shared scripts
- `blackorganization.html` — main landing page
- `register.html` — membership registration page

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create your environment file from the example:
   ```bash
   cp .env.example .env
   ```

3. Update `MONGODB_URI` in `.env` for your MongoDB instance.

4. Start the app:
   ```bash
   npm start
   ```

5. Open the app in a browser:
   - Home: `http://localhost:5000/`
   - Register: `http://localhost:5000/register`
   - Admin: `http://localhost:5000/admin`

## Production deployment

For deployment on Render, Railway, Fly.io, or a Node host, set:

- `PORT`
- `NODE_ENV=production`
- `MONGODB_URI`

Use MongoDB Atlas or another managed MongoDB service for the database.

## API endpoints

- `GET /health`
- `GET /api/stats`
- `GET /api/admin`
- `GET /api/companies`
- `POST /api/companies`
- `GET /api/registrations`
- `POST /api/registrations`
- `POST /api/contact`
- `POST /api/volunteer`
- `POST /api/donations`
