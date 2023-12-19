<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

include 'connect_db.php';

/*require 'vendor/autoload.php';

require './vendor/phpmailer/phpmailer/src/Exception.php';
require './vendor/phpmailer/phpmailer/src/PHPMailer.php';
require './vendor/phpmailer/phpmailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;*/

function createResponse($status, $message)
{
    $response = [
        'status' => $status,
        'message' => $message
    ];
    return json_encode($response);
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit();
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data["username"]) || !isset($data["email"]) || !isset($data["password"])) {
        echo createResponse('Error 401', 'Data missing');
        exit;
    } 
    
    $firstname = $data["firstname"];
    $lastname = $data["lastname"];
    $username = $data["username"];
    $email = $data["email"];
    $password = $data["password"];
    $role = $data["role"] ?? '';
    $created_at = date_create()->format("Y-m-d H:i:s");
   
    $checkUserQuery = $conn->prepare("SELECT COUNT(*) FROM users WHERE username = ? OR email = ?");
    $checkUserQuery->bind_param("ss", $username, $email); // Bind parameters
    $checkUserQuery->execute();
    $checkUserQuery->bind_result($userCount); // Bind result variable
    $checkUserQuery->fetch();
    $checkUserQuery->close();

    if ($userCount > 0) {
        echo createResponse('Error 409', 'Username or email already in use');
        exit;
    }

    try {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $queryRegister = $conn->prepare("INSERT INTO users (firstname, lastname, username, email, password, role, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $queryRegister->bind_param("sssssss", $firstname, $lastname, $username, $email, $hashedPassword, $role, $created_at); // Bind parameters
        $queryRegister->execute();
        
        /*$mail = new PHPMailer(TRUE);

        $mail->SMTPDebug = 2;                                    // Enable verbose debug output
        $mail->isSMTP();                                         // Send using SMTP
        $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                // Enable SMTP authentication
        $mail->Username   = getenv('SMTP_USERNAME');             // SMTP username
        $mail->Password   = getenv('SMTP_PASSWORD');             // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;      // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
        $mail->Port       = 587;

       
        $mail->setFrom('vanheesmarine@gmail.com', 'Streamify');
        $mail->addAddress($email);
        $mail->Subject = 'Confirmation Email';
        $mail->Body = 'Thank you for registering! Please click the following link to return on the website:';
        
        if ($mail->send()) {
            echo createResponse("200", "Succesfully registered. Confirmation email sent.");
        } else {
            echo createResponse("500", "Error sending confirmation email.");
        }*/

        echo createResponse("200", "Successfully registered");
        
    } catch (PDOException $e) {
        error_log("Database Error: " . $e->getMessage());
        
        echo createResponse("500", "Internal Server Error");
        exit;
    }
} 
?>