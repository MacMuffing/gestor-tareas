Gestor de Tareas
App web fullstack para gestionar tareas. Cada tarea tiene un titulo, una descripcion, un estado (pendiente, en progreso o completada) y un usuario asignado.
Desde la interfaz se pueden crear tareas nuevas, editarlas, eliminarlas y filtrarlas por estado en tiempo real.

*Requisitos previos
Antes de correr el proyecto hay que tener instalado lo siguiente:

.NET 8 SDK — para compilar y ejecutar la API
SQL Server Express — como motor de base de datos
SQL Server Management Studio — para ejecutar el script SQL
Node.js LTS — para correr el frontend en React
Git — para clonar el repositorio

*Como correrlo localmente
1. Clonar el repositorio

git clone https://github.com/MacMuffing/gestor-tareas.git
cd gestor-tareas

2. Crear la base de datos
Abrir SQL Server Management Studio y conectarse al servidor local. Desde ahi abrir el archivo GestorSQL.sql que esta en la raiz del proyecto y ejecutarlo completo con F5.
El script crea la base de datos GestorTareas, las tablas Users y Tasks con sus relaciones, y carga algunos datos de prueba para poder ver la app funcionando de entrada.

3. Configurar y ejecutar la API
Entrar a la carpeta del backend y ejecutar:
cd GestorTareas.API
dotnet run

Antes de ejecutar, abrir appsettings.json y verificar que la cadena de conexion apunte al servidor correcto.
Por defecto esta configurada como localhost, pero si SQL Server corre bajo otro nombre (por ejemplo .\SQLEXPRESS) hay que cambiarlo ahi.
Una vez corriendo, la API va a estar disponible en http://localhost:5234.
Para ver la documentacion de los endpoints se puede acceder al Swagger en http://localhost:5234/swagger, donde se pueden probar todas las rutas directamente desde el navegador.

4. Ejecutar el frontend
Abrir una terminal separada, entrar a la carpeta del frontend e instalar las dependencias:
cd gestor-tareas-frontend
npm install
npm run dev

La app va a estar disponible en http://localhost:63077.
Es importante que la API este corriendo antes de abrir el frontend, porque sino las tareas no van a cargar y va a aparecer un error de conexion.

Tecnologias utilizadas:

Backend: ASP.NET Core 8 Web API con arquitectura en capas
ORM: Entity Framework Core 8 para la conexion con la base de datos
Base de datos: SQL Server Express
Documentacion API: Swagger / Swashbuckle
Frontend: React con Vite y hooks funcionales
Control de versiones: Git + GitHub

IA utilizada
Use Claude de Anthropic como asistente durante el desarrollo. Me ayudo principalmente con la estructura inicial del backend (modelos, DTOs, repositorios, servicios y controlador),
con la configuracion de CORS para que el frontend pudiera comunicarse con la API, y con la resolucion de un error de referencia circular que aparecia al serializar las respuestas JSON.
En todos los casos revise el codigo generado, lo probe, lo ajuste donde fue necesario y me asegure de entender lo que hace cada parte antes de seguir avanzando.

Decisiones de diseno
Arquitectura en capas: El backend esta organizado en Controller, Service y Repository. Cada capa tiene una responsabilidad clara: el controlador maneja las rutas HTTP,
el servicio contiene la logica de negocio y el repositorio se encarga del acceso a la base de datos. Esto hace que el codigo sea mas facil de leer, mantener y escalar.
DTOs: Se usaron objetos de transferencia de datos separados para crear y actualizar tareas, en lugar de exponer directamente los modelos de la base de datos.
Esto da mas control sobre que datos acepta y devuelve la API en cada operacion.
Hook personalizado useTasks: En el frontend, toda la logica de comunicacion con la API (fetch, estados de carga, manejo de errores) esta encapsulada en un hook reutilizable.
Los componentes visuales solo se encargan de mostrar datos y disparar acciones, sin mezclar logica de negocio.
Restriccion de estados en la base de datos: El campo estado tiene un CHECK constraint a nivel de base de datos que solo acepta los valores pendiente, en progreso y completada.
Esto garantiza la integridad de los datos independientemente de por donde se acceda.
CORS explicito: La API solo acepta peticiones del origen del frontend. Es una buena practica de seguridad basica que evita que cualquier otra aplicacion consuma la API libremente.
