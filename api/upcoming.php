<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');


require("./db_connection.php");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; 
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $conn->query("SELECT * FROM upcoming");
    $upcoming = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["upcoming" => $upcoming]);

} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["error" => "Only GET requests are allowed"]);
}

/*
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; 
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $totalPages = 5;
    $allUpcoming = [];


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
            $allUpcoming = array_merge($allUpcoming, $data['results']);
        }
    }

    echo json_encode(["upcoming" => $allUpcoming, "message" => "Pages fetched successfully"]);
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
*/
?>