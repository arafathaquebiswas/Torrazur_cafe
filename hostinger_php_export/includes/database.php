<?php
// Hostinger MySQL Database Connection
require_once __DIR__ . '/config.php';

$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'torrazur_db';

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ]);
    
    // Fetch global settings
    $stmt = $pdo->query("SELECT * FROM settings LIMIT 1");
    if ($row = $stmt->fetch()) {
        $business_info['name'] = $row['business_name'];
        $business_info['tagline'] = $row['tagline'];
        $business_info['address'] = $row['address'];
        $business_info['phone'] = $row['phone'];
        $business_info['whatsapp'] = $row['whatsapp'];
        $business_info['email'] = $row['email'];
        $business_info['instagram'] = $row['instagram'];
    }
} catch (PDOException $e) {
    // Database connection silent fallback if not configured yet
}
?>
