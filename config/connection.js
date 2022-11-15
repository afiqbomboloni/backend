const mysql = require('mysql')

// create a connection configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_ourfamy',
    multipleStatements: true
});

// connection to database
connection.connect((err) => {
    if(err) throw err;
    console.log('Connection to MySql successfully')
})

module.exports = connection;