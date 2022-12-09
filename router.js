
var express = require('express')
const http = require("http");
var con = require('./database.js')
const app = express();
var router = express.Router()
const socketIO = require("socket.io");
const server = http.createServer(app);
const port = process.env.PORT || 8000;
const io = socketIO(server);

app.use(express.urlencoded());
app.io = io;


app.set("view engine", "ejs");

app.get('/', function (req, res, next) {
  let data = []
   con.query("SELECT name, message FROM questions WHERE user=?",["raj"],
    function (err, result, fields) {
      res.render('index' , {data : result})
    }
      
    
  );
 
 
 
})

app.post("/", function (req, res) {
  res.redirect("/");

  let data = req.body;
  insert_questions(
    data.name,
    data.question,
    data.question_title,
    data.question_footer,
    data.op1,
    data.op2,
    data.op3,
    data.op1_q,
    data.op2_q,
    data.op3_q,
    "raj"
  );

  console.log(data);
});





server.listen(port, function () {
  console.log("App running on *: " + port);
});

module.exports = {router , io}