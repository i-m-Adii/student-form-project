const { Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'formdb',
    password: 'Password@123',
    port: 5432,
});

module.exports = pool;