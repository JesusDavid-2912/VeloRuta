const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API VeloRuta Logística - Gestión de Entregas y Paquetería',
            version: '1.0.0',
            description: 'Servicio backend estructurado en módulos para la coordinación de centros de almacenamiento, personal de reparto, registro de envíos y trazabilidad de entregas.',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor Local de Desarrollo',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Importación de rutas modulares
const rutasAlmacenes = require('./routes/almacenes');
const rutasRepartidores = require('./routes/repartidores');
const rutasPaquetes = require('./routes/paquetes');
const rutasEntregas = require('./routes/entregas');

// Conexión de rutas
app.use('/api/almacenes', rutasAlmacenes);
app.use('/api/repartidores', rutasRepartidores);
app.use('/api/paquetes', rutasPaquetes);
app.use('/api/entregas', rutasEntregas);

// Encender servidor
const PUERTO = 3000;
app.listen(PUERTO, () => {
    console.log(`Servidor corriendo exitosamente en http://localhost:${PUERTO}`);
    console.log(`Documentación interactiva lista en http://localhost:${PUERTO}/api-docs`);
});