<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once "db_connect.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Only POST requests are allowed."
    ]);
    exit;
}

$patientName = trim($_POST["patientName"] ?? "");
$patientEmail = trim($_POST["patientEmail"] ?? "");
$patientPhone = trim($_POST["patientPhone"] ?? "");
$appointmentTime = trim($_POST["appointmentTime"] ?? "");
$specialization = trim($_POST["appointmentSpecialization"] ?? "");
$doctorId = isset($_POST["appointmentDoctor"]) ? (int) $_POST["appointmentDoctor"] : 0;

if ($patientName === "" || $patientEmail === "" || $patientPhone === "" || $appointmentTime === "" || $specialization === "" || $doctorId <= 0) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Please fill all required appointment details and choose a doctor."
    ]);
    exit;
}

if (!filter_var($patientEmail, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Please enter a valid email address."
    ]);
    exit;
}

$reportFilename = null;

if (isset($_FILES["pastReport"]) && $_FILES["pastReport"]["error"] !== UPLOAD_ERR_NO_FILE) {
    if ($_FILES["pastReport"]["error"] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Past report upload failed."
        ]);
        exit;
    }

    $allowedExtensions = ["pdf", "jpg", "jpeg", "png"];
    $originalName = $_FILES["pastReport"]["name"];
    $extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));

    if (!in_array($extension, $allowedExtensions, true)) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Past report must be a PDF, JPG, JPEG, or PNG file."
        ]);
        exit;
    }

    $uploadDir = __DIR__ . DIRECTORY_SEPARATOR . "uploads" . DIRECTORY_SEPARATOR . "reports";

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0775, true);
    }

    $reportFilename = "report_" . date("Ymd_His") . "_" . bin2hex(random_bytes(4)) . "." . $extension;
    $targetPath = $uploadDir . DIRECTORY_SEPARATOR . $reportFilename;

    if (!move_uploaded_file($_FILES["pastReport"]["tmp_name"], $targetPath)) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Could not save the uploaded report."
        ]);
        exit;
    }
}

$sql = "INSERT INTO appointments (patient_name, patient_email, patient_phone, appointment_time, specialization, doctor_id, report_filename) VALUES (?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssis", $patientName, $patientEmail, $patientPhone, $appointmentTime, $specialization, $doctorId, $reportFilename);

if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Could not save appointment."
    ]);
    $stmt->close();
    $conn->close();
    exit;
}

echo json_encode([
    "success" => true,
    "message" => "Appointment saved successfully.",
    "appointment_id" => $stmt->insert_id
]);

$stmt->close();
$conn->close();
?>
