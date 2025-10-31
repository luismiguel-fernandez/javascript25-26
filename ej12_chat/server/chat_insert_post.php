<?php
if(isset($_POST['nick'])&&isset($_POST['mensaje'])) {
		$server = "mysql:dbname=chat";
		$user = "root";
		$pass = "";
		$con = new PDO($server,$user,$pass,array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\''));

		$consulta = "INSERT INTO mensajes(nick,mensaje) VALUES(?,?)";
		$sen = $con->prepare($consulta);
        $sen->bindParam(1,$_POST['nick']);
        $sen->bindParam(2,$_POST['mensaje']);
		$sen->execute();	
} else {
	echo "No has pasado los parámetros correctos. Debes pasar 'nick' y 'mensaje'";
}
?>