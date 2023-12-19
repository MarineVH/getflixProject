<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

include_once './db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === "OPTIONS") {
    exit();
} elseif ($_SERVER['REQUEST_METHOD'] === "POST") {
    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->username)) {
        $username = htmlspecialchars($data->username);
        $sql = "UPDATE users SET ";
        $params = [];

        if (isset($data->newUsername) && !empty(trim($data->newUsername))) {
            $newUsername = htmlspecialchars($data->newUsername);
            $sql .= "username = :newUsername, ";
            $params[':newUsername'] = $newUsername;
        }

        if (isset($data->newEmail) && !empty(trim($data->newEmail))) {
            $newEmail = htmlspecialchars($data->newEmail);
            $sql .= "email = :newEmail, ";
            $params[':newEmail'] = $newEmail;
        }

        if (isset($data->newPassword) && !empty(trim($data->newPassword))) {
            $newPassword = password_hash(htmlspecialchars($data->newPassword), PASSWORD_DEFAULT);
            $sql .= "password = :newPassword, ";
            $params[':newPassword'] = $newPassword;
        }

        // Remove the last comma and add the WHERE clause
        $sql = rtrim($sql, ', ') . " WHERE username = :username";
        $params[':username'] = $username;

        $stmt = $conn->prepare($sql);
        $stmt->execute($params);

        if ($stmt->rowCount() > 0) {
            echo json_encode(["success" => true, "message" => "User updated successfully"]);
        } else {
            echo json_encode(["success" => false, "message" => "Failed to update user"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Username is required"]);
    }
}
