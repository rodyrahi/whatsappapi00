var mysql = require("mysql");


var connection = mysql.createConnection({
  host: "165.232.151.6",
  user: "raj",
  password: "Kamingo@11",
  database: "raj_sugardb",
  charset:"utf8mb4",
  timeout: 60000

});
connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  
});
module.exports = connection;
