var express = require('express');
var router = express.Router();
const { use } = require('.');
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";

/* GET users listing. */
router.post('/', function(req, res, next) {
  const {myUsername, loggedInID, friendUsername, post} = req.body;
  if(typeof(post) != "string")
  { 
      res.status(400).send("Wrong parameter!");
  }
  else{
    MongoClient.connect(url, (error, database) => {
        if(error) { throw error; }
        let dbo = database.db("database");
        // legtimera att allt stämmer med användaren
        dbo.collection("users").find({"username": myUsername}).toArray((error, result) => {
            if(error){ throw error; }
            if(result[0].loggedInID == parseInt(loggedInID) && result[0].loggedInID != null){
                dbo.collection("users").updateOne({"username": friendUsername}, { $push: {"posts": {"body": post, "owner": myUsername, "time": new Date()}}}
                  ,(error, result) => {
                    if(error){ throw error; }
                    if(result.length == 0){
                        res.status(401).send("Wrong username or password!");
                    }else{
                        res.status(200).send(result);
                    }
                    database.close();
                });
            }
            else{
                res.status(401).send("Unauthorized!");
            }
        });
      });
  }
});
module.exports = router;




// app.post('/save', function (req, res) {
//   const { message, status } = req.body;
//   let validStatus = false;
//   let validMessage = false;
//   if(status == "read" || status == "unread") 
//       validStatus = true;
//   if((message.length > 0 && message.length  <= 140) && typeof(message) == "string")
//       validMessage = true;
      
//   if(!validMessage || !validStatus)
//   {
//       res.status(400).send("Wrong parameter!");        
//   }
//   else{
//       sanitize(message);
//       sanitize(status);
//       MongoClient.connect(url, (err, dbs) => {
//           if(err) { throw err; }
//           let dbo = dbs.db("tdp013");
   
//           dbo.collection("messages").insertOne({"message" : message, "status" : status, "time": new Date()})
//   .then((data) => {
//       res.send(data.insertedId);
//                   dbs.close();
//           })
//           .catch((err) => {
//               console.log("Something went wrong..." + err)
//               dbs.close();
//           })
          
//       });
// //res.send("Fungerar"); 
//   }
// });
