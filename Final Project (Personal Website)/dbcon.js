/*Pool setup for database*/
var mysql = require('mysql');
var pool = mysql.createPool({
    host  : 'classmysql.engr.oregonstate.edu',
    user  : 'cs290_degeerm',
    password: '8888',
    database: 'cs290_degeerm',
});

module.exports.pool = pool;