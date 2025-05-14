<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['usuario'])) {
    echo json_encode(["usuario" => $_SESSION['usuario']]);
} else {
    echo json_encode(["usuario" => null]);
}
?>