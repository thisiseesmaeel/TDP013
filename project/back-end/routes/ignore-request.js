var express = require('express');
const { use } = require('.');
var router = express.Router();
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";

/* Accept request. */
router.post('/', function(req, res, next) {
    const { myUsername, loggedInID, otherFirstname, otherLastname, otherUsername } = req.body;
    if(typeof(myUsername) != "string" || typeof(loggedInID) != "number", typeof(otherUsername) != "string" || myUsername == otherUsername)
    { 
        res.status(400).send("Wrong parameter!");
    }else{
        MongoClient.connect(url, (error, database) => {
            if(error) { throw error; }
            let dbo = database.db("database");
            dbo.collection("users").find({"username": myUsername}).toArray((error, result) => {
                if(error){ throw error; }
                if(result[0].loggedInID == loggedInID && result[0].loggedInID != null)
                {
                    let requestedUser = {"firstname": otherFirstname, "lastname": otherLastname, "username": otherUsername};
                    dbo.collection("users").updateOne({"username": myUsername}, {$pull: {"receivedRequests": requestedUser}})
                    .then((obj) => {
                        let myInfo  = {"firstname": result[0].firstname, "lastname": result[0].lastname, "username": myUsername};
                        dbo.collection("users").updateOne({"username": otherUsername}, {$pull: {"sendRequests": myInfo}})
                        .then((obj) => {
                            res.status(200).send("You ignored the request successfully!");
                            database.close(); 
                        });
                    });          
                }else{
                    res.status(401).send("Unauthorized!");
                    database.close();
                }
            });
        
        });
    }
});

module.exports = router;