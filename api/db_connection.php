<?php

// MySQL Database Connection
$host = "localhost";
$user_name = "root";
$user_password = "root";
$database = "streamify";

try {
    $conn = new PDO("mysql:host=$host;dbname=$database", $user_name, $user_password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo json_encode(["message" => "connected to the database"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection error: " . $e->getMessage()]);
    exit;
}