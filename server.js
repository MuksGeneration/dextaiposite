import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// SQLite Database Setup
const db = new sqlite3.Database(path.join(__dirname, 'dexta.db'), (err) => {
  if (err) console.error('Database error:', err);
  else console.log('✓ Connected to SQLite database');
});

// Initialize database tables
db.serialize(() => {
  // Registrations table
  db.run(`
    CREATE TABLE IF NOT EXISTS registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      national_id TEXT NOT NULL,
      service TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // IPO Subscriptions table
  db.run(`
    CREATE TABLE IF NOT EXISTS ipo_subscriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      shares INTEGER NOT NULL,
      amount REAL NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // IPO Live Data table
  db.run(`
    CREATE TABLE IF NOT EXISTS ipo_data (
      id INTEGER PRIMARY KEY,
      price REAL DEFAULT 150,
      subscription_percent REAL DEFAULT 68,
      total_shares INTEGER DEFAULT 125400,
      last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Initialize IPO data if empty
  db.get('SELECT * FROM ipo_data WHERE id = 1', (err, row) => {
    if (!row) {
      db.run('INSERT INTO ipo_data (id, price, subscription_percent, total_shares) VALUES (1, 150, 68, 125400)');
    }
  });
});

// ─────────────────────────────────────────────────
// API ENDPOINTS
// ─────────────────────────────────────────────────

// Register user
app.post('/api/register', (req, res) => {
  const { name, email, phone, national_id, service } = req.body;

  if (!name || !email || !phone || !national_id || !service) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  db.run(
    'INSERT INTO registrations (name, email, phone, national_id, service) VALUES (?, ?, ?, ?, ?)',
    [name, email, phone, national_id, service],
    function (err) {
      if (err) {
        console.error('Registration error:', err);
        return res.status(500).json({ error: 'Failed to register' });
      }
      res.status(201).json({
        success: true,
        message: 'Registration successful! We will contact you soon.',
        id: this.lastID
      });
    }
  );
});

// Get current IPO price
app.get('/api/ipo/price', (req, res) => {
  db.get('SELECT * FROM ipo_data WHERE id = 1', (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch IPO price' });
    }
    res.json({
      price: row?.price || 150,
      subscription: row?.subscription_percent || 68,
      volume: row?.total_shares || 125400,
      min_shares: 100,
      min_investment: 15000
    });
  });
});

// Subscribe to IPO
app.post('/api/ipo/subscribe', (req, res) => {
  const { email, shares } = req.body;

  if (!email || !shares || shares < 100) {
    return res.status(400).json({ error: 'Valid email and minimum 100 shares required' });
  }

  const amount = shares * 150;

  db.run(
    'INSERT INTO ipo_subscriptions (email, shares, amount) VALUES (?, ?, ?)',
    [email, shares, amount],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to subscribe' });
      }

      // Update subscription percentage
      db.all('SELECT COUNT(*) as count, SUM(shares) as total FROM ipo_subscriptions', (err, rows) => {
        const total_subs = rows[0]?.total || 0;
        const new_percent = Math.min(99, (total_subs / 100000) * 100);
        
        db.run('UPDATE ipo_data SET subscription_percent = ? WHERE id = 1', [new_percent]);
      });

      res.status(201).json({
        success: true,
        message: `Successfully subscribed to ${shares} shares!`,
        amount,
        subscription_id: this.lastID
      });
    }
  );
});

// Get registration count
app.get('/api/stats', (req, res) => {
  db.all(`
    SELECT COUNT(*) as registrations FROM registrations;
  `, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch stats' });
    }
    res.json({
      registrations: rows[0]?.registrations || 0,
      active: true
    });
  });
});

// Serve static files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════╗
║  🚀 Dexta Investment Platform Backend Running  ║
║     Server: http://localhost:${PORT}              ║
║     API Docs: http://localhost:${PORT}/api       ║
╚════════════════════════════════════════════════╝
  `);
});
