# Gestión de Usuarios - Node.js, Express, Sequelize, PostgreSQL y JWT

Proyecto backend desarrollado como parte de una evaluación progresiva correspondiente a los módulos 6, 7 y 8.

El proyecto comenzó con la creación de un servidor utilizando Node.js y Express, posteriormente incorporó PostgreSQL y Sequelize ORM, y finalmente fue ampliado con una API RESTful, autenticación mediante JWT y subida segura de archivos.

---

# Estado del proyecto

El proyecto se encuentra dividido conceptualmente en tres etapas.

## Parte 1 - Módulo 6

Implementación inicial utilizando:

- Node.js.
- Express.
- Variables de entorno.
- Rutas modulares.
- Controladores.
- Middlewares.
- Archivos estáticos.
- Persistencia básica mediante archivos planos.
- Registro de accesos.

---

## Parte 2 - Módulo 7

Integración de base de datos y ORM:

- PostgreSQL.
- Sequelize ORM.
- Modelos.
- CRUD.
- Consultas dinámicas.
- Filtros.
- Validaciones.
- Manejo de errores.
- Relaciones 1:1.
- Relaciones 1:N.
- Relaciones N:M.
- Transacciones.
- COMMIT.
- ROLLBACK.
- Comparación entre SQL manual y ORM.

---

## Parte 3 - Módulo 8

Implementación de API segura:

- API RESTful.
- Registro de usuarios.
- Contraseñas cifradas con bcrypt.
- Login.
- JSON Web Tokens.
- Rutas protegidas.
- Validación de tokens.
- Expiración de JWT.
- Subida de archivos.
- Multer.
- Validación de formato.
- Validación de tamaño.
- Archivos públicos mediante URL.

---

# Tecnologías utilizadas

- Node.js 18.19.1
- npm 9.2.0
- Express 5.2.1
- PostgreSQL 16
- Sequelize ORM
- pg
- pg-hstore
- bcryptjs
- jsonwebtoken
- multer
- dotenv
- nodemon
- HTML5
- CSS3
- Git
- GitHub

---

# Arquitectura

La aplicación utiliza una estructura modular basada en separación de responsabilidades.

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
Middlewares
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

La autenticación agrega una capa adicional:

```text
Cliente
   |
   | Authorization: Bearer JWT
   v
authMiddleware
   |
   | token válido
   v
Ruta protegida
   |
   v
Controller
```

---

# Estructura del proyecto

```text
gestion-usuarios-node-express/
│
├── config/
│   └── database.js
│
├── controllers/
│   ├── authController.js
│   ├── indexController.js
│   ├── profileController.js
│   ├── roleController.js
│   ├── taskController.js
│   ├── uploadController.js
│   └── userController.js
│
├── logs/
│   └── log.txt
│
├── middlewares/
│   ├── accessLogger.js
│   ├── authMiddleware.js
│   └── uploadMiddleware.js
│
├── models/
│   ├── Profile.js
│   ├── Role.js
│   ├── Task.js
│   ├── User.js
│   ├── UserRole.js
│   └── index.js
│
├── public/
│   ├── styles.css
│   └── uploads/
│       └── .gitkeep
│
├── routes/
│   ├── authRoutes.js
│   ├── indexRoutes.js
│   ├── profileRoutes.js
│   ├── roleRoutes.js
│   ├── taskRoutes.js
│   ├── uploadRoutes.js
│   └── userRoutes.js
│
├── services/
│   ├── .gitkeep
│   └── userTransactionService.js
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

- Node.js 18 o superior.
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

## 1. Clonar repositorio

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

# PostgreSQL

Base de datos utilizada:

```text
gestion_usuarios_db
```

Usuario:

```text
gestion_app
```

Ejemplo de creación:

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

Crear un archivo:

```text
.env
```

utilizando `.env.example` como referencia.

Ejemplo:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=gestion_usuarios_db
DB_USER=gestion_app
DB_PASSWORD=TU_CONTRASEÑA

JWT_SECRET=TU_SECRETO_SEGURO
JWT_EXPIRES_IN=1h
```

El archivo `.env` contiene información sensible y se encuentra excluido mediante `.gitignore`.

No debe publicarse en GitHub.

---

# Ejecución

Modo normal:

```bash
npm start
```

Modo desarrollo:

```bash
npm run dev
```

Si todo funciona correctamente:

```text
Conexión a PostgreSQL establecida correctamente.
Modelos sincronizados con PostgreSQL.
Servidor iniciado en http://localhost:3000
```

---

# Modelos

## User

```text
id
name
email
active
password_hash
created_at
updated_at
```

`password_hash` almacena la contraseña cifrada mediante bcrypt.

La contraseña original nunca se almacena directamente.

---

## Task

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

```text
id
name
description
created_at
updated_at
```

---

## UserRole

Tabla intermedia:

```text
user_id
role_id
created_at
updated_at
```

---

# Relaciones Sequelize

## 1:N

```text
User 1 ───── N Task
```

Un usuario puede tener múltiples tareas.

---

## 1:1

```text
User 1 ───── 1 Profile
```

Cada usuario puede poseer solamente un perfil.

---

## N:M

```text
User N ───── M Role
```

Se implementa mediante:

```text
user_roles
```

---

# API RESTful

La aplicación utiliza operaciones HTTP para representar acciones sobre los recursos.

```text
GET     → Obtener información
POST    → Crear información
PUT     → Actualizar información
DELETE  → Eliminar información
```

---

# Usuarios

## Crear usuario

```text
POST /api/users
```

---

## Listar usuarios

Ruta protegida:

```text
GET /api/users
```

Requiere:

```text
Authorization: Bearer TOKEN
```

---

## Obtener usuario

```text
GET /api/users/:id
```

---

## Actualizar usuario

```text
PUT /api/users/:id
```

---

## Eliminar usuario

```text
DELETE /api/users/:id
```

---

# Tareas

## Crear tarea

```text
POST /api/tasks
```

---

## Listar tareas

Ruta protegida:

```text
GET /api/tasks
```

Requiere:

```text
Authorization: Bearer TOKEN
```

---

## Obtener tarea

```text
GET /api/tasks/:id
```

---

## Actualizar tarea

```text
PUT /api/tasks/:id
```

---

## Eliminar tarea

```text
DELETE /api/tasks/:id
```

---

# Consultas dinámicas

## Usuarios

Buscar:

```text
GET /api/users?search=Angelica
```

Filtrar:

```text
GET /api/users?active=true
```

---

## Tareas

Buscar:

```text
GET /api/tasks?search=Node
```

Filtrar:

```text
GET /api/tasks?completed=true
```

Por usuario:

```text
GET /api/tasks?userId=1
```

Filtros combinados:

```text
GET /api/tasks?search=Node&userId=1&completed=true
```

---

# Perfiles

Crear:

```text
POST /api/profiles
```

Obtener por usuario:

```text
GET /api/profiles/user/:userId
```

Actualizar:

```text
PUT /api/profiles/:id
```

Eliminar:

```text
DELETE /api/profiles/:id
```

---

# Roles

Crear:

```text
POST /api/roles
```

Listar:

```text
GET /api/roles
```

Asignar rol:

```text
POST /api/roles/assign
```

Roles de usuario:

```text
GET /api/roles/user/:userId
```

Eliminar rol de usuario:

```text
DELETE /api/roles/:roleId/users/:userId
```

---

# Autenticación

La autenticación utiliza:

- bcryptjs.
- JSON Web Tokens.

---

# Registro

Endpoint:

```text
POST /api/auth/register
```

Ejemplo:

```json
{
  "name": "Usuario JWT",
  "email": "jwt@example.com",
  "password": "ClaveSegura123!"
}
```

La contraseña es procesada con:

```javascript
bcrypt.hash()
```

Antes de almacenarse.

La API nunca devuelve `password_hash` en las respuestas normales.

---

# Login

El endpoint solicitado para login es:

```text
POST /login
```

También se encuentra disponible:

```text
POST /api/auth/login
```

Ejemplo:

```json
{
  "email": "jwt@example.com",
  "password": "ClaveSegura123!"
}
```

Si las credenciales son correctas:

```json
{
  "status": "success",
  "message": "Inicio de sesión correcto",
  "data": {
    "user": {
      "id": 8,
      "name": "Usuario JWT",
      "email": "jwt@example.com"
    },
    "token": "JWT"
  }
}
```

---

# JSON Web Token

El token se genera mediante:

```javascript
jwt.sign()
```

Su duración se configura desde:

```env
JWT_EXPIRES_IN=1h
```

El secreto se almacena únicamente en:

```env
JWT_SECRET
```

---

# Uso del JWT

Las rutas protegidas requieren:

```text
Authorization: Bearer TOKEN
```

Ejemplo:

```bash
curl http://localhost:3000/api/users \
-H "Authorization: Bearer TOKEN"
```

---

# Validación JWT

Se probaron los siguientes casos:

## Sin token

Resultado:

```text
401 Unauthorized
```

Respuesta:

```json
{
  "status": "error",
  "message": "Token de autenticación requerido",
  "data": null
}
```

---

## Token inválido

Resultado:

```text
401 Unauthorized
```

Respuesta:

```json
{
  "status": "error",
  "message": "Token inválido",
  "data": null
}
```

---

## Token válido

Permite acceder a la ruta protegida.

---

## Token expirado

Resultado:

```text
401 Unauthorized
```

Respuesta:

```json
{
  "status": "error",
  "message": "El token ha expirado",
  "data": null
}
```

La expiración fue comprobada utilizando temporalmente un token de pocos segundos.

La configuración normal del proyecto permanece en:

```env
JWT_EXPIRES_IN=1h
```

---

# Rutas protegidas

Actualmente se encuentran protegidas mediante JWT:

```text
GET /api/users
GET /api/tasks
POST /upload
```

El middleware utilizado es:

```text
middlewares/authMiddleware.js
```

---

# Subida de archivos

La aplicación utiliza Multer.

Endpoint:

```text
POST /upload
```

La solicitud debe utilizar:

```text
multipart/form-data
```

El nombre del campo esperado es:

```text
file
```

También requiere JWT:

```text
Authorization: Bearer TOKEN
```

---

# Formatos permitidos

Se aceptan imágenes:

```text
JPG
JPEG
PNG
WEBP
```

Se valida tanto:

- MIME type.
- Extensión.

---

# Tamaño máximo

El tamaño máximo permitido es:

```text
2 MB
```

Si se supera:

```json
{
  "status": "error",
  "message": "El archivo supera el tamaño máximo permitido de 2 MB",
  "data": null
}
```

---

# Archivo de tipo inválido

Por ejemplo, intentar subir:

```text
README.md
```

produce:

```json
{
  "status": "error",
  "message": "Tipo de archivo no permitido. Solo se aceptan JPG, JPEG, PNG y WEBP",
  "data": null
}
```

---

# Almacenamiento

Los archivos se guardan en:

```text
public/uploads/
```

Se utiliza un nombre único generado con:

```javascript
crypto.randomUUID()
```

para evitar sobrescrituras.

---

# Acceso público al archivo

Después de una subida correcta se devuelve una URL similar a:

```text
http://localhost:3000/uploads/archivo.png
```

Dicha URL puede abrirse directamente desde el navegador.

---

# Archivos subidos y Git

Los archivos cargados por usuarios no se versionan.

`.gitignore` contiene:

```gitignore
public/uploads/*
!public/uploads/.gitkeep
```

Esto mantiene la carpeta dentro del repositorio pero evita subir archivos reales.

---

# Transacciones

El proyecto mantiene la funcionalidad desarrollada en el Módulo 7.

Endpoint:

```text
POST /api/users/transaction
```

Realiza:

```text
Crear User
    +
Crear Task
```

Si ambas acciones funcionan:

```text
COMMIT
```

Si alguna falla:

```text
ROLLBACK
```

---

# SQL manual vs Sequelize

Consulta SQL:

```sql
SELECT
    id,
    name,
    email,
    active
FROM users
ORDER BY id;
```

Consulta Sequelize equivalente:

```javascript
User.findAll({
    order: [
        ["id", "ASC"]
    ]
});
```

Ambas consultas devolvieron los mismos registros.

Sequelize facilita:

- CRUD.
- Validaciones.
- Relaciones.
- Includes.
- Transacciones.
- Integración con JavaScript.

---

# Formato de respuestas

Las respuestas mantienen una estructura uniforme.

Éxito:

```json
{
  "status": "success",
  "message": "Operación realizada correctamente",
  "data": {}
}
```

Error:

```json
{
  "status": "error",
  "message": "Descripción del error",
  "data": null
}
```

---

# Códigos HTTP utilizados

```text
200 OK
201 Created
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
500 Internal Server Error
```

---

# Seguridad implementada

El proyecto incorpora:

- Contraseñas con bcrypt.
- Contraseñas nunca devueltas por la API.
- JWT firmado.
- JWT con expiración.
- Middleware de autenticación.
- Rutas privadas.
- Validación de archivos.
- Tamaño máximo de archivos.
- Extensiones permitidas.
- Credenciales mediante variables de entorno.
- `.env` excluido de Git.

---

# Evidencias realizadas

Durante el desarrollo se verificaron:

- Servidor funcionando.
- PostgreSQL conectado.
- Persistencia real.
- CRUD.
- Relaciones ORM.
- Transacciones.
- Rollback.
- SQL vs ORM.
- Registro.
- Contraseña cifrada.
- Login incorrecto.
- Login correcto.
- Generación JWT.
- Ruta sin token.
- Token inválido.
- JWT válido.
- Token expirado.
- Dos rutas protegidas.
- Upload protegido.
- Imagen válida.
- Acceso público a imagen.
- Archivo con extensión inválida.
- Archivo superior a 2 MB.
- Git y GitHub.

---

# Evolución del proyecto

```text
PARTE 1 - MÓDULO 6
Node + Express
        ↓
PARTE 2 - MÓDULO 7
PostgreSQL + Sequelize
        ↓
PARTE 3 - MÓDULO 8
REST + JWT + Upload
```

Cada módulo amplía el proyecto anterior sin eliminar las funcionalidades previamente implementadas.

---

# Repositorio

```text
https://github.com/Anzu236/gestion-usuarios-node-express
```

---

# Autor

**Angélica Peña Sarniguet**

Proyecto desarrollado como parte del programa de formación en desarrollo backend.