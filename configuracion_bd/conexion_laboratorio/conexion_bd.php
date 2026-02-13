<?php
$server = "localhost";
$user = "root";
$password = "";
$bd = "laboratorio";

$conexion = new mysqli($server, $user, $password, $bd);

if ($conexion->connect_error) {
    die("Conexion a la base de datos fallida" . $conexion->connect_error);
} else {
    echo "Conexion a la base de datos con éxito";
}
?>