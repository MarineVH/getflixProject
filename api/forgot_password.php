<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

require 'vendor/autoload.php';

require './vendor/phpmailer/phpmailer/src/Exception.php';
require './vendor/phpmailer/phpmailer/src/PHPMailer.php';
require './vendor/phpmailer/phpmailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; 
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    // Step 1: Receive User Input
    $email = htmlspecialchars($data['email']);

    // Step 2: Generate Reset Token
    $resetToken = bin2hex(random_bytes(32));

    // Step 3: Send Reset Email
    $resetLink = "http://localhost:5173/reset-password?token=$resetToken";
    $mailContent = "Click the following link to reset your password: $resetLink";

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->SMTPDebug = 0;                                    // Enable verbose debug output
        $mail->isSMTP();                                         // Send using SMTP
        $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                // Enable SMTP authentication
        $mail->Username   = getenv('SMTP_USERNAME');             // SMTP username
        $mail->Password   = getenv('SMTP_PASSWORD');             // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;      // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
        $mail->Port       = 587;                                 // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

        // Recipients
        $mail->setFrom('cleps2012@gmail.com', 'Streamify');
        $mail->addAddress($email); // Add a recipient

        // Content
        $mail->isHTML(true);  // Set email format to HTML
        $mail->Subject = 'Password Reset';
        $mail->Body    = $mailContent;

        // Send the email
        if ($mail->send()) {
            echo 'Email sent successfully';
        } else {
            echo 'Error sending email: ' . $mail->ErrorInfo;
        }
    } catch (Exception $e) {
        echo json_encode(["message" => "Error sending password reset email: {$mail->ErrorInfo}"]);
    }

    // Save reset token and expiration timestamp in the database
    saveResetToken($email, $resetToken);
    echo json_encode(["message" => "Password reset initiation successful!"]);
}

// Function to save reset token and expiration timestamp in the database
function saveResetToken($email, $resetToken) {
    
    require './db_connection.php';

    // Set the expiration timestamp (e.g., 24 hours from now)
    $expirationTimestamp = time() + 24 * 60 * 60; // 24 hours

    // Query to save reset token and expiration timestamp in the database
    $sql = "UPDATE users SET reset_token = :token, expiration_timestamp = :expiration WHERE email = :email";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':token', $resetToken);
    $stmt->bindParam(':expiration', $expirationTimestamp);
    $stmt->bindParam(':email', $email);

    // Execute the query
    if (!$stmt->execute()) {
        // Error saving reset token and expiration timestamp
        echo json_encode(["message" => "Error saving reset token and expiration timestamp"]);
    }
}


