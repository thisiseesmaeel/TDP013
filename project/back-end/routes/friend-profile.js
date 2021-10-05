var express = require('express');
const { use } = require('.');
var router = express.Router();
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";


/*Displaying friends post. */
router.get('/', function(req, res, next) {
    const {myUsername, friendUsername} = req.body;
    if(typeof(friendUsername) != "string")
    { 
        res.status(400).send("Wrong parameter!");
    }
    else{    
        MongoClient.connect(url, (error, database) => {
            if(error) { throw error; }
            let dbo = database.db("database");
            dbo.collection("users").find({"username": friendUsername}).toArray((error, result) => {
                if(error){ throw error; }
                if(result.length == 0){
                    res.status(500).send("Internal Server Error!");
                }else{
                    res.status(200).send(result[0].posts);
                  
                }
                database.close();
            });
        });
    }
});

module.exports = router;
