var express = require('express');
const { use } = require('.');
var router = express.Router();
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";


/* Login to the profile. */
router.get('/', function(req, res, next) {
    const {username, password} = req.body;
    if(typeof(username) != "string" || typeof(password) != "string")
    { 
        res.status(400).send("Wrong parameter!");
    }
    MongoClient.connect(url, (error, database) => {
        if(error) { throw errorr; }
        let dbo = database.db("database");

        dbo.collection("users").find({"username": username, "password": password}).toArray((error, result) => {
            if(error){ throw error; }
            if(result.length == 0){
                res.status(401).send("Wrong username or password!");
            }else{
                res.status(200).send(result);
            }
            database.close();
        });
    });

});

module.exports = router;


