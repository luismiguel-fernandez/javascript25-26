-- 1. Creación de la Base de Datos
CREATE DATABASE IF NOT EXISTS BaseDeDatosNoticias;
USE BaseDeDatosNoticias;

-- 2. Tabla de Usuarios (Almacena la información de los usuarios)
CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL, -- Se recomienda almacenar un hash de la contraseña, no la contraseña en texto plano
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabla de Noticias (Almacena la información de las noticias)
CREATE TABLE Noticias (
    id_noticia INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    contenido TEXT NOT NULL,
    autor VARCHAR(100),
    fecha_publicacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    categoria VARCHAR(50)
);

-- 4. Tabla de Lecturas_Noticias (Relación muchos a muchos: Usuario lee Noticia)
-- Esta tabla registra qué noticias han sido leídas por cada usuario.
CREATE TABLE Lecturas_Noticias (
    id_lectura INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_noticia INT NOT NULL,
    fecha_lectura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Claves foráneas para establecer la relación
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_noticia) REFERENCES Noticias(id_noticia) ON DELETE CASCADE,
    
    -- Restricción para asegurar que un usuario solo pueda marcar una noticia como leída una vez
    UNIQUE KEY uk_usuario_noticia (id_usuario, id_noticia) 
);

-- 5. Ejemplo de Inserción de Datos (Opcional, para pruebas)

-- Insertar Usuarios
INSERT INTO Usuarios (nombre, email, password_hash) VALUES 
('Alice Johnson', 'alice@ejemplo.com', 'hash_alice123'),
('Bob Smith', 'bob@ejemplo.com', 'hash_bob456');

-- Insertar Noticias
INSERT INTO Noticias (titulo, contenido, autor, categoria) VALUES
('Nuevo Avance en IA', 'El último modelo de lenguaje ha demostrado capacidades impresionantes...', 'Dr. Chen', 'Tecnología'),
('Mercado Bursátil en Alza', 'Los índices principales han alcanzado máximos históricos esta semana.', 'Jane Doe', 'Finanzas'),
('Receta de Pastel de Manzana', 'Sigue estos sencillos pasos para el postre perfecto.', 'Chef Pierre', 'Cocina');


/*
-- 6. Ejemplo de Marcado de Noticia como Leída

-- Alice (id=1) marca la noticia de IA (id=1) como leída
INSERT INTO Lecturas_Noticias (id_usuario, id_noticia) VALUES (1, 1);

-- Bob (id=2) marca la noticia del Mercado Bursátil (id=2) como leída
INSERT INTO Lecturas_Noticias (id_usuario, id_noticia) VALUES (2, 2);

-- 7. Consulta de Ejemplo: Obtener Noticias NO Leídas por un Usuario Específico (Ej. Alice, id=1)
SELECT 
    n.id_noticia,
    n.titulo,
    n.fecha_publicacion
FROM 
    Noticias n
LEFT JOIN 
    Lecturas_Noticias ln ON n.id_noticia = ln.id_noticia AND ln.id_usuario = 1 -- Filtrar por usuario
WHERE 
    ln.id_lectura IS NULL; -- Las noticias que no tienen una entrada en la tabla de lecturas para este usuario no han sido leídas.

*/