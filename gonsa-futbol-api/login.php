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
session_start();

$input = json_decode(file_get_contents("php://input"));
$email = $input->email ?? '';
$password = $input->password ?? '';

if (!$email || !$password) {
    echo json_encode(["status" => "error", "mensaje" => "❌ Campos incompletos"]);
    exit;
}

$stmt = $conn->prepare("SELECT nombre, password FROM usuarios WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 1) {
    $stmt->bind_result($nombre, $hash);
    $stmt->fetch();

    if (password_verify($password, $hash)) {
        $_SESSION['usuario'] = $nombre;
        echo json_encode(["status" => "ok", "usuario" => $nombre]);
    } else {
        echo json_encode(["status" => "error", "mensaje" => "❌ Contraseña incorrecta"]);
    }
} else {
    echo json_encode(["status" => "error", "mensaje" => "❌ Usuario no encontrado"]);
}

$conn->close();
?>
