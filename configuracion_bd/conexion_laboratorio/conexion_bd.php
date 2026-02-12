<?php
$server = "localhost";
$user = "root";
$password = "";
$bd = "laboratorio";

$conexion = new mysqli($server, $user, $password, $bd);

if ($conexion->connect_error) {
    die("Conexion fallida: " . $conexion->connect_error);
} else {
    echo "Conectado con éxito";
}
?>