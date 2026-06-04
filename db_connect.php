<?php
$host = getenv("DB_HOST") ?: "localhost";
$port = (int) (getenv("DB_PORT") ?: 3306);
$username = getenv("DB_USER") ?: "root";
$password = getenv("DB_PASSWORD") ?: "";
$database = getenv("DB_NAME") ?: "e_first_aid";

$conn = new mysqli($host, $username, $password, $database, $port);

if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode([
        "success" => false,
        "message" => "Database connection failed."
    ]));
}

$conn->set_charset("utf8mb4");
?>
