<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: " . (getenv("ALLOWED_ORIGIN") ?: "*"));

require_once "db_connect.php";

$result = $conn->query("SELECT COUNT(*) AS total_doctors FROM doctors");
$row = $result->fetch_assoc();

echo json_encode([
    "success" => true,
    "message" => "Database connected successfully.",
    "total_doctors" => (int) $row["total_doctors"]
]);

$conn->close();
?>
