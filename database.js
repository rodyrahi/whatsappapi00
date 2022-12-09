var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "181.215.79.245",
  user: "rajvendra_admin",
  password: "Kamingo@1111",
  database: "admin_sugardb",
});
connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  
});
module.exports = connection;
