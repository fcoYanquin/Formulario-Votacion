<?php

require_once "./models/Votante.php";

//Se reciben parametros de la peticion ajax

$nombre = $_POST['nombre'];
$alias = $_POST['alias'];
$rut = $_POST['rut'];
$email = $_POST['email'];
$region = $_POST['region'];
$comuna = $_POST['comuna'];
$candidato = $_POST['candidato'];
$canales = json_encode($_POST['canales']);

$votante = new Votante();

//Se guarda registro del votante
$resultado = $votante->guardarVotacion($rut, $nombre, $alias, $email, $comuna, $candidato, $canales);

//El registro de la consulta retorna true/false al guardar en la base de datos
if ($resultado) {
    echo "success";
} else {
    echo "error";
}


