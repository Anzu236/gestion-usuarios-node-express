# Gestión de Usuarios - Node.js, Express, Sequelize & PostgreSQL

Proyecto backend desarrollado con Node.js y Express como parte de la evaluación progresiva de los módulos 6, 7 y 8.

El proyecto comenzó con la configuración de un servidor Express y posteriormente fue ampliado con PostgreSQL, Sequelize ORM, operaciones CRUD, validaciones, consultas dinámicas, relaciones entre entidades y transacciones.

---

# Estado del proyecto

Actualmente se encuentran implementadas:

- Parte 1 - Módulo 6:
  - Node.js.
  - Express.
  - Rutas públicas.
  - Contenido HTML y JSON.
  - Archivos estáticos.
  - Middleware.
  - Logs mediante archivos planos.
  - Variables de entorno.
  - Estructura modular.

- Parte 2 - Módulo 7:
  - PostgreSQL.
  - Sequelize ORM.
  - Modelos.
  - CRUD.
  - Consultas dinámicas.
  - Validaciones.
  - Manejo de errores.
  - Relaciones 1:1.
  - Relaciones 1:N.
  - Relaciones N:M.
  - Transacciones.
  - Rollback.
  - Comparación SQL manual vs ORM.

La Parte 3 - Módulo 8 será desarrollada posteriormente e incorporará:

- API RESTful final.
- Autenticación JWT.
- Login.
- Rutas protegidas.
- Subida de archivos.
- Validación de archivos.

---

# Tecnologías utilizadas

- Node.js 18.19.1
- npm 9.2.0
- Express 5.2.1
- PostgreSQL 16
- Sequelize ORM
- pg
- pg-hstore
- dotenv 17.4.2
- nodemon 3.1.14
- HTML5
- CSS3
- Git
- GitHub

---

# Arquitectura

El proyecto utiliza una arquitectura modular con separación de responsabilidades.

```text
Cliente
   |
   v
Express
   |
   v
Routes
   |
   v
Controllers
   |
   v
Services
   |
   v
Models
   |
   v
Sequelize ORM
   |
   v
PostgreSQL
```

La separación permite mantener el código organizado y facilita agregar nuevas funcionalidades en etapas posteriores.

---

# Estructura del proyecto

```text
gestion-usuarios-node-express/
│
├── config/
│   └── database.js
│
├── controllers/
│   ├── indexController.js
│   ├── userController.js
│   ├── taskController.js
│   ├── profileController.js
│   └── roleController.js
│
├── logs/
│   └── log.txt
│
├── middlewares/
│   └── accessLogger.js
│
├── models/
│   ├── User.js
│   ├── Task.js
│   ├── Profile.js
│   ├── Role.js
│   ├── UserRole.js
│   └── index.js
│
├── public/
│   └── styles.css
│
├── routes/
│   ├── indexRoutes.js
│   ├── userRoutes.js
│   ├── taskRoutes.js
│   ├── profileRoutes.js
│   └── roleRoutes.js
│
├── services/
│   ├── .gitkeep
│   └── userTransactionService.js
│
├── .env
├── .env.example
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

---

# Requisitos del sistema

Para ejecutar el proyecto se necesita:

- Node.js versión 18 o superior.
- npm.
- PostgreSQL.
- Git.
- Navegador web.
- Terminal.
- Visual Studio Code o editor equivalente.

Comprobar Node.js:

```bash
node --version
```

Comprobar npm:

```bash
npm --version
```

Comprobar PostgreSQL:

```bash
psql --version
```

---

# Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/Anzu236/gestion-usuarios-node-express.git
```

## 2. Entrar al proyecto

```bash
cd gestion-usuarios-node-express
```

## 3. Instalar dependencias

```bash
npm install
```

---

# Configuración de PostgreSQL

El proyecto utiliza PostgreSQL como sistema de gestión de base de datos relacional.

Base utilizada:

```text
gestion_usuarios_db
```

Usuario:

```text
gestion_app
```

Ejemplo de creación desde PostgreSQL:

```sql
CREATE ROLE gestion_app WITH LOGIN;
```

Configurar contraseña:

```text
\password gestion_app
```

Crear base:

```sql
CREATE DATABASE gestion_usuarios_db OWNER gestion_app;
```

---

# Variables de entorno

El archivo `.env` contiene información sensible y no debe subirse a GitHub.

Ejemplo:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=gestion_usuarios_db
DB_USER=gestion_app
DB_PASSWORD=TU_CONTRASEÑA
```

El proyecto incluye:

```text
.env.example
```

como referencia pública.

`.env` se encuentra protegido mediante `.gitignore`.

---

# Conexión con PostgreSQL

La configuración se encuentra en:

```text
config/database.js
```

Sequelize obtiene los datos desde variables de entorno.

Al iniciar correctamente el servidor se muestra:

```text
Conexión a PostgreSQL establecida correctamente.
Modelos sincronizados con PostgreSQL.
Servidor iniciado en http://localhost:3000
```

Se utilizó Sequelize porque facilita la integración de PostgreSQL con JavaScript y permite trabajar con modelos, validaciones, relaciones y transacciones sin escribir todas las consultas SQL manualmente.

---

# Ejecución

## Modo normal

```bash
npm start
```

## Modo desarrollo

```bash
npm run dev
```

Nodemon reinicia automáticamente el servidor cuando se detectan modificaciones.

---

# Rutas generales

## GET /

Página principal en HTML.

```text
http://localhost:3000/
```

---

## GET /status

Devuelve información del servidor en JSON.

```text
http://localhost:3000/status
```

---

# Modelos

## User

Representa los usuarios.

Campos principales:

```text
id
name
email
active
created_at
updated_at
```

---

## Task

Representa tareas asociadas a usuarios.

```text
id
title
description
completed
user_id
created_at
updated_at
```

---

## Profile

Representa información adicional de un usuario.

```text
id
bio
phone
city
user_id
created_at
updated_at
```

---

## Role

Representa roles disponibles.

```text
id
name
description
created_at
updated_at
```

---

## UserRole

Tabla intermedia utilizada por la relación muchos a muchos.

```text
user_id
role_id
created_at
updated_at
```

---

# Relaciones entre modelos

Se implementaron distintos tipos de relaciones mediante Sequelize.

## Relación 1:N

```text
User 1 ───── N Task
```

Un usuario puede tener múltiples tareas.

```javascript
User.hasMany(Task);
Task.belongsTo(User);
```

---

## Relación 1:1

```text
User 1 ───── 1 Profile
```

Un usuario puede tener solamente un perfil.

La columna:

```text
profiles.user_id
```

posee una restricción `UNIQUE`.

---

## Relación N:M

```text
User N ───── M Role
```

La relación utiliza la tabla intermedia:

```text
user_roles
```

Un usuario puede poseer múltiples roles y un rol puede pertenecer a múltiples usuarios.

---

# CRUD de usuarios

## Crear usuario

```text
POST /api/users
```

Ejemplo:

```json
{
  "name": "Carlos Soto",
  "email": "carlos.soto@example.com",
  "active": true
}
```

---

## Listar usuarios

```text
GET /api/users
```

Ejemplo:

```text
http://localhost:3000/api/users
```

---

## Obtener usuario por ID

```text
GET /api/users/:id
```

Ejemplo:

```text
GET /api/users/1
```

---

## Actualizar usuario

```text
PUT /api/users/:id
```

Ejemplo:

```json
{
  "name": "Angelica Peña Sarniquet",
  "active": false
}
```

---

## Eliminar usuario

```text
DELETE /api/users/:id
```

Antes de eliminar se comprueba que el usuario exista.

---

# Usuarios simulados

Para comprobar las consultas se crearon más de tres registros de prueba.

Ejemplo:

```text
Angelica Peña Sarniquet
Usuario Transaccion
Carlos Soto
Maria Gonzalez
```

Los registros fueron comprobados directamente desde PostgreSQL y también mediante el endpoint:

```text
GET /api/users
```

---

# Consultas dinámicas de usuarios

## Buscar por nombre o correo

```text
GET /api/users?search=Angelica
```

---

## Filtrar por estado

```text
GET /api/users?active=true
```

o:

```text
GET /api/users?active=false
```

---

## Combinar filtros

```text
GET /api/users?search=Angelica&active=false
```

Se utiliza:

```javascript
Op.iLike
```

para realizar búsquedas sin distinguir mayúsculas y minúsculas en PostgreSQL.

---

# CRUD de tareas

## Crear tarea

```text
POST /api/tasks
```

Ejemplo:

```json
{
  "title": "Revisar proyecto Node y Express",
  "description": "Verificar CRUD y relaciones con Sequelize",
  "completed": false,
  "userId": 1
}
```

---

## Listar tareas

```text
GET /api/tasks
```

La consulta utiliza `include` para devolver además los datos del usuario relacionado.

---

## Obtener tarea por ID

```text
GET /api/tasks/:id
```

---

## Actualizar tarea

```text
PUT /api/tasks/:id
```

Ejemplo:

```json
{
  "completed": true
}
```

---

## Eliminar tarea

```text
DELETE /api/tasks/:id
```

---

# Filtros de tareas

## Por estado

```text
GET /api/tasks?completed=true
```

---

## Por usuario

```text
GET /api/tasks?userId=1
```

---

## Búsqueda por título o descripción

```text
GET /api/tasks?search=Node
```

---

## Filtros combinados

```text
GET /api/tasks?search=Node&userId=1&completed=true
```

---

# Perfiles

## Crear perfil

```text
POST /api/profiles
```

Ejemplo:

```json
{
  "bio": "Perfil de usuario para proyecto Node y Express",
  "phone": "+56912345678",
  "city": "Santiago",
  "userId": 1
}
```

---

## Obtener perfil de usuario

```text
GET /api/profiles/user/:userId
```

---

## Actualizar perfil

```text
PUT /api/profiles/:id
```

---

## Eliminar perfil

```text
DELETE /api/profiles/:id
```

---

# Roles

## Crear rol

```text
POST /api/roles
```

Ejemplo:

```json
{
  "name": "Administrador",
  "description": "Acceso administrativo al sistema"
}
```

---

## Listar roles

```text
GET /api/roles
```

---

## Asignar rol a usuario

```text
POST /api/roles/assign
```

Ejemplo:

```json
{
  "userId": 1,
  "roleId": 1
}
```

---

## Obtener roles de usuario

```text
GET /api/roles/user/:userId
```

---

## Eliminar rol de un usuario

```text
DELETE /api/roles/:roleId/users/:userId
```

---

# Transacciones

Se implementó una operación transaccional que realiza dos acciones consecutivas:

1. Crear un usuario.
2. Crear una tarea asociada a ese usuario.

Endpoint:

```text
POST /api/users/transaction
```

Ejemplo:

```json
{
  "name": "Usuario Transaccion",
  "email": "transaccion.ok@example.com",
  "active": true,
  "title": "Tarea inicial transaccional",
  "description": "Creada dentro de una transaccion Sequelize"
}
```

El servicio se encuentra en:

```text
services/userTransactionService.js
```

---

## COMMIT

Si ambas operaciones se ejecutan correctamente:

```javascript
await transaction.commit();
```

Se guardan tanto el usuario como la tarea.

Ejemplo comprobado:

```text
Usuario Transaccion
+
Tarea inicial transaccional
```

---

## ROLLBACK

Para comprobar el rollback se utilizó una tarea con un título inválido:

```json
{
  "name": "Usuario Rollback",
  "email": "rollback@example.com",
  "title": "x"
}
```

La validación de `Task` impide títulos menores a tres caracteres.

Al fallar la creación de la tarea se ejecuta:

```javascript
await transaction.rollback();
```

El usuario tampoco queda almacenado.

La comprobación SQL:

```sql
SELECT
    id,
    name,
    email
FROM users
WHERE email = 'rollback@example.com';
```

devuelve:

```text
(0 rows)
```

Esto demuestra que la transacción fue revertida correctamente.

---

# SQL manual vs Sequelize ORM

Se realizó una comparación entre una consulta SQL directa y su equivalente mediante Sequelize.

## SQL manual

```sql
SELECT
    id,
    name,
    email,
    active
FROM users
ORDER BY id;
```

Esta consulta se ejecuta directamente sobre PostgreSQL.

---

## Sequelize ORM

La misma información es obtenida mediante:

```javascript
User.findAll({
    order: [
        ["id", "ASC"]
    ]
});
```

y expuesta mediante:

```text
GET /api/users
```

Ambos métodos devolvieron los mismos registros.

---

## Comparación

### SQL manual

Ventajas:

- Control directo sobre la consulta.
- Permite optimizar sentencias específicas.
- Facilita comprender exactamente qué operación realiza la base de datos.

Desventajas:

- Requiere escribir SQL manualmente.
- Puede aumentar la cantidad de código.
- Las relaciones y validaciones requieren mayor gestión manual.

### Sequelize ORM

Ventajas:

- Permite trabajar mediante objetos JavaScript.
- Facilita CRUD.
- Integra validaciones.
- Simplifica relaciones.
- Permite utilizar `include`.
- Facilita transacciones.
- Reduce SQL escrito manualmente.

Desventajas:

- Agrega una capa de abstracción.
- Algunas consultas avanzadas pueden requerir conocimientos adicionales del ORM.

Para este proyecto se utilizó Sequelize porque facilita la integración entre Express y PostgreSQL manteniendo una arquitectura modular y escalable.

---

# Validaciones implementadas

Entre las principales validaciones se encuentran:

- Nombre de usuario obligatorio.
- Longitud del nombre.
- Correo electrónico obligatorio.
- Formato válido de correo.
- Correo electrónico único.
- Título de tarea obligatorio.
- Longitud mínima del título.
- Usuario asociado existente.
- Perfil único por usuario.
- Rol único.
- Relación usuario-rol no duplicada.
- Validación de IDs inexistentes.

---

# Manejo de errores

La API utiliza respuestas estructuradas:

```json
{
  "status": "error",
  "message": "Descripción del error",
  "data": null
}
```

Se utilizan códigos HTTP como:

```text
200 OK
201 Created
400 Bad Request
404 Not Found
409 Conflict
500 Internal Server Error
```

---

# Formato de respuestas

Las respuestas siguen una estructura consistente:

```json
{
  "status": "success",
  "message": "Operación realizada correctamente",
  "data": {}
}
```

Esto permite que futuros clientes puedan interpretar fácilmente el resultado de cada solicitud.

---

# Persistencia mediante archivos planos

Desde el Módulo 6 se mantiene el middleware:

```text
middlewares/accessLogger.js
```

que registra accesos en:

```text
logs/log.txt
```

El formato utilizado es:

```text
fecha | hora | método HTTP | ruta
```

Esto demuestra que la evolución hacia PostgreSQL no eliminó las funcionalidades desarrolladas anteriormente.

---

# Decisiones técnicas

## Uso de app.js

Se utilizó:

```text
app.js
```

como archivo principal porque representa de manera clara el punto de entrada de la aplicación Express.

Actualmente sus responsabilidades son:

- Cargar variables de entorno.
- Crear Express.
- Registrar middlewares.
- Servir archivos estáticos.
- Registrar rutas.
- Registrar modelos.
- Conectar PostgreSQL.
- Sincronizar Sequelize.
- Iniciar el servidor.

---

## Uso de PostgreSQL

Se eligió PostgreSQL porque:

- Es una base de datos relacional robusta.
- Soporta relaciones.
- Permite transacciones.
- Posee restricciones de integridad.
- Se integra correctamente con Sequelize.
- Es ampliamente utilizada en aplicaciones backend.

---

## Protección de credenciales

Las credenciales se almacenan en:

```text
.env
```

y dicho archivo se encuentra excluido de Git mediante:

```text
.gitignore
```

El repositorio contiene únicamente:

```text
.env.example
```

como referencia de configuración.

---

# Evidencias del Módulo 7

Durante el desarrollo se comprobaron:

- Conexión correcta a PostgreSQL.
- Sincronización de modelos.
- Creación de tablas.
- Persistencia real.
- Más de tres usuarios simulados.
- CRUD de usuarios.
- CRUD de tareas.
- Consultas filtradas.
- Búsquedas dinámicas.
- Relación User 1:N Task.
- Relación User 1:1 Profile.
- Relación User N:M Role.
- Tabla intermedia `user_roles`.
- Comparación SQL manual vs ORM.
- Transacción exitosa.
- Rollback ante error.
- Código versionado en GitHub.

---

# Repositorio

Código fuente:

```text
https://github.com/Anzu236/gestion-usuarios-node-express
```

---

# Próxima etapa - Módulo 8

La siguiente etapa continuará sobre este mismo proyecto.

Se incorporará:

- Diseño RESTful final.
- Login.
- JSON Web Tokens.
- Rutas privadas.
- Middleware de autenticación.
- Validación y expiración de tokens.
- Subida de archivos.
- Multer.
- Validación de tipo y tamaño.
- Carpeta de uploads.
- Documentación final de la API.

El desarrollo del Módulo 8 no reemplazará los módulos anteriores, sino que ampliará progresivamente el backend existente.

---

# Autor

**Angélica Peña Sarniguet**

Proyecto desarrollado como parte del programa de formación en desarrollo backend.