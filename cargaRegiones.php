<?php
require_once "./models/Region.php";

$region = new Region();

//Se obtienen todas las regiones registradas en la base de datos
$regiones = $region->getAll();

echo json_encode($regiones);