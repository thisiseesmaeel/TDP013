let express = require('express');
const { use } = require('.');
let router = express.Router();
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";


/*Displays friends post. */
router.post('/', function(req, res) {
    const {myUsername, loggedInID, friendUsername} = req.body;
    if(typeof(friendUsername) != "string" || typeof(loggedInID) != "number" || typeof(friendUsername) != "string" )
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
                    res.status(404).send("User not found!");
                    database.close();
                }
                else if(result.length > 1){
                    //
                    res.status(500).send("Internal Server Error!");
                    database.close();
                }
                else if(result[0].loggedInID == loggedInID && result[0].loggedInID != null){
                    let isMyFriend = false; 
                    for (let i = 0; i < result[0].friends.length ; i++) {
                        if(result[0].friends[i].username === friendUsername)
                        {
                            isMyFriend = true;
                            break;
                        }
                    }
                    if(!isMyFriend)
                    {
                        res.status(404).send("Friend not found!");
                        database.close();
                    }
                    else{
                        dbo.collection("users").find({"username": friendUsername}).toArray((error, res1) => {
                            if(error){ throw error; }
                            if(res1.length <= 0){
                                res.status(404).send("Friend not found!");
                                database.close();
                            }else{
                                const sortedPosts = res1[0].posts.sort((a,b) => (a.time < b.time) ? 1 : ((b.time < a.time) ? -1 : 0))
                                const friendProfile = {"firstname": res1[0].firstname, "lastname": res1[0].lastname, "username": friendUsername, "posts": sortedPosts}
                                res.status(200).send(friendProfile);
                                database.close();      
                            }  
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