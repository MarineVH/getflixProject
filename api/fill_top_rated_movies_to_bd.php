<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

require("./db_connection.php");

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
    foreach ($data['results'] as $top_rated_movie) {
        // Insert data into the database
        $stmt = $conn->prepare("INSERT INTO top_rated_movies (id, poster_path, title, rating) VALUES (:id, :poster_path, :title, :rating)");

        $stmt->bindParam(':id', $top_rated_movie['id']);
        $stmt->bindParam(':poster_path', $top_rated_movie['poster_path']);
        $stmt->bindParam(':title', $top_rated_movie['title']);
        $stmt->bindParam(':rating', $top_rated_movie['vote_average']);

        try {
            $stmt->execute();
        } catch (PDOException $e) {
            // Handle any potential database insertion errors
            echo json_encode(["error" => "Failed to insert data into the database: " . $e->getMessage()]);
        }
    }
}


echo json_encode(["message" => "Data inserted into the database successfully"]);
?>