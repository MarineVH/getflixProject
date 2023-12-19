<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

require("./db_connection.php");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; 
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
    $id = filter_var($_GET['id'] ?? null, FILTER_VALIDATE_INT);
    $movieId = $id;
    $stmt = $conn->prepare("SELECT * FROM movies WHERE id = :id");
    $stmt->bindParam(':id', $movieId);

    try {
        $stmt->execute();
        $movie = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($movie) {
            echo json_encode(["movie" => $movie]);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Movie not found"]);
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
    // Check if the movie ID is provided in the URL
    if (!isset($_GET['id'])) {
        http_response_code(400);
        echo json_encode(["error" => "Movie ID is required"]);
        exit;
    }

    $movieId = $_GET['id'];
    $apiKey = "01fd56a673d7b722de210fadfb094f1f";
    $apiUrl = "https://api.themoviedb.org/3/movie/$movieId?api_key=$apiKey";

    $apiResponse = file_get_contents($apiUrl);

    if (!$apiResponse) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to fetch data from TMDb API"]);
        exit;
    }

    $data = json_decode($apiResponse, true);

    if (isset($data['status_code'])) {
        http_response_code(404);
        echo json_encode(["error" => "Movie not found"]);
        exit;
    }

    $movie = $data; // Assuming the structure of the response matches that of a single movie

    echo json_encode($movie);

} else {
    echo json_encode(["message" => "Invalid request method"]);
}
*/