<?php

class Conexion {

    /**
     * Conexion a la base de datos usando parametros de configuracion
     */
    static public function conectar() {

        $config = include(dirname(".") . "/config/configuracion.php");

        $conn = mysqli_connect($config['hostname'], $config['user'], $config['password'], $config['database']);

        return $conn;
    }
}