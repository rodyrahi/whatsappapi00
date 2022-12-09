var con = require("./database.js");
var { rou, io , client } = require("./router.js");

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
  con.query('SELECT op1 , op2  , op3 FROM questions', function (err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows[0].solution);
  });



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





