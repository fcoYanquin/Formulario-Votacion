<?php
require_once "./models/Candidato.php";

$candidato = new Candidato();

//Se obtienes todos loa candidatos registrados en la base de datos
$candidatos = $candidato->getAll();

echo json_encode($candidatos);