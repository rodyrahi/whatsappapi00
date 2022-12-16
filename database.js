var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "181.215.79.245",
  user: "raj_sugardb",
  password: "Kamingo@11",
  database: "raj_sugardb",
  charset:"utf8mb4"
});
connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  
});
module.exports = connection;
