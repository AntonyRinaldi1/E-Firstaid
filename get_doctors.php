<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: " . (getenv("ALLOWED_ORIGIN") ?: "*"));

require_once "db_connect.php";

$specialization = isset($_GET["specialization"]) ? trim($_GET["specialization"]) : "";

if ($specialization === "") {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Specialization is required.",
        "doctors" => []
    ]);
    exit;
}

$sql = "SELECT id, name, specialization, available_time, phone, rating, qualification, experience_years, hospital, location, consultation_fee, languages, profile_summary FROM doctors WHERE specialization = ? ORDER BY rating DESC, name";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $specialization);
$stmt->execute();

$result = $stmt->get_result();
$doctors = [];

while ($row = $result->fetch_assoc()) {
    $doctors[] = $row;
}

echo json_encode([
    "success" => true,
    "specialization" => $specialization,
    "doctors" => $doctors
]);

$stmt->close();
$conn->close();
?>
