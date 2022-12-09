
const EventEmitter = require('events')
var express = require('express')
const http = require("http");
var con = require('./database.js')
const app = express();
var router = express.Router()
const socketIO = require("socket.io");
const server = http.createServer(app);
const port = process.env.PORT || 8000;
const io = socketIO(server);
const emitter = new EventEmitter();



const {Client,LocalAuth, MessageMedia , Buttons} = require("whatsapp-web.js");
const client = new Client({
  restartOnAuthFail: true,
  puppeteer: {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--single-process", // <- this one doesn't works in Windows
      "--disable-gpu",
      "--use-gl=egl",
    ],
  },
  authStrategy: new LocalAuth(),
});

client.initialize();


app.use(express.urlencoded());
app.io = io;


app.set("view engine", "ejs");

// app.use('/', (req, res) => {
//   let code;
client.on("qr", (qr) => {
  console.log("QR RECEIVED", qr);
  console.log(qr);
  var sql =
  "INSERT INTO client (qr) VALUES ?";
  var values = [[qr]];
  con.query(sql, [values], function (err, result) {
  if (err) throw err;
  console.log("Number of records inserted: " + result.affectedRows);
});


});

// });

app.get('/', function (req, res, next) {
  let code
   con.query("SELECT name, message FROM questions WHERE user=?",["raj"],
    function (err, result, fields) {
      res.render('index' , {data : result , qr:code})
    }
  );
})


app.post("/", function (req, res) {
  res.redirect("/");
  let data = req.body;
  insert_questions(data.name,data.question,data.question_title,data.question_footer,
    data.op1,data.op2,data.op3,data.op1_q,data.op2_q,data.op3_q,"raj");
  console.log(data);
});

function insert_questions(
  name,tittle,message,footer,op1,op2,op3,op1_q,op2_q,op3_q,user) {
  var sql =
    "INSERT INTO questions (name , message , tittle ,footer , op1 , op2 , op3 , op1_q , op2_q , op3_q , user ) VALUES ?";
  var values = [[name, message, tittle, footer, op1, op2, op3, op1_q, op2_q, op3_q, user],];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
}


io.on("connection", function (socket) {
  
  client.on("ready", () => {
    socket.emit("ready", "Hii bot is ready");
    console.log("Client is ready!");
  });
});


server.listen(port, function () {
  console.log("App running on *: " + port);
});

module.exports = {router , io , client}