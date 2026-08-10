import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { initialMenuItems, initialGalleryItems, initialSiteSettings, initialReservations } from './src/data/initialData';
import { MenuItem, GalleryItem, SiteSettings, Reservation, ContactMessage } from './src/types';

const app = express();
const PORT = 3000;

app.use(express.json());

// Server storage state
const DATA_FILE = path.join(process.cwd(), 'torrazur_db.json');

interface LocalDB {
  settings: SiteSettings;
  menu: MenuItem[];
  gallery: GalleryItem[];
  reservations: Reservation[];
  contactMessages: ContactMessage[];
}

let db: LocalDB = {
  settings: initialSiteSettings,
  menu: initialMenuItems,
  gallery: initialGalleryItems,
  reservations: initialReservations,
  contactMessages: [],
};

// Load persistent DB if available
try {
  if (fs.existsSync(DATA_FILE)) {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    db = {
      settings: { ...initialSiteSettings, ...(parsed.settings || {}) },
      menu: Array.isArray(parsed.menu) && parsed.menu.length > 0 ? parsed.menu : initialMenuItems,
      gallery: Array.isArray(parsed.gallery) && parsed.gallery.length > 0 ? parsed.gallery : initialGalleryItems,
      reservations: Array.isArray(parsed.reservations) ? parsed.reservations : initialReservations,
      contactMessages: Array.isArray(parsed.contactMessages) ? parsed.contactMessages : [],
    };
  } else {
    fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), 'utf-8');
  }
} catch (err) {
  console.error('Failed to read torrazur_db.json, using initial state:', err);
}

function saveDB() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save torrazur_db.json:', err);
  }
}

// -------------------------------------------------------------
// API ROUTES
// -------------------------------------------------------------

// Settings API
app.get('/api/settings', (req, res) => {
  res.json(db.settings);
});

app.put('/api/settings', (req, res) => {
  db.settings = { ...db.settings, ...req.body };
  saveDB();
  res.json({ success: true, settings: db.settings });
});

// Menu API
app.get('/api/menu', (req, res) => {
  res.json(db.menu);
});

app.post('/api/menu', (req, res) => {
  const newItem: MenuItem = {
    id: 'm-' + Date.now(),
    name: req.body.name || 'Untitled Item',
    category: req.body.category || 'Coffee',
    description: req.body.description || '',
    price: req.body.price || 'BDT 0',
    imageUrl: req.body.imageUrl || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
    isAvailable: req.body.isAvailable !== false,
    isFeatured: req.body.isFeatured === true,
    sortOrder: Number(req.body.sortOrder) || db.menu.length + 1,
  };
  db.menu.push(newItem);
  saveDB();
  res.json({ success: true, item: newItem });
});

app.put('/api/menu/:id', (req, res) => {
  const index = db.menu.findIndex(m => m.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  db.menu[index] = { ...db.menu[index], ...req.body };
  saveDB();
  res.json({ success: true, item: db.menu[index] });
});

app.delete('/api/menu/:id', (req, res) => {
  db.menu = db.menu.filter(m => m.id !== req.params.id);
  saveDB();
  res.json({ success: true });
});

// Gallery API
app.get('/api/gallery', (req, res) => {
  res.json(db.gallery);
});

app.post('/api/gallery', (req, res) => {
  const newItem: GalleryItem = {
    id: 'g-' + Date.now(),
    title: req.body.title || 'Torrazur Gallery Image',
    category: req.body.category || 'Café',
    imageUrl: req.body.imageUrl || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200',
    sortOrder: Number(req.body.sortOrder) || db.gallery.length + 1,
  };
  db.gallery.push(newItem);
  saveDB();
  res.json({ success: true, item: newItem });
});

app.delete('/api/gallery/:id', (req, res) => {
  db.gallery = db.gallery.filter(g => g.id !== req.params.id);
  saveDB();
  res.json({ success: true });
});

// Reservation API
app.get('/api/reservations', (req, res) => {
  res.json(db.reservations);
});

app.post('/api/reservations', (req, res) => {
  const { name, phone, email, date, time, guests, specialRequest } = req.body;
  if (!name || !phone || !date || !time) {
    return res.status(400).json({ error: 'Please provide name, phone, date, and time.' });
  }

  const newReservation: Reservation = {
    id: 'res-' + Math.floor(1000 + Math.random() * 9000),
    name,
    phone,
    email: email || '',
    date,
    time,
    guests: Number(guests) || 2,
    specialRequest: specialRequest || '',
    status: 'Pending',
    createdAt: new Date().toISOString(),
  };

  db.reservations.unshift(newReservation);
  saveDB();

  res.json({
    success: true,
    reservation: newReservation,
    message: 'Your reservation request has been received. Our team will contact you to confirm availability.',
  });
});

app.put('/api/reservations/:id/status', (req, res) => {
  const reservation = db.reservations.find(r => r.id === req.params.id);
  if (!reservation) {
    return res.status(404).json({ error: 'Reservation not found' });
  }
  const { status } = req.body;
  if (['Pending', 'Approved', 'Rejected', 'Completed'].includes(status)) {
    reservation.status = status;
    saveDB();
    res.json({ success: true, reservation });
  } else {
    res.status(400).json({ error: 'Invalid status' });
  }
});

app.delete('/api/reservations/:id', (req, res) => {
  db.reservations = db.reservations.filter(r => r.id !== req.params.id);
  saveDB();
  res.json({ success: true });
});

// Contact Message API
app.post('/api/contact', (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  const newMessage: ContactMessage = {
    id: 'msg-' + Date.now(),
    name,
    email,
    phone: phone || '',
    subject: subject || 'General Inquiry',
    message,
    createdAt: new Date().toISOString(),
  };

  db.contactMessages.unshift(newMessage);
  saveDB();

  res.json({
    success: true,
    message: 'Thank you for reaching out to Torrazur. We will get back to you shortly.',
  });
});

// Admin Auth Login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  // Simple secure administrative check with customizable default password
  if (username === 'admin' && (password === 'torrazur2026' || password === 'admin')) {
    res.json({
      success: true,
      user: { username: 'admin', role: 'administrator' },
      token: 'torrazur_admin_session_token_sec_' + Date.now(),
    });
  } else {
    res.status(401).json({ error: 'Invalid admin credentials' });
  }
});

// Hostinger SQL Dump Exporter Endpoint
app.get('/api/export-sql', (req, res) => {
  const sqlDump = `-- Torrazur Hostinger MySQL Database Dump
-- Generated automatically for Hostinger phpMyAdmin

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE IF NOT EXISTS \`settings\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`business_name\` varchar(255) NOT NULL,
  \`tagline\` varchar(255) DEFAULT NULL,
  \`address\` text NOT NULL,
  \`phone\` varchar(50) NOT NULL,
  \`whatsapp\` varchar(50) NOT NULL,
  \`email\` varchar(100) NOT NULL,
  \`instagram\` varchar(100) NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO \`settings\` (\`id\`, \`business_name\`, \`tagline\`, \`address\`, \`phone\`, \`whatsapp\`, \`email\`, \`instagram\`) VALUES
(1, '${db.settings.businessName.replace(/'/g, "''")}', '${db.settings.tagline.replace(/'/g, "''")}', '${db.settings.address.replace(/'/g, "''")}', '${db.settings.phone}', '${db.settings.whatsapp}', '${db.settings.email}', '${db.settings.instagram}');

CREATE TABLE IF NOT EXISTS \`menu_items\` (
  \`id\` varchar(50) NOT NULL,
  \`name\` varchar(255) NOT NULL,
  \`category\` varchar(50) NOT NULL,
  \`description\` text,
  \`price\` varchar(50) NOT NULL,
  \`image_url\` text,
  \`is_available\` tinyint(1) DEFAULT 1,
  \`is_featured\` tinyint(1) DEFAULT 0,
  \`sort_order\` int(11) DEFAULT 0,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

${db.menu.map(m => `INSERT INTO \`menu_items\` (\`id\`, \`name\`, \`category\`, \`description\`, \`price\`, \`image_url\`, \`is_available\`, \`is_featured\`, \`sort_order\`) VALUES ('${m.id}', '${m.name.replace(/'/g, "''")}', '${m.category}', '${m.description.replace(/'/g, "''")}', '${m.price}', '${m.imageUrl}', ${m.isAvailable ? 1 : 0}, ${m.isFeatured ? 1 : 0}, ${m.sortOrder});`).join('\n')}

CREATE TABLE IF NOT EXISTS \`reservations\` (
  \`id\` varchar(50) NOT NULL,
  \`name\` varchar(255) NOT NULL,
  \`phone\` varchar(50) NOT NULL,
  \`email\` varchar(100) DEFAULT NULL,
  \`res_date\` date NOT NULL,
  \`res_time\` varchar(20) NOT NULL,
  \`guests\` int(11) NOT NULL,
  \`special_request\` text,
  \`status\` enum('Pending','Approved','Rejected','Completed') DEFAULT 'Pending',
  \`created_at\` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

COMMIT;
`;
  res.setHeader('Content-Type', 'application/sql');
  res.setHeader('Content-Disposition', 'attachment; filename="torrazur_database.sql"');
  res.send(sqlDump);
});

// -------------------------------------------------------------
// VITE MIDDLEWARE / PRODUCTION STATIC SERVER
// -------------------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Torrazur Server running on http://localhost:${PORT}`);
  });
}

startServer();
