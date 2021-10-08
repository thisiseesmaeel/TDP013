var express = require('express');
const { use } = require('.');
var router = express.Router();
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";


/*Displaying friends post. */
router.get('/', function(req, res, next) {
    const {myUsername, loggedInID, friendUsername} = req.body;
    if(typeof(friendUsername) != "string" || typeof(loggedInID) != "number" || typeof(friendUsername) != "string" )
    { 
        res.status(400).send("Wrong parameter!");
    }
    else{    
        MongoClient.connect(url, (error, database) => {
            if(error) { throw error; }
            let dbo = database.db("database");
            dbo.collection("users").find({"username": myUsername}).toArray((error, result) => {
                if(error){ throw error; }
                let isMyFriend = false; 
                for (var i = 0; i < result[0].friends.length ; i++) {
                    if(result[0].friends[i].username === friendUsername)
                    {
                        isMyFriend = true;
                        break;
                    }
                    
                }
                if(result.length <= 0){
                    res.status(404).send("User not found!");
                    database.close();
                }
                else if(!isMyFriend)
                {
                    res.status(404).send("Friend not found!");
                    database.close();
                }else if(result[0].loggedInID == loggedInID && result[0].loggedInID != null){
                    
                    dbo.collection("users").find({"username": friendUsername}).toArray((error, res1) => {
                        if(error){ throw error; }
                        if(res1.length <= 0){
                            res.status(404).send("Friend not found!");
                            database.close();
                        }else{
                            res.status(200).send(res1[0].posts);
                            database.close();      
                        }  
                    });
                }else{
                    res.status(401).send("Unauthorized!");
                    database.close();
                }

            });
            
        });
    }
});

module.exports = router;
