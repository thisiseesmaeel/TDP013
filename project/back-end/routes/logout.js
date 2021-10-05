var express = require('express');
const { use } = require('.');
var router = express.Router();
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";

/* Logout the profile. */
  
router.get('/', function(req, res, next) {
    const { myUsername } = req.body;
    if(typeof(myUsername) != "string")
    { 
        res.status(400).send("Wrong parameter!");
    }
    else{
        MongoClient.connect(url, (error, database) => {
            if(error) { throw error; }
            let dbo = database.db("database");
    
            dbo.collection("users").updateOne({"username": myUsername}, {$set : {"loggedInID": null}}, (error, result) => {
                if(error){ throw error; }
                if(result.length == 0){
                    res.status(204).send("No Content!");
                }else{
                    res.status(200).send(result);
                   
                }
                database.close();
            });
        });
    }
});

module.exports = router;
