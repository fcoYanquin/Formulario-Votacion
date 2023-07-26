<?php

require_once dirname(".") . ("/db/Conexion.php");

class Canal {

    private $conexion = null;

    /**
     * Crea conexion a base de datos
     */
    function __construct() {
        
        $this->conexion = Conexion::conectar();
    }

    /**
     * Obtiene todos los registros de canales informativos
     * 
     * @return array
     */
    function getAll() {
        $query = 'SELECT * FROM canal_informativo';
        $result = mysqli_query($this->conexion, $query);

        $canales = array();

        while($row = mysqli_fetch_array($result)) {
            $arr = array();
            $arr["id"] = $row["id"];
            $arr["nombre"] = $row["nombre"];

            $canales[] = $arr;
        }

        return $canales;
    }

}