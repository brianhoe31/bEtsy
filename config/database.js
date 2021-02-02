const mysql         = require('mysql');

const connection    = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'dojo',
    port: 3306
})

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
