<?php

require_once "./models/Votante.php";

//Se reciben parametros de la peticion ajax
$rut = $_POST['rut'];

$votacion = new Votante();

//Obtiene falso si el rut de quien registra ya se encuentra en la base de datos
$resultado = $votacion->buscarVotante($rut);

if (!$resultado) {
    echo "success";
} else {
    echo "error";
}
