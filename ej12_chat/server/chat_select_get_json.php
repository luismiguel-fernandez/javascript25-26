<?php
if(isset($_GET['ultimo'])) {

    class mensaje {
        var $id;
        var $nick;
        var $texto;
        var $fecha;
    }
    function queryMensajes($ultimo,$conexion) {
        $consulta = "SELECT * FROM mensajes WHERE id > ".$ultimo ;
        $sen = $conexion->prepare($consulta);
        $sen->execute();
        $result = [];
        while($row = $sen->fetch(PDO::FETCH_NAMED)){
            $rec = new mensaje();
            $rec->id = $row['id'];
            $rec->fecha = $row['instante'];
            $rec->nick = $row['nick'];
            $rec->texto = $row['mensaje'];
            $result[] = $rec;
        }
        return $result;
    }

    $server = "mysql:dbname=chat";
	$user = "root";
	$pw = "";
	$con = new PDO($server,$user,$pw,array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\''));

   
    echo json_encode( queryMensajes($_GET['ultimo'],$con) );
} else {
	echo "No has pasado los parámetros correctos. Debes pasar 'ultimo'";
}
?>