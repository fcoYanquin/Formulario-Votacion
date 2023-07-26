<?php

require_once "./models/Canal.php";

$canal = new Canal();

//Se obtienen todos los canales informativos guardados
$canales = $canal->getAll();

echo json_encode($canales);