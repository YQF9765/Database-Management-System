const mysql2 = require("mysql2")

module.exports = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: 3306,
  database: 'user',
  connectionLimit: 10
})