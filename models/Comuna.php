<?php

require_once dirname(".") . ("/db/Conexion.php");

class Comuna {

    private $conexion = null;

    /**
     * Crea conexion a base de datos
     */
    function __construct() {
        
        $this->conexion = Conexion::conectar();
    }

    /**
     * Obtiene todos los registros de comuna de una region especifica
     * 
     * @param int $region
     * @return array
     */
    function getComunasByRegion($region) {
        $query = 'SELECT * FROM comuna WHERE region = '.$region;
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