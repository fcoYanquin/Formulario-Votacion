<?php

require_once dirname(".") . ("/db/Conexion.php");

class Region {

    private $conexion = null;

    /**
     * Crea conexion a base de datos
     */
    function __construct() {
        
        $this->conexion = Conexion::conectar();
    }

    /**
     * Obtiene todos los registros de regiones
     * 
     * @return array
     */
    function getAll() {
        $query = 'SELECT * FROM region';
        $result = mysqli_query($this->conexion, $query);

        $regiones = array();

        while($row = mysqli_fetch_array($result)) {
            $arr = array();
            $arr["id"] = $row["id"];
            $arr["nombre"] = $row["nombre"];

            $regiones[] = $arr;
        }

        return $regiones;
    }

}