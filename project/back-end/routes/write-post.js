let express = require('express');
let router = express.Router();
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";

/* Posting some message. */
router.post('/', function(req, res, next) {
  const {myUsername, loggedInID, destUsername, message} = req.body;
  if(typeof(myUsername) != "string" || typeof(loggedInID) != "number" || typeof(destUsername) != "string" || typeof(message) != "string")
  { 
    res.status(400).send("Wrong parameter!");
  }
  else{
    MongoClient.connect(url, (error, database) => {
        if(error) { throw error; }
        let dbo = database.db("database");
        dbo.collection("users").find({"username": myUsername}).toArray((err, result) => {
            if(err){ throw err; }
            if(result.length <= 0){
                res.status(404).send("Not found");
                database.close();
            }
            else if(result.length > 1){
                res.status(500).send("Internal Server Error!");
                database.close();
            }
            else if(result[0].loggedInID == parseInt(loggedInID) && result[0].loggedInID != null){
                let isMyFriend = false; 
                for (var i = 0; i < result[0].friends.length ; i++) {
                    if(result[0].friends[i].username === destUsername)
                    {
                        isMyFriend = true;
                        break;
                    }
                }
                if(!isMyFriend && result[0].username != destUsername){
                    res.status(404).send("User Not found!");
                    database.close();    
                }
                else{
                    const post = {"body": message, "ownerFirstname": result[0].firstname, "ownerLastname": result[0].lastname, "ownerUsername": myUsername, "time": new Date()}
                    dbo.collection("users").updateOne({"username": destUsername}, { $push: {"posts": post}})
                    .then((res1) => {
                        if(res1.matchedCount == 0){
                            res.status(404).send("User not found");
                        }
                        else{
                            res.status(200).send(post);
                        }
                        database.close();
                    });
                }
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