var express = require('express');
const { use } = require('.');
var router = express.Router();
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";

router.post('/', function(req, res, next) {
    const {myUsername, loggedInID, user} = req.body;
    const userArr = user.split(" ");
    firstname = userArr[0];
    lastname = userArr[1];
    if(typeof(myUsername) != "string" || typeof(loggedInID) != "number" || typeof(user) != "string")
    { 
        res.status(400).send("Wrong parameter!");
    }
    MongoClient.connect(url, (error, database) => {
        if(error) { throw error; }
        let dbo = database.db("database");
        dbo.collection("users").find({"username": myUsername}).toArray((error, result) => {
            if(error){ throw error; }
                if(result.length > 1){ res.status(500).send("Internal Server Error");}
                if(result[0].loggedInID == loggedInID && result[0].loggedInID != null){
                    let myFriends = result[0].friends;
                    dbo.collection("users").find({"firstname": new RegExp(firstname, 'i'), "lastname": new RegExp(lastname, 'i')}).toArray((error, searchResult) => {
                        if(error){ throw error; }
                        if(searchResult.length == 0){
                            res.status(404).send("Not found!");
                        }else{
                            let foundUsers = [];
                            searchResult.forEach((profile) => {
                                let isMyFriend = false; 
                                for (var i = 0; i < myFriends.length ; i++) {
                                        if(myFriends[i].username === profile.username)
                                        {
                                            isMyFriend = true;
                                            break;
                                        }
                                    }
                                let temp = { "firstname": profile.firstname, "lastname": profile.lastname, "username": profile.username }
                                if(!isMyFriend) { foundUsers.push(temp) }

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
});

module.exports = router;


// let isMyFriend = false; 
// for (var i = 0; i < result[0].friends.length ; i++) {
//         if(result[0].friends[i].username === destUsername)
//         {
//             isMyFriend = true;
//             break;
//         }
// }