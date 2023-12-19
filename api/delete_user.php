<?php

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

session_start();

require("./db_connection.php");

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; 
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {

    $data = json_decode(file_get_contents("php://input"), true);
    $userIdToDelete = test_input($data['userId']); // Assuming userId is included in the request
    //$usernameToDelete = test_input($data['username']); // Assuming username is included in the request

    if (empty($userId) /* empty($username) */) {
        echo json_encode(["message" => "Veuillez fournir l'ID de l'utilisateur à supprimer"]);
    } else {
        // Check if the user exists
        $query = $conn->prepare("SELECT * FROM users WHERE id = ?");
        $query->execute([$userId]);
        $user = $query->fetch();
        /*
        $query = $conn->prepare("SELECT * FROM users WHERE username = ?");
        $query->execute([$username]);
        $user = $query->fetch();  */

        if (!$user) {
            echo json_encode(["message" => "Utilisateur non trouvé"]);
        } else {
            // Delete the user from the database
            $deleteQuery = $conn->prepare("DELETE FROM users WHERE id = ?");
            $deleteQuery->execute([$userId]);
            /*
            $deleteQuery = $conn->prepare("DELETE FROM users WHERE username = ?");
            $deleteQuery->execute([$username]);   */

            echo json_encode(["message" => "Utilisateur supprimé avec succès"]);
        }
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["error" => "Méthode non autorisée"]);
}
