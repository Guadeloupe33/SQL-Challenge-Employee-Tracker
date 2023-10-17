const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'local-host',
  user: 'root',
  password: 'guadeloupe33',
  database: 'your-database-name'
});

module.exports = connection;
