<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');


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
    $apiUrl = "https://api.themoviedb.org/3/movie/$movieId/videos?api_key=$apiKey";

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

    $movieVideos = $data['results']; 

    $trailerKey = '';
    $name = '';

    foreach ($movieVideos as $video) {
        if ($video['type'] == 'Trailer' && $video['site'] == 'YouTube') {
            $trailerKey = $video['key'];
            $name = $video['name'];
            break;
        }
    }

    echo json_encode(
        [
            "trailerKey" => $trailerKey,
            "trailerName" => $name,
        ]
    );

} else {
    echo json_encode(["message" => "Invalid request method"]);
}
