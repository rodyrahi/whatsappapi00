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


function find_op(q, msg ) {

  con.query('SELECT * FROM questions', function (err, rows, fields) {


    rows.forEach(element => {
      if (element["name"] === q) {
        let button = new Buttons(element["message"], [{ body: element["op1"] }, { body: element["op2"] }, { body: element["op3"] }], element["title"], element["footer"]);
        client.sendMessage(msg.from, button);
        return
      }
    });
 

  });
 


}
function print(callback) {  
  let code = "yes"
  return callback(code);
}
print(function(result){

  console.log(result);
  //rest of your code goes in here
});

function get_data(call){
      
  var sql = "SELECT name ,op1 , op2  , op3 , op1_q , op2_q , op3_q FROM questions";

  con.query(sql, function(err, results ){
        if (err){ 
          throw err;
        }

        return call(results);
    })

 
}



function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}


client.on("message", async (msg) => {
  console.log("MESSAGE RECEIVED", msg.body);

  let found_question = false



   let found = get_data( function (results) {
  
    results.forEach(element => {
    
        if (getKeyByValue(element, msg.body ) === 'op1') {
        let q = element["op1_q"]
        find_op(q, msg)
        found_question = true
        return true
       
        }
        else if (getKeyByValue(element, msg.body ) === 'op1') {
          let q = element["op2_q"]
          find_op(q, msg)
          found_question = true
          return true
          // console.log(q);
          }
        else if (getKeyByValue(element, msg.body ) === 'op1') {
            let q = element["op3_q"]
            find_op(q, msg)
            found_question = true
            return true
            // console.log(q);
            }
        else{
          // console.log(false);
          // return false
        }
      return true
          
    });

    if (! found_question ) {


      var sql = "SELECT * FROM questions WHERE user = 'raj' AND isfirst = 'yes'";

      con.query(sql, function(err, results ){
            if (err){ 
              throw err;
            }
            console.log( results[0]["op1"] );
      let button = new Buttons(results[0]["message"], [{ body: results[0]["op1"] }, { body: results[0]["op2"] }, { body: results[0]["op3"] }], results[0]["tittle"], results[0]["footer"]);
      client.sendMessage(msg.from, button);
    })
      }
  });

    console.log(found);

 
  })
