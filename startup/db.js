const mysql = require('mysql');
const config = require('config');
const { promisify } = require('util');

module.exports = function() {
    const connection = mysql.createConnection({
        host: config.get('db.host'),
        user: config.get('db.user'),
        password: config.get('db.password'),
        port: config.get('db.port'),
        database: config.get('db.database')
    });

    connection.query = promisify(connection.query.bind(connection));

    connection.connect();

    connection.on('error', (err) => {
        console.log(err.message);
    });

    return connection;
};