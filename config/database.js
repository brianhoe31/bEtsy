const Mysql         = require('mysql');

const Connection    = Mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'bEtsy',
    port: 3306
})

Connection.connect(function(err) {
    if (err) throw err;
});

module.exports = Connection;
