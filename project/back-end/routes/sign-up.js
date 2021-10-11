var express = require('express');
var router = express.Router();
const { use } = require('.');
const { MongoClient } = require('mongodb');
const e = require('express');
const url = "mongodb://localhost:27017/";

/* Sign-up to the system. */
router.post('/', function(req, res, next) {
    const {firstname, lastname, email, username, password} = req.body;
    if(typeof(firstname) != "string" || typeof(lastname) != "string" || typeof(email) !="string" || typeof(username) != "string" || typeof(password) != "string")   
    {
        res.status(400).send('respond with a resource');
    }
    MongoClient.connect(url, (error, database) => {
        if(error) { throw error; }
        let dbo = database.db("database");
        dbo.collection("users").find({"username": username}).toArray((error, result) => {
            if(error){ throw error;}
            if(result.length > 0){
                res.status(409).send("Username is already exists!");
                database.close();
            }else{
                loggedInID = {"loggedInID": Math.floor(100000 + Math.random() * 900000)};
                dbo.collection("users").insertOne({"firstname": firstname, "lastname": lastname, "email": email, "username": username, "password": password,
                "friends": [], "friendsLastModified": new Date(), "posts": [], "sendRequests": [], "receivedRequests": [], "loggedInID": loggedInID["loggedInID"]})
                .then((data) => {
                    let userProfile = {"firstname": firstname, "lastname": lastname, "email": email, "username": username
                    , "friends": [], "posts": [], "sendRequests": [], "receivedRequests": [], "loggedInID": loggedInID["loggedInID"]};
                    res.status(200).send(userProfile);
                    database.close();
                })
                .catch((error) => {
                    res.status(500).send("Internal Server Error");
                    database.close();
                });
            }
        });  
    });
});

module.exports = router;