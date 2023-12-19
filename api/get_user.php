<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type: application/json');
header('Access-Control-Allow-Credentials: true');

include 'connect_db.php';
/*
function createResponse($status, $data)
{
    $response = [
        'status' => $status,
        'data' => $data
    ];
    return json_encode($response);
}
*/
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit();
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        if (isset($_GET['username'])) {
            $username = $_GET['username'];
            $queryGetUser = $conn->prepare("SELECT firstname, lastname, username, email, password, role, created_at FROM users WHERE username = ?");
            $queryGetUser->bind_param("s", $username);
            $queryGetUser->execute();
            $result = $queryGetUser->get_result();

            $user = $result->fetch_assoc();
            
            if ($user) {
                echo json_encode(
                    [
                        "username" => $user['username'],
                        "firstname" => $user['firstname'],
                        "lastname" => $user['lastname'],
                        "email" => $user['email']
                    ]);
            } else {
                echo json_encode(["404" => "User not found"]);
            }
        } else {
            $queryGetUsers = $conn->prepare("SELECT * FROM `users` ORDER BY `created_at` DESC");
            $queryGetUsers->execute();
            $result = $queryGetUsers->get_result();
        
            $users = array();
            while ($ligne = $result->fetch_assoc()){
                foreach ($ligne as $value) {
                    echo "$value";
                }
            }
            //echo json_encode(["200" => $users]);
        }
    } catch (PDOException $e) {
        error_log("Database Error: " . $e->getMessage());
        echo json_encode(["500" => "Internal Server Error"]);
    }
}
?>