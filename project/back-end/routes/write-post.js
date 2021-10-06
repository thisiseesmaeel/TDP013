var express = require('express');
var router = express.Router();
const { use } = require('.');
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";

/* GET users listing. */
router.post('/', function(req, res, next) {
  const {myUsername, loggedInID, destUsername, post} = req.body;
  if(typeof(myUsername) != "string" || typeof(loggedInID) != "number" || typeof(destUsername) != "string" || typeof(post) != "string")
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
            if(!result[0].friends.includes(destUsername) && result[0].username != destUsername){
                res.status(404).send("Not found!");
                database.close();    
            }else if(result[0].loggedInID == parseInt(loggedInID) && result[0].loggedInID != null){
                dbo.collection("users").updateOne({"username": destUsername}, { $push: {"posts": {"body": post, "owner": myUsername, "time": new Date()}}}
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
                database.close();
            }
        });
      });
  }
});
module.exports = router;