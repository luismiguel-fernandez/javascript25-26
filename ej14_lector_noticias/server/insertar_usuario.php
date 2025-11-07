<?php
// ====================================================================
// 1. CONFIGURACIÓN DE LA BASE DE DATOS
// ====================================================================
$host = 'localhost'; // O la IP/nombre de tu servidor de base de datos
$db = 'BaseDeDatosNoticias'; // El nombre de la base de datos que creamos
$user = 'root'; // Tu usuario de MySQL
$pass = ''; // Tu contraseña de MySQL
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

// ====================================================================
// 2. CONEXIÓN A LA BASE DE DATOS
// ====================================================================
try {
     $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
     throw new \PDOException($e->getMessage(), (int)$e->getCode());
     // En un entorno de producción, simplemente podrías mostrar un mensaje de error genérico.
     exit("Error de conexión a la base de datos.");
}

// ====================================================================
// 3. RECUPERACIÓN Y SANITIZACIÓN DE DATOS (Simulando datos de un formulario POST)
// ====================================================================

// **¡ADVERTENCIA!** En un caso real, estos datos vendrían de $_POST.
// Por ahora, usamos datos de ejemplo:
$nombre = $_POST['nombre'];
$email = $_POST['email'];
$password_plano = $_POST['password_plano'];

// Limpiar y validar los datos. (PDO ayuda a prevenir inyecciones SQL, pero la validación es clave)
$nombre = filter_var(trim($nombre), FILTER_SANITIZE_STRING);
$email = filter_var(trim($email), FILTER_SANITIZE_EMAIL);

// Generar un hash seguro de la contraseña
$password_hash = password_hash($password_plano, PASSWORD_DEFAULT);

// Comprobación básica de que tenemos datos esenciales
if (empty($nombre) || empty($email) || empty($password_hash)) {
    echo "Faltan datos esenciales para el registro.";
    exit;
}

// ====================================================================
// 4. VERIFICACIÓN DE EMAIL EXISTENTE
// ====================================================================

// Prepara la consulta SELECT para buscar el email
$sql_check = "SELECT COUNT(*) FROM Usuarios WHERE email = ?";
$stmt_check = $pdo->prepare($sql_check);
$stmt_check->execute([$email]);
$email_count = $stmt_check->fetchColumn();

if ($email_count > 0) {
    // Si el contador es mayor que cero, el email ya existe.
    echo "❌ Error: El email '$email' ya está registrado. Por favor, utiliza otro.";
    
} else {
    // ====================================================================
    // 5. INSERCIÓN DEL NUEVO USUARIO
    // ====================================================================

    // Prepara la consulta INSERT. Usamos placeholders (?) para seguridad (sentencias preparadas).
    $sql_insert = "INSERT INTO Usuarios (nombre, email, password_hash) VALUES (?, ?, ?)";
    $stmt_insert = $pdo->prepare($sql_insert);
    
    // Ejecuta la consulta con los datos
    if ($stmt_insert->execute([$nombre, $email, $password_hash])) {
        echo "✅ ¡Usuario registrado con éxito!";
        echo "<br>ID del nuevo usuario: " . $pdo->lastInsertId();
    } else {
        echo "❌ Error al intentar registrar el usuario.";
    }
}

// Cierre de la conexión (PDO la cierra automáticamente al terminar el script, pero es buena práctica)
$pdo = null;

?>