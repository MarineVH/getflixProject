<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type: application/json');
header('Access-Control-Allow-Credentials: true');

require 'db_connection.php';

 if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; 
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
    $id = filter_var($_GET['id'] ?? null, FILTER_VALIDATE_INT);
    $serieID = $id;

    $stmt = $conn->prepare("SELECT * FROM series WHERE id = :id");
    $stmt->bindParam(':id', $serieID);

    try {
        $stmt->execute();
        $serie = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($serie) {
            echo json_encode(["serie" => $serie]);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "serie not found"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to fetch data from the database: " . $e->getMessage()]);
    }
} else {
    // Invalid request
    http_response_code(400);
    echo json_encode(["error" => "Invalid request"]);
}

/*
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; 
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Check if the serie ID is provided in the URL
    if (!isset($_GET['id'])) {
        http_response_code(400);
        echo json_encode(["error" => "Serie id is required"]);
        exit;
    }

    $serieId = urlencode($_GET['id']);
    $apiKey = "01fd56a673d7b722de210fadfb094f1f";
    $apiUrl = "https://api.themoviedb.org/3/tv/$serieId?api_key=$apiKey";

    $apiResponse = file_get_contents($apiUrl);

    if (!$apiResponse) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to fetch data from TMDb API"]);
        exit;
    }

    $data = json_decode($apiResponse, true);

    if (isset($data['status_code'])) {
        http_response_code(404);
        echo json_encode(["error" => "Serie not found"]);
        exit;
    }

    $serie = $data; // Assuming the structure of the response matches that of a single serie

    echo json_encode($serie);

} else {
    echo json_encode(["message" => "Invalid request method"]);
}
*/
?>