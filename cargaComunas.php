<?php
require_once "./models/Comuna.php";

//Se reciben parametros de la peticion ajax
$region = $_GET['region'];

$comuna = new Comuna();

//Se obtienen todas las comunas de la region seleccionada
$comunas = $comuna->getComunasByRegion($region);

echo json_encode($comunas);