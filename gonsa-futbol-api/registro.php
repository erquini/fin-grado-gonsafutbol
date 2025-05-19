<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require 'conexion.php';

$input = json_decode(file_get_contents("php://input"));

$nombre = $input->nombre ?? '';
$email = $input->email ?? '';
$password = $input->password ?? '';

if (!$nombre || !$email || !$password) {
    echo json_encode(["status" => "error", "mensaje" => "❌ Campos incompletos"]);
    exit;
}

// Validar si ya existe
$stmt = $conn->prepare("SELECT id FROM usuarios WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(["status" => "error", "mensaje" => "⚠️ El correo ya está registrado"]);
    exit;
}

// Hashear contraseña
$hash = password_hash($password, PASSWORD_DEFAULT);

// Insertar usuario
$stmt = $conn->prepare("INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $nombre, $email, $hash);

if ($stmt->execute()) {
    echo json_encode(["status" => "ok", "mensaje" => "✅ Usuario registrado"]);
} else {
    echo json_encode(["status" => "error", "mensaje" => "❌ Error al registrar"]);
}

$conn->close();
?>
