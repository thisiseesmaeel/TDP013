let express = require('express');
let router = express.Router();
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";


/*Displaying friends post. */
router.post('/', function(req, res) {
    const { myUsername, loggedInID, destUsername } = req.body;
    if(typeof(myUsername) != "string" || typeof(loggedInID) != "number" || typeof(destUsername) != "string"){ 
        res.status(400).send("Wrong parameter!");
    }
    else{
        MongoClient.connect(url, (error, database) => {
            if(error) { throw error; }
            let dbo = database.db("database");
            dbo.collection("users").find({"username": myUsername}).toArray((err, result) => {
                if(err){ throw err; }
                if(result.length <= 0){
                    res.status(404).send("User not found!");
                    database.close();
                }
                else if(result.length > 1){
                        res.status(500).send("Internal Server Error!");
                        database.close();
                }
                else if(result[0].loggedInID == loggedInID && result[0].loggedInID != null){
                    let isMyFriend = false;
                    for (var i = 0; i < result[0].friends.length ; i++) {
                        if(result[0].friends[i].username === destUsername)
                        {
                            isMyFriend = true;
                            break;
                        }
                    }
                    if(myUsername === destUsername){
                        res.status(200).send(result[0].posts.sort((a,b) => (a.time < b.time) ? 1 : ((b.time < a.time) ? -1 : 0)));
                        database.close();
                    }
                    else if(isMyFriend){
                        dbo.collection("users").find({"username": destUsername}).toArray((err1, res1) => {
                            if(err1){ throw err1; }
                            res.status(200).send(res1[0].posts.sort((a,b) => (a.time < b.time) ? 1 : ((b.time < a.time) ? -1 : 0)));
                            database.close();
                        });
                    }
                    else{
                        res.status(401).send("You are not friend with this user!");
                        database.close();
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