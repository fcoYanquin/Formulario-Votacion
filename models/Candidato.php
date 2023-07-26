<?php

require_once dirname(".") . ("/db/Conexion.php");

class Candidato {

    private $conexion = null;

    /**
     * Crea conexion a base de datos
     */
    function __construct() {
        
        $this->conexion = Conexion::conectar();
    }

    /**
     * Obtiene todos los registros de candidatos
     * 
     * @return array
     */
    function getAll() {
        $query = 'SELECT * FROM candidato';
        $result = mysqli_query($this->conexion, $query);

        $candidatos = array();

        while($row = mysqli_fetch_array($result)) {
            $arr = array();
            $arr["id"] = $row["id"];
            $arr["nombre"] = $row["nombre"];

            $candidatos[] = $arr;
        }

        return $candidatos;
    }

}