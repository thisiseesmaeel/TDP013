var express = require('express');
const { use } = require('.');
var router = express.Router();
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";


/* Login to the profile. */
router.post('/', function(req, res, next) {
    const {username, password} = req.body;
    console.log(password)
    if(typeof(username) != "string" || typeof(password) != "string")
    { 
        res.status(400).send("Wrong parameter!");
    }
    MongoClient.connect(url, (error, database) => {
        if(error) { throw error; }
        let dbo = database.db("database");
        loggedInID = {"loggedInID": Math.floor(100000 + Math.random() * 900000)};
        dbo.collection("users").updateOne({"username": username, "password": password}, {$set : {"loggedInID": loggedInID["loggedInID"]}}, (error, result) => {
            if(error){ throw error; }
            if(result.matchedCount == 0){
                res.status(401).send("Wrong username or password!");
            }else{
                dbo.collection("users").find({"username": username}).toArray((error, res1)=> {
                let userProfile = {"firstname": res1[0].firstname, "lastname": res1[0].lastname, "email": res1[0].email
                , "friends": res1[0].friends, "posts": res1[0].posts, "sendRequests": res1[0].sendRequests,
                "receivedRequests": res1[0].receivedRequests, "loggedInID": loggedInID["loggedInID"]};
                res.status(200).send(userProfile);
                database.close();
                });
            }  
        });
    });

});

module.exports = router;


