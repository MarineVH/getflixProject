<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

require './db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; 
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $conn->query("SELECT * FROM top_rated_movies");
    $top_rated_movies = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["top_rated_movies" => $top_rated_movies]);
} else {
    http_response_code(405);
    echo json_encode(["error" => "Only GET requests are allowed"]);
}


/*
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; 
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $apiKey = "01fd56a673d7b722de210fadfb094f1f";
    $apiUrl = "https://api.themoviedb.org/3/movie/top_rated?api_key=$apiKey";

    $apiResponse = file_get_contents($apiUrl);

    if (!$apiResponse) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to fetch data from TMDb API"]);
        exit;
    }

    $data = json_decode($apiResponse, true);

    if (isset($data['results'])) {
        echo json_encode(["top_rated_movies" => $data['results']]);
    } else {
        echo json_encode(["message" => "Data not found"]);
    }
    
} else {
    http_response_code(405);
    echo json_encode(["error" => "Only GET requests are allowed"]);
}

*/

