<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; 
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    // Retrieve data from the request
    $token = htmlspecialchars($data['token']);
    $newPassword = htmlspecialchars($data['new_password']);

    // Validate token and update password
    $result = handlePasswordResetConfirmation($token, $newPassword);

    // Return appropriate response to the frontend
    echo json_encode(["message" => $result]);
}

// Function to handle password reset confirmation
function handlePasswordResetConfirmation($token, $newPassword) {
    // Check if the token is valid and not expired
    if (isTokenValid($token)) {
        // Get the user ID by token
        $userId = getUserIdByToken($token);

        // Update the user's password in the database
        if (updatePassword($userId, $newPassword)) {
            // Clear the reset token after password reset
            clearResetToken($userId);

            return "Password reset successful!";
        } else {
            return "Error updating password.";
        }
    } else {
        return "Invalid or expired token.";
    }
}

// Function to check if the token is still valid
/**
 * @param string $token The reset token
 * @return bool True if the token is valid, false otherwise
 */
function isTokenValid($token) {
    // Implement your logic to check if the token is valid and not expired
    // Example: Verify token against database record and check expiration time

    require './db_connection.php';

    // Query to get the expiration timestamp of the token
    $sql = "SELECT expiration_timestamp FROM users WHERE reset_token = :token";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':token', $token);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $expirationTimestamp = $stmt->fetchColumn();

        // Check if the token is still valid (e.g., not expired)
        $currentTimestamp = time();

        if ($currentTimestamp < $expirationTimestamp) {
            // Token is valid
            return true;
        }
    }

    // Token is not valid
    return false;
}

// Function to get user ID by token
/**
 * @param string $token The reset token
 * @return int|null The user ID or null if not found
 */
function getUserIdByToken($token) {
    // Implement logic to retrieve the user ID based on the token
    // Query database to get user ID associated with the token
    
    require './db_connection.php';

    // Query to get the user ID with the given reset token
    $sql = "SELECT id FROM users WHERE reset_token = :token";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':token', $token);
    $stmt->execute();

    // Check if a row was returned
    if ($stmt->rowCount() > 0) {
        // Fetch the user ID
        $userId = $stmt->fetchColumn();
        return $userId;
    } else {
        // No user found with the given token
        return null;
    }
}

// Function to update the user's password in the database
/**
 * @param int $userId The user ID
 * @param string $newPassword The new password
 * @return bool True if the password is successfully updated, false otherwise
 */
function updatePassword($userId, $newPassword) {
    // Implement logic to update the user's password in the database
    // Update the 'password' field for the user with the specified ID
    
    require './db_connection.php';

    // Hash the new password before storing it in the database
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

    // Query to update the user's password
    $sql = "UPDATE users SET password = :password WHERE id = :userId";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':password', $hashedPassword);
    $stmt->bindParam(':userId', $userId);

    // Execute the query
    return $stmt->execute();
}

// Function to clear the reset token after password reset
/**
 * @param int $userId The user ID
 * @return bool True if the reset token is successfully cleared, false otherwise
 */
function clearResetToken($userId) {
    // Implement logic to clear the reset token
    // Set 'reset_token' and 'expiration_timestamp' to NULL for the user with the specified ID
    
    require './db_connection.php';

    // Query to clear the reset token
    $sql = "UPDATE users SET reset_token = NULL, expiration_timestamp = NULL WHERE id = :userId";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':userId', $userId);

    // Execute the query
    return $stmt->execute();
}
