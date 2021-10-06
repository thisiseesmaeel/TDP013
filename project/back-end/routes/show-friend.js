var express = require('express');
const { use } = require('.');
var router = express.Router();
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";

/* show friend list. */
router.get('/', function(req, res, next) {
    const { myUsername, loggedInID} = req.body;
    if(typeof(myUsername) != "string" || typeof(loggedInID) != "number")
    { 
        res.status(400).send("Wrong parameter!");
    }else{
        MongoClient.connect(url,(error, database) => {
            if(error) { throw error; }
            let dbo = database.db("database");
            dbo.collection("users").find({"username": myUsername}).toArray((error, result) => {
                if(error){ throw error; }
                if(result[0].loggedInID == loggedInID && result[0].loggedInID != null)
                {
                    res.status(200).send(result[0].friends);
                    database.close();
                }else{
                    res.status(401).send("Unauthorized!");
                    database.close();
                }
            });
        
        });
    }
});

module.exports = router;
