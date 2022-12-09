
var con = require('./database.js')
var {rou , io} = require('./router.js')









let data_n = ["q1"];
let data_m = ["hey"];
let data_t = ["hello"];
let data_f = ["please"];
let data_op = ["yes"];
let data_opq = ["q2"];



var list = [];
var obj = {};







const {
  Client,
  MessageMedia,
  ClientInfo,
  Buttons,
  LocalAuth,
} = require("whatsapp-web.js");

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

io.on("connection", function (socket) {
  let code;

  client.on("qr", (qr) => {
    console.log("QR RECEIVED", qr);
    code = qr;
    code.toDataURL(qr, (err, url) => {
      socket.emit("tx", url);
    });
  });

  client.on("ready", () => {
    socket.emit("ready", "Hii bot is ready");
    console.log("Client is ready!");
  });
});

//assuming we only have 1 chat

// function find_question(m)
// {
//   list.forEach((element) => {
//     if (m === element[0].message) {
//       console.log(element[0].message);
//       return true
//     }

//   });

//    return false
// }

function find_question(q, m) {
  data_n.forEach((element) => {});
  const found = (element) => {
    if (element === q) {
      let i = data_n.indexOf(element);
      console.log(data_m[i]);
      let button = new Buttons(
        data_m[i],
        [{ body: data_op[i] }, { body: data_op2[i] }, { body: "bt3" }],
        data_t[i],
        data_f[i]
      );
      client.sendMessage(m.from, button);

      // m.reply(data_m[i]);
    }
  };
  return data_n.some(found);
}

function find_op(m) {
  // checks whether an element is even
  const found = (element) => {
    if (element === m.body) {
      // element === m.body;
      let i = data_op.indexOf(element);
      let q = data_opq[i];
      console.log(q);
      find_question(q, m);
      // m.reply(data_m[i]);
      return true;
    }
  };

  return data_op.some(found);
}

client.on("message", async (msg) => {
  console.log("MESSAGE RECEIVED", msg.body);

  message;

  // let mes = " ";

  // client
  // .getChats()
  // .then((chats) => chats[0].fetchMessages()) //assuming we only have 1 chat
  // .then((messages) => {
  //   messages.forEach((element) => {
  //         if (element.fromMe) {
  //             mes = element.body
  //             console.log(mes);

  //             return true

  //         }
  //   });
  // });

  // find_op(msg);

  // let button = new Buttons('Button body',[{body:'hello im raj'},{body:'bt2'},{body:'bt3'}],'hey everyone','chose please');
  // client.sendMessage(msg.from, button);

  // if (!find_op(msg)) {
  //   let button = new Buttons(
  //     data_m[0],
  //     [
  //       { body: data_op[0] },
  //       { body: data_op2[0] },
  //       { body: "Try clicking me", url: "www.google.in" },
  //     ],
  //     data_t[0],
  //     data_f[0]
  //   );
  //   client.sendMessage(msg.from, button);
  //   }
});



// app.get("/", function (req, res) {
//   let data = []
//   con.query("SELECT name, message FROM questions WHERE user=?",["raj"],
//   function (err, result, fields ) {
//     if (err) throw err;
    
//     result.forEach(element => {
//         Object.values(element)[0]
       
//        console.log(data);
//     });
    
//     }
//   );
//   res.render("index", {
//     data: data_n,
//     message: data_m,
//     user_data: data,
//   });
// });
// var mysql = require("mysql");
const { name } = require("browser-sync");

// var con = mysql.createConnection({
//   host: "181.215.79.245",
//   user: "rajvendra_admin",
//   password: "Kamingo@1111",
//   database: "admin_sugardb",
// });


function insert_questions(
  name,
  tittle,
  message,
  footer,
  op1,
  op2,
  op3,
  op1_q,
  op2_q,
  op3_q,
  user
) {
  var sql =
    "INSERT INTO questions (name , message , tittle ,footer , op1 , op2 , op3 , op1_q , op2_q , op3_q , user ) VALUES ?";
  var values = [
    [name, message, tittle, footer, op1, op2, op3, op1_q, op1_q, op3_q, user],
  ];

  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
}





