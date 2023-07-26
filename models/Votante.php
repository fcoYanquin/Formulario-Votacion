<?php

require_once dirname(".") . ("/db/Conexion.php");

class Votante {

    private $conexion = null;

    /**
     * Crea conexion a base de datos
     */
    function __construct() {
        $this->conexion = Conexion::conectar();
    }

    /**
     * Guarda registro del votante y votacion por un candidato
     * 
     * @param string $rut
     * @param string $nombre
     * @param string $alias
     * @param string $email
     * @param int $comuna
     * @param int $candidato
     * @param string $canales
     * @return boolean
     */
    function guardarVotacion($rut, $nombre, $alias, $email, $comuna, $candidato, $canales) {
        $query = "INSERT INTO votante (rut,nombre_apellido,alias,email,comuna,canales_informativos) VALUES('$rut','$nombre','$alias','$email',$comuna,'$canales')";
        $result = mysqli_query($this->conexion, $query);

        if ($result) {
            $this->guardarVoto($rut, $candidato);
        }

        return $result;
    }

    /**
     * Se registra el voto usando el rut del votante
     * 
     * @param int $rut
     * @param int $candidato
     * @return boolean
     */
    function guardarVoto($rut, $candidato) {
        $id = $this->buscarVotante($rut);

        $query = "INSERT INTO voto (votante,candidato) VALUES ($id,$candidato)";
        $result = mysqli_query($this->conexion, $query);

        //Se cierra la conexion
        $this->conexion->close();

        return $result;
    }

    /**
     * Busqueda del votante por rut. Retorna id del registro
     * 
     * @param int $rut
     * @return boolean|int
     */
    function buscarVotante($rut) {
        $query = "SELECT id FROM votante WHERE rut = '$rut'";
        $result = mysqli_query($this->conexion, $query);

        if ($result->num_rows !== 0) {
            $votante = $result->fetch_assoc();
            return $votante['id'];
        } else {
            return false;
        }

    }

}