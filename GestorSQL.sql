-- ============================================================
--  Gestor de Tareas - Script de Base de Datos
--  SQL Server
-- ============================================================

-- Crear la base de datos
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'GestorTareas')
BEGIN
    CREATE DATABASE GestorTareas;
END
GO

USE GestorTareas;
GO

-- Consulta si existe una base de datos llamada GestorTareas en el servidor, y si no existe, la crea y luego utiliza.

-- ============================================================
--  CREACIÓN DE TABLAS
-- ============================================================

-- Tabla: Users
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Users')
BEGIN
    CREATE TABLE Users (
        id            INT             NOT NULL IDENTITY(1,1),
        nombre        NVARCHAR(100)   NOT NULL,
        email         NVARCHAR(150)   NOT NULL,
        fechaCreacion DATETIME       NOT NULL DEFAULT GETDATE(),

        CONSTRAINT PK_Users PRIMARY KEY (id),
        CONSTRAINT UQ_Users_Email UNIQUE (email)
    );
END
GO

--Ahora consulta si existe una tabla de Users, en caso de que no exista, la crea con los parametros que le pasa

-- Tabla: Tasks
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Tasks')
BEGIN
    CREATE TABLE Tasks (
        id             INT             NOT NULL IDENTITY(1,1),
        titulo         NVARCHAR(200)   NOT NULL,
        descripcion    NVARCHAR(500)   NULL,
        estado         NVARCHAR(20)    NOT NULL DEFAULT 'pendiente',
        idUsuario     INT             NOT NULL,
        fechaCreacion DATETIME        NOT NULL DEFAULT GETDATE(),

        CONSTRAINT PK_Tasks       PRIMARY KEY (id),
        CONSTRAINT FK_Tasks_Users FOREIGN KEY (idUsuario) REFERENCES Users(id),
        CONSTRAINT CK_Tasks_Estado CHECK (estado IN ('pendiente', 'en progreso', 'completada'))
    );
END
GO

-- ============================================================
--  DATOS DE PRUEBA
-- ============================================================

-- Insertar usuarios
INSERT INTO Users (nombre, email) VALUES
    ('Ana García',    'ana.garcia@email.com'),
    ('Carlos López',  'carlos.lopez@email.com'),
    ('María Fernández','maria.fernandez@email.com');
GO

-- Insertar tareas
INSERT INTO Tasks (titulo, descripcion, estado, idUsuario) VALUES
    ('Diseñar base de datos',     'Crear el esquema inicial con tablas y relaciones',  'completada',   1),
    ('Desarrollar API REST',      'Implementar endpoints CRUD con ASP.NET Core',        'en progreso',  1),
    ('Crear interfaz React',      'Desarrollar el frontend con listado y formularios',  'pendiente',    2),
    ('Escribir pruebas unitarias','Cubrir los servicios con xUnit',                     'pendiente',    2),
    ('Documentar con Swagger',    'Agregar anotaciones OpenAPI a los controladores',    'en progreso',  3),
    ('Configurar repositorio Git','Inicializar repo, ramas y README inicial',           'completada',   3);
GO

-- ============================================================
--  VERIFICACIÓN
-- ============================================================

SELECT * FROM Users;
SELECT * FROM Tasks;
GO