<?php
// Torrazur Global Configuration
session_start();

define('SITE_NAME', 'Torrazur');
define('SITE_TAGLINE', 'We Bake. We Roast. We Brew.');
define('SITE_URL', 'http://' . $_SERVER['HTTP_HOST']);

// Default Business Info (overridden by database settings if available)
$business_info = [
    'name' => 'Torrazur',
    'tagline' => 'We Bake. We Roast. We Brew.',
    'category' => 'Cafe · Italian Bakery',
    'address' => 'Plot 1317, Block I, Road 30,31, Sonia Sobhan 5th Avenue, Bashundhara R/A, Dhaka, Bangladesh, 1229',
    'phone' => '01335-157144',
    'whatsapp' => '+8801335157144',
    'email' => 'torrazur@gmail.com',
    'instagram' => 'torrazur',
    'instagram_url' => 'https://www.instagram.com/torrazur/',
    'maps_url' => 'https://www.google.com/maps/search/?api=1&query=Plot+1317,+Block+I,+Road+30,31,+Sonia+Sobhan+5th+Avenue,+Bashundhara+R%2FA,+Dhaka+1229'
];
?>
