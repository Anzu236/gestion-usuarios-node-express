# Gestión de Usuarios - Node.js & Express

Proyecto backend desarrollado con Node.js y Express como parte de la evaluación de los módulos 6, 7 y 8.

En esta primera etapa se implementa la estructura inicial de una aplicación web utilizando Node.js, Express, variables de entorno, rutas modulares, controladores, middlewares, contenido estático y persistencia básica mediante archivos planos.

---

## Objetivo del proyecto

Desarrollar la base de una aplicación backend organizada y escalable que permita posteriormente incorporar:

- Gestión de usuarios.
- Base de datos PostgreSQL.
- Operaciones CRUD.
- ORM.
- Autenticación mediante JWT.
- API RESTful.
- Subida de archivos.

Actualmente el proyecto corresponde a la **Parte 1 - Módulo 6**, enfocada en la configuración inicial del servidor y la estructura modular de la aplicación.

---

## Tecnologías utilizadas

- Node.js 18.19.1
- npm 9.2.0
- Express 5.2.1
- dotenv 17.4.2
- nodemon 3.1.14
- HTML5
- CSS3
- File System (`fs`) de Node.js

---

## Requisitos del sistema

Para ejecutar el proyecto se necesita:

- Node.js versión 18 o superior.
- npm.
- Navegador web.
- Terminal.
- Editor de código, recomendado Visual Studio Code.

Para comprobar las versiones instaladas:

```bash
node --version
npm --version
```

---

## Repositorio

El código fuente del proyecto se encuentra disponible en GitHub:

https://github.com/Anzu236/gestion-usuarios-node-express

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Anzu236/gestion-usuarios-node-express.git
```

### 2. Ingresar al proyecto

```bash
cd gestion-usuarios-node-express
```

### 3. Instalar dependencias

```bash
npm install
```

Este comando instalará automáticamente las dependencias declaradas en `package.json`.

---

## Variables de entorno

El proyecto utiliza `dotenv` para administrar variables de entorno.

Crear el archivo `.env` tomando como referencia `.env.example`:

```bash
cp .env.example .env
```

Actualmente debe contener:

```env
PORT=3000
```

El archivo `.env` no se incluye en GitHub, ya que en futuras etapas podrá contener información sensible como credenciales de base de datos y secretos de autenticación.

---

## Ejecución

### Modo normal

```bash
npm start
```

Este comando ejecuta:

```bash
node app.js
```

### Modo desarrollo

```bash
npm run dev
```

Este comando utiliza Nodemon:

```bash
nodemon app.js
```

Nodemon reinicia automáticamente el servidor cada vez que detecta cambios en el código.

---

## Acceso a la aplicación

Una vez iniciado el servidor:

```text
http://localhost:3000
```

---

## Rutas disponibles

### GET /

Ruta principal de la aplicación.

Devuelve una página HTML con información básica del proyecto.

```text
http://localhost:3000/
```

### GET /status

Devuelve información sobre el estado del servidor en formato JSON.

```text
http://localhost:3000/status
```

Ejemplo de respuesta:

```json
{
  "status": "success",
  "message": "Servidor funcionando correctamente",
  "data": {
    "application": "Gestión de Usuarios",
    "environment": "development",
    "uptimeSeconds": 20,
    "timestamp": "2026-09-08T20:00:00.000Z"
  }
}
```

El valor de `uptimeSeconds` cambia dependiendo del tiempo que lleve ejecutándose el servidor.

---

## Archivos estáticos

Express utiliza el middleware:

```javascript
express.static()
```

para servir archivos contenidos en:

```text
public/
```

Actualmente la carpeta contiene:

```text
styles.css
```

Este archivo proporciona los estilos de la página principal.

---

## Registro de accesos

La aplicación implementa persistencia básica mediante archivos planos.

El middleware:

```text
middlewares/accessLogger.js
```

registra las visitas realizadas a las rutas principales.

Los registros se almacenan en:

```text
logs/log.txt
```

Cada registro incluye:

- Fecha.
- Hora.
- Método HTTP.
- Ruta visitada.

Ejemplo:

```text
08-09-2026 | 5:39:58 p. m. | GET /
08-09-2026 | 5:40:01 p. m. | GET /status
08-09-2026 | 5:40:05 p. m. | GET /status
```

Para agregar nuevos registros se utiliza:

```javascript
fs.appendFile()
```

Esto permite agregar contenido al final del archivo sin eliminar los registros existentes.

---

## Estructura del proyecto

```text
gestion-usuarios-node-express/
│
├── controllers/
│   └── indexController.js
│
├── logs/
│   └── log.txt
│
├── middlewares/
│   └── accessLogger.js
│
├── public/
│   └── styles.css
│
├── routes/
│   └── indexRoutes.js
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

> El archivo `.env` existe localmente, pero no se incluye en GitHub debido a la configuración de `.gitignore`.

---

## Descripción de las carpetas

### controllers

Contiene la lógica encargada de procesar las solicitudes y generar las respuestas.

Actualmente `indexController.js` contiene los controladores correspondientes a `/` y `/status`.

### routes

Contiene la definición de las rutas de la aplicación.

Permite separar las direcciones HTTP de la lógica de los controladores.

### middlewares

Contiene funciones que se ejecutan durante el ciclo de una solicitud HTTP.

Actualmente `accessLogger.js` se utiliza para registrar los accesos.

### public

Contiene los archivos estáticos que pueden ser solicitados directamente por el navegador.

### logs

Contiene los registros generados por la aplicación.

### services

Carpeta preparada para incorporar lógica de servicios durante las siguientes etapas del proyecto.

---

## Arquitectura utilizada

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
Respuesta
```

Esta organización facilita el mantenimiento y permite incorporar nuevas funcionalidades sin concentrar toda la lógica en un solo archivo.

---

## Justificación del uso de app.js

Se eligió `app.js` como archivo principal porque representa claramente el punto de entrada de la aplicación Express.

Sus principales responsabilidades son:

- Cargar variables de entorno.
- Configurar Express.
- Configurar middlewares generales.
- Servir archivos estáticos.
- Conectar las rutas.
- Iniciar el servidor.

La lógica específica se mantiene separada en controladores, rutas y middlewares.

---

## Justificación de la estructura modular

Se decidió separar el proyecto en:

- `routes`
- `controllers`
- `middlewares`
- `public`
- `logs`
- `services`

Esta estructura mantiene las responsabilidades organizadas y facilita la futura integración de PostgreSQL, ORM, autenticación y API RESTful.

---

## Justificación de los scripts

El proyecto utiliza:

```json
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js"
}
```

### npm start

Ejecuta normalmente la aplicación utilizando Node.js.

### npm run dev

Ejecuta la aplicación utilizando Nodemon, lo que permite reiniciar automáticamente el servidor al modificar el código.

---

## Manejo de rutas inexistentes

Si el usuario intenta acceder a una ruta que no existe, la aplicación devuelve un error HTTP `404`.

Ejemplo:

```json
{
  "status": "error",
  "message": "Ruta no encontrada",
  "data": null
}
```

---

## Reflexión técnica

Durante esta primera etapa se implementaron los fundamentos necesarios para construir una aplicación backend utilizando Node.js y Express.

La separación entre rutas, controladores y middlewares permite comprender que cada componente posee una responsabilidad específica dentro de la aplicación.

También se implementó persistencia básica utilizando el módulo nativo `fs` de Node.js, permitiendo registrar información sin utilizar todavía una base de datos.

El uso de variables de entorno permite separar la configuración del código fuente y prepara el proyecto para almacenar de forma segura configuraciones relacionadas con PostgreSQL y autenticación.

La estructura actual fue diseñada considerando las siguientes etapas del proyecto.

---

## Próximas etapas

### Módulo 7

Se incorporará:

- PostgreSQL.
- ORM.
- Modelos.
- Relaciones entre entidades.
- Operaciones CRUD.
- Consultas y filtros.

### Módulo 8

Se incorporará:

- API RESTful.
- Autenticación.
- JSON Web Tokens (JWT).
- Rutas protegidas.
- Subida de archivos.
- Validación de archivos.

---

## Autor

**Angélica Peña Sarniquet**

Proyecto desarrollado como parte del programa de formación en desarrollo backend.