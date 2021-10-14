let express = require('express');
let router = express.Router();
const { use } = require('.');
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";

/* Sign-up to the system. */
router.post('/', function(req, res) {
    const {firstname, lastname, email, username, password} = req.body;
    if(typeof(firstname) != "string" || typeof(lastname) != "string" || typeof(email) !="string" || typeof(username) != "string" || typeof(password) != "string"
        || firstname.length <= 0 || lastname.length <= 0 || email.length <= 0 || username.length <= 0 || password.length <= 0 ){
        res.status(400).send('Bad request.');
    }
    else if(!firstname.match(/^[a-zA-ZäöåÄÖÅ]+$/) || !lastname.match(/^[a-zA-ZäöåÄÖÅ]+$/) || !email.match(/^[A-Za-z . 0-9 ]+@[A-Z a-z .]+$/) 
        || !username.match(/^[A-Z a-z]+[A-Z a-z 0-9 . \- _]+[A-Z a-z 0-9]$/) || !password.match(/\S{8,16}/)) {
            res.status(400).send('Bad request.');
    }
    else{
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
                    "friends": [], "posts": [], "sendRequests": [], "receivedRequests": [], "loggedInID": loggedInID["loggedInID"]})
                    .then(() => {
                        let userProfile = {"firstname": firstname, "lastname": lastname, "email": email, "username": username
                        , "friends": [], "posts": [], "sendRequests": [], "receivedRequests": [], "loggedInID": loggedInID["loggedInID"]};
                        res.status(200).send(userProfile);
                        database.close();
                    })
                    .catch(() => {
                        res.status(500).send("Internal Server Error");
                        database.close();
                    });
                }
            });  
        });
    }
});

module.exports = router;