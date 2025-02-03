<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, GET");

$servername = "127.0.0.1";
$username = "root"; // Cambia si tienes otra configuración
$password = "";
$dbname = "chat_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (!isset($data['user']) || !isset($data['message'])) {
        echo json_encode(["error" => "Datos incompletos"]);
        exit;
    }

    $user = $conn->real_escape_string($data['user']);
    $message = $conn->real_escape_string($data['message']);

    $sql = "INSERT INTO messages (user, message) VALUES ('$user', '$message')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => "Mensaje enviado"]);
    } else {
        echo json_encode(["error" => "Error al enviar mensaje"]);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT * FROM messages ORDER BY timestamp ASC");
    $messages = [];
    while ($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }
    echo json_encode($messages);
}

$conn->close();
?>
