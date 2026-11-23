# API VeloRuta Logística - Gestión de Entregas y Paquetería

API RESTful desarrollada con **Node.js**, **Express** y **PostgreSQL** bajo una arquitectura modular, diseñada para administrar almacenes, repartidores, inventario de paquetes y el seguimiento de rutas de entrega. Incluye documentación interactiva mediante **Swagger (OpenAPI 3.0)**.

---

## Tecnologías Utilizadas

* **Entorno de ejecución:** Node.js
* **Framework Backend:** Express.js
* **Base de Datos:** PostgreSQL (`pg` / node-postgres)
* **Documentación / Contrato API:** Swagger UI (`swagger-ui-express` & `swagger-jsdoc`)
* **Seguridad / Middlewares:** CORS (`cors`)

---

## Estructura del Proyecto

```text
api_envios/
├── routes/
│   ├── almacenes.js       # Endpoints CRUD para almacenes
│   ├── repartidores.js    # Endpoints CRUD para repartidores
│   ├── paquetes.js        # Endpoints CRUD para paquetes
│   └── entregas.js        # Endpoints CRUD para entregas
├── db.js                  # Configuración del Pool de conexión a PostgreSQL
├── index.js               # Punto de entrada, middlewares y configuración de Swagger
├── package.json           # Dependencias y metadatos del proyecto
└── README.md
```

---

## Instalación de Dependencias

Dado que la carpeta `node_modules` se excluye del repositorio, es necesario reinstalar los paquetes requeridos antes de ejecutar el servidor.

1. **Instalación automática** (lee directamente el archivo `package.json`)

    ```bash
    npm install
    ```
2. **Instalación manual desde cero** 

    ```bash
    npm install express pg cors swagger-ui-express swagger-jsdoc
    ```