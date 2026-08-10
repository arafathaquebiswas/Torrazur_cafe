# TORRAZUR — HOSTINGER VPS & HOSTING DEPLOYMENT GUIDE

This directory contains the production-ready PHP + MySQL codebase for **Torrazur (Italian Bakery & Café)**. You can directly upload these files to Hostinger hPanel or VPS.

---

## 📋 STEP-BY-STEP HOSTINGER DEPLOYMENT INSTRUCTIONS

### 1. Uploading Files to Hostinger
1. Log into your **Hostinger hPanel** or access your Hostinger VPS via FTP/SSH.
2. Navigate to your domain's root folder (usually `public_html`).
3. Upload all files and folders from this project:
   - `index.php`, `about.php`, `menu.php`, `bakery.php`, `coffee.php`, `gallery.php`, `reservation.php`, `contact.php`, `privacy.php`, `terms.php`
   - `/includes/`
   - `/admin/`
   - `/assets/`
   - `/uploads/`

---

### 2. Creating the MySQL Database
1. In Hostinger hPanel, go to **Databases** -> **Management** -> **Create MySQL Database**.
2. Note your:
   - **Database Name** (e.g., `u123456789_torrazur`)
   - **Database User** (e.g., `u123456789_user`)
   - **Database Password** (e.g., `YourSecurePassword123!`)
   - **Host** (usually `localhost`)

---

### 3. Importing Database SQL Dump
1. Click **Enter phpMyAdmin** in Hostinger for the newly created database.
2. Click the **Import** tab.
3. Choose the `database.sql` file provided in this repository.
4. Click **Go** / **Import**. All tables (`settings`, `users`, `menu_items`, `gallery`, `reservations`) will be generated with default data.

---

### 4. Configuring Database Credentials
1. Open `includes/database.php` on your server.
2. Update the credentials:
```php
<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'u123456789_user');
define('DB_PASS', 'YourSecurePassword123!');
define('DB_NAME', 'u123456789_torrazur');
?>
```

---

### 5. Accessing the Admin Panel
- **Admin Login URL:** `https://yourdomain.com/admin/login.php`
- **Default Username:** `admin`
- **Default Password:** `admin` or `torrazur2026` (change password after first login)

---

### 6. Changing Business Information & Content
- Log into the Admin Panel -> **Settings**.
- Here you can update:
  - Phone: `01335-157144`
  - WhatsApp: `+880 1335-157144`
  - Email: `torrazur@gmail.com`
  - Address: `Plot 1317, Block I, Road 30,31, Sonia Sobhan 5th Avenue, Bashundhara R/A, Dhaka 1229`
  - Instagram handle: `torrazur`

---

### 7. Managing Reservations, Menu, & Gallery
- **Menu Management**: Add, edit, or delete items, prices, and images.
- **Gallery Management**: Upload or link images, categorize by Café, Bakery, Coffee, Food, Interior.
- **Reservations**: View new customer requests, change status to Approved or Rejected, and search by date/phone.

---

### 8. Enabling HTTPS / SSL on Hostinger
1. In Hostinger hPanel, search for **SSL**.
2. Click **Install SSL** on your domain to secure customer reservations and administrative sessions.

---

### 9. Backing Up & Restoring
- **Website Files**: Download the entire `public_html` directory via File Manager or FTP.
- **Database Backup**: In phpMyAdmin, click **Export** -> **Quick** -> **Go** to download `.sql`.

---

### 📞 Torrazur Business Information Reference
- **Name**: Torrazur
- **Tagline**: "We Bake. We Roast. We Brew."
- **Address**: Plot 1317, Block I, Road 30,31, Sonia Sobhan 5th Avenue, Bashundhara R/A, Dhaka, Bangladesh, 1229
- **Phone**: 01335-157144
- **WhatsApp**: +880 1335-157144
- **Email**: torrazur@gmail.com
- **Instagram**: @torrazur (https://www.instagram.com/torrazur/)
