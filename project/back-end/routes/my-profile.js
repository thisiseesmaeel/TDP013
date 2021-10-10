var express = require('express');
const { use } = require('.');
var router = express.Router();
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";


/* Sends back critical information about my profile. */
router.post('/', function(req, res, next) {
    const {myUsername, loggedInID} = req.body;
    if(typeof(myUsername) != "string" || typeof(loggedInID) != "number")
    { 
        res.status(400).send("Wrong parameter!");
    
    }
    else{
        MongoClient.connect(url, (error, database) => {
            if(error) { throw error; }
            let dbo = database.db("database");
            dbo.collection("users").find({"username": myUsername, "loggedInID": loggedInID}).toArray((error, result) => {
                if(error){ throw error; }
                if(result.length <= 0){
                    res.status(401).send("Unauthorized!");
                    database.close();
                }else{
                    const posts = result[0].posts.sort((a,b) => (a.time < b.time) ? 1 : ((b.time < a.time) ? -1 : 0))
                    let userProfile = {"firstname": result[0].firstname, "lastname": result[0].lastname, "username": result[0].username ,"email": result[0].email
                    , "friends": result[0].friends, "posts": posts, "sendRequests": result[0].sendRequests,
                    "receivedRequests": result[0].receivedRequests, "loggedInID": loggedInID};
                    res.status(200).send(userProfile);
                    database.close();
                }  
            });
        });
    }
});

module.exports = router;