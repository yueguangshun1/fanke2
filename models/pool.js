
var mysql = require("mysql");
module.exports = mysql.createPool({
    port:"3306",
    host:"localhost",
    user:"root",
    password:"root",
    database:"my1717",
    connectionLimit:10
})