<?php
// rate_movie.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type: application/json');
header('Access-Control-Allow-Credentials: true');
// Include necessary files and configurations
require 'db_connection.php';

// Check if it's a POST request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; 
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get input data
    $data = json_decode(file_get_contents('php://input'), true);

    // Validate input data
    if (!isset($data['serie_id']) || !isset($data['rating'])) {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => 'Invalid input data']);
        exit;
    }

    $serieId = $data['serie_id'];
    $rating = $data['rating'];

    // Get current rating information
    $query = "SELECT rating_count, total_rating FROM series WHERE id = $serieId";
    $result = mysqli_query($conn, $query);
    $row = mysqli_fetch_assoc($result);

    if (!$row) {
        http_response_code(404); // Not Found
        echo json_encode(['error' => 'Serie not found']);
        exit;
    }

    $currentRatingCount = $row['rating_count'];
    $currentTotalRating = $row['total_rating'];

    // Update ratings
    $newRatingCount = $currentRatingCount + 1;
    $newTotalRating = $currentTotalRating + $rating;

    $updateQuery = "UPDATE series SET rating_count = $newRatingCount, total_rating = $newTotalRating WHERE id = $serieId";
    mysqli_query($conn, $updateQuery);

    // Calculate and update the average rating (optional)
    $averageRating = $newTotalRating / $newRatingCount;
    $updateAverageQuery = "UPDATE series SET vote_average = $averageRating WHERE id = $serieId";
    mysqli_query($conn, $updateAverageQuery);

    echo json_encode(['message' => 'Rating submitted successfully']);
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Invalid request method']);
}
?>