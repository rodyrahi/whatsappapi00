var con = require("./database.js");
var { rou, io, client } = require("./router.js");

const {
  Client,
  MessageMedia,
  ClientInfo,
  Buttons,
  LocalAuth,
} = require("whatsapp-web.js");
const { localsName } = require("ejs");

// function find_op(q, msg ) {

//   con.query('SELECT * FROM questions', function (err, rows, fields) {

//     rows.forEach(element => {
//       if (element["name"] === q) {

//         if (element["type"]=== 'file') {
//           console.log(element['op1_q']);
//             send_message(element['op1_q'] , msg)

//         } else {
//           if (element["op3"] === '') {
//             let button = new Buttons(element["message"], [{ body: element["op1"] }, { body: element["op2"] }], element["title"], element["footer"]);
//             client.sendMessage(msg.from, button);
//             return
//           }
//           else{
//             let button = new Buttons(element["message"], [{ body: element["op1"] }, { body: element["op2"] }, { body: element["op3"] }], element["title"], element["footer"]);
//             client.sendMessage(msg.from, button);
//             return
//           }
//         }

//       }
//     });

//   });

// }

function next_message(q, msg) {
  con.query(
    `SELECT * FROM questions WHERE name="${q}" AND user='raj'`,
    function (err, element, fields) {
      console.log(element[0]["type"]);
      if (element[0]["type"] === "file") {
        const media = MessageMedia.fromFilePath(element[0]["message"]);
        client.sendMessage(msg.from, media);
        console.log(element[0]['op1_q']);
        next_message(element[0]['op1_q'] , msg)
      } else {
        
        let button = new Buttons(
          element[0]["message"],
          [
            { body: element[0]["op1"] },
            { body: element[0]["op2"] },
            { body: element[0]["op3"] },
          ],
          element[0]["title"],
          element[0]["footer"]
        );
        client.sendMessage(msg.from, button);
      }
    }
  );
}

function send_message(q, msg) {
  con.query(
    `SELECT * FROM questions WHERE name="${q}" AND user='raj'`,
    function (err, element, fields) {
      if (element[0]["type"] === "file") {
        const media = MessageMedia.fromFilePath(element[0]["message"]);
        client.sendMessage(msg.from, media);
       console.log(element[0]['op1_q']);
      next_message(element[0]['op1_q'] , msg)
      } else {
        let button = new Buttons(
          element[0]["message"],
          [
            { body: element[0]["op1"] },
            { body: element[0]["op2"] },
            { body: element[0]["op3"] },
          ],
          element[0]["title"],
          element[0]["footer"]
        );
        client.sendMessage(msg.from, button);
      }
    }
  );
}

// function get_data(call){

//   var sql = "SELECT name ,op1 , op2  , op3 , op1_q , op2_q , op3_q FROM questions";

//   con.query(sql, function(err, results ){
//         if (err){
//           throw err;
//         }

//         return call(results);
//     })

// }

// function getKeyByValue(object, value) {
//   return Object.keys(object).find(key => object[key] === value);
// }

client.on("message", async (msg) => {
  console.log("MESSAGE RECEIVED", msg.body);
  let found_question = false;

  var sql = "SELECT* FROM questions WHERE user='raj'";

  con.query(sql, function (err, results) {
    if (err) {
      throw err;
    }
    results.forEach((element) => {
      if (element["op1"] === msg.body) {
        found_question = true;

        send_message(element["op1_q"], msg);

        return true;
      } else {
      }
    });

    // let found_question = false

    //  let found = get_data( function (results) {

    //   results.forEach(element => {

    //       if (element['type'] === 'file') {
    //         send_message(element['op1'] , msg)
    //       } else {

    //       if (getKeyByValue(element, msg.body ) === 'op1') {
    //       let q = element["op1_q"]
    //       find_op(q, msg)
    //       found_question = true
    //       return true

    //       }
    //       else if (getKeyByValue(element, msg.body ) === 'op1') {
    //         let q = element["op2_q"]
    //         find_op(q, msg)
    //         found_question = true
    //         return true
    //         // console.log(q);
    //         }
    //       else if (getKeyByValue(element, msg.body ) === 'op1') {
    //           let q = element["op3_q"]
    //           find_op(q, msg)
    //           found_question = true
    //           return true
    //           // console.log(q);
    //           }
    //       else{
    //         // console.log(false);
    //         // return false
    //       }
    //     }
    //     return true

    console.log(found_question);

    if (!found_question) {
      console.log("this");

      var sql =
        "SELECT * FROM questions WHERE user = 'raj' AND isfirst = 'yes'";

      con.query(sql, function (err, results) {
        if (err) {
          throw err;
        }
        if (results[0]["op3"] === "") {
          let button = new Buttons(
            results[0]["message"],
            [{ body: results[0]["op1"] }, { body: results[0]["op2"] }],
            results[0]["tittle"],
            results[0]["footer"]
          );
          client.sendMessage(msg.from, button);
        } else {
          let button = new Buttons(
            results[0]["message"],
            [
              { body: results[0]["op1"] },
              { body: results[0]["op2"] },
              { body: results[0]["op3"] },
            ],
            results[0]["tittle"],
            results[0]["footer"]
          );
          client.sendMessage(msg.from, button);
        }
      });
    }
  });
});
