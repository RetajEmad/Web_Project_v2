<?php
// XAMPP default credentials
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');      
define('DB_PASSWORD', '');          // Empty password for XAMPP
define('DB_NAME', 'healthyfoodsmachines_db'); 

// Function to establish database connection
function connectDB() {
    $conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

    if ($conn->connect_error) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'Critical server error.']);
        exit; 
    }
    return $conn;
}
?>