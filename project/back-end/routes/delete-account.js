var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";

/* Delete an account */
router.post('/', function(req, res) {
    const {myUsername, myPassword, loggedInID} = req.body;
    if(typeof(myUsername) != "string" || typeof(myPassword) != "string"|| typeof(loggedInID) != "number")
    { 
        res.status(400).send("Wrong parameter!");
    }
    else {
        MongoClient.connect(url, (error, database) => {
            if(error) { throw error; }
            let dbo = database.db("database");
            dbo.collection("users").find({"username": myUsername, "password": myPassword}).toArray((error, result) => {
                if(error){ throw error; }
                if(result.length > 1 ){
                    res.status(500).send("Internal Server Error");
                    database.close();
                }else if(result.length <= 0){
                    res.status(404).send("User not found");
                    database.close();
                }else if(result[0].loggedInID == loggedInID && result[0].loggedInID != null){
                    dbo.collection("users").deleteOne({"username": myUsername, "password": myPassword})
                    .then((obj) => {
                        res.status(200).send(obj);
                        database.close();
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