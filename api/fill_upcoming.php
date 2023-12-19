<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// MySQL Database Connection
require './db_connection.php';

$totalPages = 20;

for ($currentPage = 1; $currentPage <= $totalPages; $currentPage++) {
    $apiKey = "01fd56a673d7b722de210fadfb094f1f";
    $apiUrl = "https://api.themoviedb.org/3/movie/upcoming?api_key=$apiKey&page=$currentPage";

    $apiResponse = file_get_contents($apiUrl);

    if (!$apiResponse) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to fetch data from TMDb API"]);
        exit;
    }

    $data = json_decode($apiResponse, true);

    if (isset($data['results'])) {
        foreach ($data['results'] as $upcoming) {
            // Insert data into the database
            $stmt = $conn->prepare("INSERT INTO upcoming (id, title, overview, poster_path, release_date) VALUES (:id, :title, :overview, :poster_path, :release_date)");

            $stmt->bindParam(':id', $upcoming['id']);
            $stmt->bindParam(':title', $upcoming['title']);
            $stmt->bindParam(':overview', $upcoming['overview']);
            $stmt->bindParam(':poster_path', $upcoming['poster_path']);
            $stmt->bindParam(':release_date', $upcoming['release_date']);

            try {
                $stmt->execute();
            } catch (PDOException $e) {
                // Handle any potential database insertion errors
                echo json_encode(["error" => "Failed to insert data into the database: " . $e->getMessage()]);
            }
        }
    }
}

echo json_encode(["message" => "Data inserted into the database successfully"]);
?>