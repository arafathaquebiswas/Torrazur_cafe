-- TORRAZUR HOSTINGER MYSQL DATABASE SCHEMA
-- Execute this SQL script in Hostinger phpMyAdmin

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Table: settings
CREATE TABLE IF NOT EXISTS `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `business_name` varchar(255) NOT NULL DEFAULT 'Torrazur',
  `tagline` varchar(255) DEFAULT 'We Bake. We Roast. We Brew.',
  `category` varchar(100) DEFAULT 'Cafe · Italian Bakery',
  `address` text NOT NULL,
  `phone` varchar(50) NOT NULL,
  `whatsapp` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `instagram` varchar(100) NOT NULL,
  `seo_title` varchar(255) DEFAULT NULL,
  `seo_description` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `settings` (`id`, `business_name`, `tagline`, `category`, `address`, `phone`, `whatsapp`, `email`, `instagram`, `seo_title`, `seo_description`) VALUES
(1, 'Torrazur', 'We Bake. We Roast. We Brew.', 'Cafe · Italian Bakery', 'Plot 1317, Block I, Road 30,31, Sonia Sobhan 5th Avenue, Bashundhara R/A, Dhaka, Bangladesh, 1229', '01335-157144', '+8801335157144', 'torrazur@gmail.com', 'torrazur', 'Torrazur | Premium Italian Bakery & Café in Bashundhara R/A', 'Torrazur - Italian Bakery & Specialty Café located at Sonia Sobhan 5th Avenue, Bashundhara R/A, Dhaka.');

-- Table: users (Admin Authentication)
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL UNIQUE,
  `password_hash` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Default Admin Password: admin (hash using password_hash in PHP)
INSERT INTO `users` (`username`, `password_hash`) VALUES
('admin', '$2y$10$wO8O6q1.jM8wO/N2K6N2e.pD9H5.dE0S3S.H7m9yW7f3H1K3Q4L2S');

-- Table: menu_items
CREATE TABLE IF NOT EXISTS `menu_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `category` varchar(50) NOT NULL,
  `description` text,
  `price` varchar(50) NOT NULL,
  `image_url` text,
  `is_available` tinyint(1) DEFAULT 1,
  `is_featured` tinyint(1) DEFAULT 0,
  `sort_order` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `menu_items` (`name`, `category`, `description`, `price`, `image_url`, `is_available`, `is_featured`, `sort_order`) VALUES
('Espresso Intenso', 'Coffee', 'Double shot of rich espresso brewed from specialty beans.', 'BDT 220', 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=800', 1, 1, 1),
('Cappuccino Classico', 'Coffee', 'Espresso balanced with steamed milk and dense velvet foam.', 'BDT 320', 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=800', 1, 1, 2),
('Torrazur Signature Latte', 'Coffee', 'Smooth espresso poured over creamy steamed milk with subtle caramel undertones.', 'BDT 360', 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&q=80&w=800', 1, 1, 3),
('Artisanal Butter Croissant', 'Bakery', 'Flaky, multi-layered golden pastry baked fresh daily in-house.', 'BDT 260', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800', 1, 1, 1),
('Italian Chocolate Cornetto', 'Bakery', 'Traditional Italian style croissant filled with hazelnut cocoa cream.', 'BDT 310', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800', 1, 1, 2),
('Rosemary & Olive Oil Focaccia', 'Bakery', 'Italian flatbread infused with sea salt, extra virgin olive oil, and fresh rosemary.', 'BDT 350', 'https://images.unsplash.com/photo-1615837136889-04296f5a7a13?auto=format&fit=crop&q=80&w=800', 1, 1, 3),
('Classic Caprese Panini', 'Food', 'Fresh mozzarella, vine tomatoes, basil pesto pressed on house-baked ciabatta.', 'BDT 490', 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=800', 1, 1, 1),
('Authentic Tiramisù Classico', 'Specialties', 'Savoiardi ladyfingers soaked in espresso, layered with whipped mascarpone cream and cocoa.', 'BDT 420', 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800', 1, 1, 1);

-- Table: gallery
CREATE TABLE IF NOT EXISTS `gallery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `category` varchar(50) NOT NULL,
  `image_url` text NOT NULL,
  `sort_order` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `gallery` (`title`, `category`, `image_url`, `sort_order`) VALUES
('Torrazur Artisanal Bakery Counter', 'Interior', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200', 1),
('Freshly Baked Golden Cornetti', 'Bakery', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=1200', 2),
('Espresso Bar & Latte Art Crafting', 'Coffee', 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=1200', 3);

-- Table: reservations
CREATE TABLE IF NOT EXISTS `reservations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `res_date` date NOT NULL,
  `res_time` varchar(20) NOT NULL,
  `guests` int(11) NOT NULL,
  `special_request` text,
  `status` enum('Pending','Approved','Rejected','Completed') DEFAULT 'Pending',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

COMMIT;
