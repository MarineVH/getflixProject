<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type: application/json');
header('Access-Control-Allow-Credentials: true');

include 'connect_db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; 
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['name'])) {
    $name = filter_var($_GET['name'] ?? null, FILTER_VALIDATE_INT);
    $series_name = $name;

    $stmt = $conn->prepare("SELECT * FROM series WHERE name = :name");
    $stmt->bindParam(':name', $series_name);

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

/*if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; 
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Check if the serie ID is provided in the URL
    if (!isset($_GET['name'])) {
        http_response_code(400);
        echo json_encode(["error" => "Serie name is required"]);
        exit;
    }

    $serieName = urlencode($_GET['name']);
    $apiKey = "01fd56a673d7b722de210fadfb094f1f";
    $apiUrl = "https://api.themoviedb.org/3/search/tv?api_key=$apiKey&query=$serieName";

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
}*/
?>