# Gestión de Usuarios - Node.js, Express, Sequelize & PostgreSQL

Proyecto backend desarrollado con Node.js y Express como parte de la evaluación de los módulos 6, 7 y 8.

Actualmente el proyecto incorpora una arquitectura modular, persistencia con PostgreSQL mediante Sequelize ORM, operaciones CRUD, búsquedas dinámicas, validaciones y relaciones entre entidades.

---

## Estado actual del proyecto

Se encuentran implementadas:

- Parte 1 - Módulo 6: Node.js y Express.
- Parte 2 - Módulo 7: PostgreSQL, Sequelize ORM, CRUD y relaciones.

La Parte 3 - Módulo 8 incorporará posteriormente:

- API RESTful ampliada.
- Autenticación JWT.
- Rutas protegidas.
- Subida de archivos.
- Validaciones de archivos.

---

## Tecnologías utilizadas

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

## Arquitectura

El proyecto utiliza una estructura modular basada en separación de responsabilidades.

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
Models
   |
   v
Sequelize ORM
   |
   v
PostgreSQL
```

---

## Estructura del proyecto

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
│   └── .gitkeep
│
├── .env.example
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

---

# Requisitos

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

## 2. Ingresar al proyecto

```bash
cd gestion-usuarios-node-express
```

## 3. Instalar dependencias

```bash
npm install
```

---

# Configuración de PostgreSQL

El proyecto utiliza la base de datos:

```text
gestion_usuarios_db
```

y el usuario:

```text
gestion_app
```

Ejemplo de creación:

```sql
CREATE ROLE gestion_app WITH LOGIN;
```

Configurar contraseña desde PostgreSQL:

```text
\password gestion_app
```

Crear la base:

```sql
CREATE DATABASE gestion_usuarios_db OWNER gestion_app;
```

---

# Variables de entorno

Crear `.env` tomando como referencia:

```text
.env.example
```

Ejemplo:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=gestion_usuarios_db
DB_USER=gestion_app
DB_PASSWORD=TU_CONTRASEÑA
```

El archivo `.env` se encuentra excluido mediante `.gitignore` y no debe publicarse en GitHub.

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

Si PostgreSQL se encuentra correctamente configurado aparecerá:

```text
Conexión a PostgreSQL establecida correctamente.
Modelos sincronizados con PostgreSQL.
Servidor iniciado en http://localhost:3000
```

---

# Rutas generales

## GET /

Página principal HTML.

```text
http://localhost:3000/
```

## GET /status

Estado del servidor en formato JSON.

```text
http://localhost:3000/status
```

---

# Entidades

## User

Representa a los usuarios del sistema.

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

Representa las tareas asociadas a los usuarios.

Campos:

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

Campos:

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

Representa los roles disponibles.

Campos:

```text
id
name
description
created_at
updated_at
```

---

## UserRole

Tabla intermedia utilizada para la relación muchos a muchos entre usuarios y roles.

Campos:

```text
user_id
role_id
created_at
updated_at
```

---

# Relaciones

El proyecto implementa los tres tipos principales de relaciones solicitadas.

## Relación 1:N

```text
User 1 ───── N Task
```

Un usuario puede tener muchas tareas.

En Sequelize:

```javascript
User.hasMany(Task);
Task.belongsTo(User);
```

---

## Relación 1:1

```text
User 1 ───── 1 Profile
```

Cada usuario puede tener solamente un perfil.

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

Se implementa mediante:

```text
user_roles
```

Ejemplo:

```text
Usuario 1
├── Administrador
└── Operador
```

---

# CRUD de usuarios

## Crear usuario

```text
POST /api/users
```

Ejemplo:

```json
{
  "name": "Angelica Peña",
  "email": "angelica@example.com",
  "active": true
}
```

---

## Listar usuarios

```text
GET /api/users
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

---

# Búsquedas de usuarios

Buscar por nombre o correo:

```text
GET /api/users?search=Angelica
```

Filtrar por estado:

```text
GET /api/users?active=false
```

Combinar filtros:

```text
GET /api/users?search=Angelica&active=false
```

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

Las consultas incluyen automáticamente información del usuario relacionado.

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

Filtrar por estado:

```text
GET /api/tasks?completed=true
```

Filtrar por usuario:

```text
GET /api/tasks?userId=1
```

Buscar por título o descripción:

```text
GET /api/tasks?search=Node
```

Combinar filtros:

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

Ejemplo:

```text
GET /api/profiles/user/1
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

Ejemplo:

```text
GET /api/roles/user/1
```

---

## Quitar rol a usuario

```text
DELETE /api/roles/:roleId/users/:userId
```

---

# Validaciones implementadas

El proyecto incluye, entre otras:

- Nombre de usuario obligatorio.
- Formato de correo válido.
- Correo electrónico único.
- Nombre de rol único.
- Validación de usuario asociado.
- Validación de relaciones duplicadas.
- Un solo perfil por usuario.
- Títulos de tareas obligatorios.
- Manejo de registros inexistentes.

---

# Códigos HTTP utilizados

```text
200 OK
201 Created
400 Bad Request
404 Not Found
409 Conflict
500 Internal Server Error
```

---

# Persistencia básica del Módulo 6

El middleware:

```text
middlewares/accessLogger.js
```

registra accesos en:

```text
logs/log.txt
```

Cada línea contiene:

```text
fecha | hora | método HTTP | ruta
```

---

# Decisiones técnicas

## app.js

Se utiliza como punto de entrada de la aplicación.

Sus responsabilidades son:

- Cargar variables de entorno.
- Inicializar Express.
- Registrar modelos.
- Configurar middlewares.
- Servir archivos estáticos.
- Conectar las rutas.
- Comprobar PostgreSQL.
- Sincronizar Sequelize.
- Iniciar el servidor.

---

## Sequelize ORM

Sequelize permite trabajar con PostgreSQL utilizando objetos y métodos JavaScript.

Ejemplos:

```javascript
User.create()
User.findAll()
User.findByPk()
user.update()
user.destroy()
```

También facilita las relaciones mediante:

```javascript
hasOne()
hasMany()
belongsTo()
belongsToMany()
```

---

# Repositorio

Código fuente:

https://github.com/Anzu236/gestion-usuarios-node-express

---

# Próxima etapa - Módulo 8

La siguiente etapa incorporará:

- API RESTful ampliada.
- Autenticación mediante JWT.
- Login de usuarios.
- Protección de rutas.
- Manejo de tokens.
- Subida de archivos.
- Validación de tipo y tamaño de archivos.

---

# Autor

**Angélica Peña Sarniquet**

Proyecto desarrollado como parte del programa de formación en desarrollo backend.