let express = require('express');
let router = express.Router();
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";

/* Find a user profile */
router.post('/', function(req, res) {
    const {myUsername, loggedInID, user} = req.body;
    if(typeof(myUsername) != "string" || typeof(loggedInID) != "number" || typeof(user) != "string")
    { 
        res.status(400).send("Wrong parameter!");
    }
    else {
        const userArr = user.split(" ");
        let firstname = userArr[0];
        let lastname = userArr[1];

        MongoClient.connect(url, (error, database) => {
            if(error) { throw error; }
            let dbo = database.db("database");
            dbo.collection("users").find({"username": myUsername}).toArray((error, result) => {
                if(error){ throw error; }
                if(result.length > 1 ){
                    res.status(500).send("Internal Server Error");
                    database.close();
                }else if(result.length <= 0){
                    res.status(404).send("User not found");
                    database.close();
                }else if(result[0].loggedInID == loggedInID && result[0].loggedInID != null){
                    let myFriends = result[0].friends;
                    dbo.collection("users").find({"firstname": new RegExp(firstname, 'i'), "lastname": new RegExp(lastname, 'i')}).toArray((error, searchResult) => {
                        if(error){ throw error; }
                        if(searchResult.length == 0){
                            res.status(404).send("User not found!");
                            database.close();
                        }else{
                            let foundUsers = [];
                            searchResult.forEach((profile) => {
                                let isMyFriend = false;
                                for (let i = 0; i < myFriends.length ; i++) {
                                        if(myFriends[i].username === profile.username)
                                        {
                                            isMyFriend = true;
                                            break;
                                        }
                                    }
                                let temp = { "firstname": profile.firstname, "lastname": profile.lastname, "username": profile.username }
                                if(!isMyFriend && profile.username != myUsername ) { foundUsers.push(temp) }

                            });
                            if(foundUsers.length <= 0){
                                res.status(404).send("Not found!");
                                database.close();
                            }
                            else{
                                res.status(200).send(foundUsers);
                                database.close();
                            }
                            
                        }
                        
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