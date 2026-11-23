const { Pool } = require('pg');

const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'envios_express_db',
    password: 'pg1234',
    port: 5432,
});

module.exports = db;