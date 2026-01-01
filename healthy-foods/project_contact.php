<?php
// Ensure this file is present and has the correct credentials
require_once 'db_config.php'; 
header('Content-Type: application/json');

$conn = connectDB();

// 1. Retrieve and sanitize data from the AJAX POST request
// Ensure these keys match the formData object in your project contect.js
$first  = $conn->real_escape_string(trim($_POST['firstName'] ?? ''));
$second = $conn->real_escape_string(trim($_POST['secondName'] ?? ''));
$email  = $conn->real_escape_string(trim($_POST['email'] ?? ''));
$msg    = $conn->real_escape_string(trim($_POST['message'] ?? ''));

// 2. Updated Basic Validation (Checking all four required fields)
// We are checking $second as well, as it is a form field
if (empty($first) || empty($second) || empty($email) || empty($msg) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Please fill out all fields correctly and ensure the email is valid.']);
    $conn->close();
    exit;
}

// 3. Prepare the SQL insertion statement for the 'contact_messages' table
// NOTE: E_mail is used here to match your required database structure
$sql = "INSERT INTO contact_messages (first_name, second_name, E_mail, message) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $first, $second, $email, $msg); 

if ($stmt->execute()) {
    echo json_encode(['success' => true]); 
} else {
    // This logs the database error to the XAMPP log file for detailed troubleshooting
    error_log("Contact Insert Failed: " . $stmt->error);
    echo json_encode(['success' => false, 'message' => 'Failed to save message due to a database error.']);
}

$stmt->close();
$conn->close();
?>