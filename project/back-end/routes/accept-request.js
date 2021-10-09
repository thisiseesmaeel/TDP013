var express = require('express');
const { use } = require('.');
var router = express.Router();
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";

/* Accept request. */
router.post('/', function(req, res, next) {
    const { myUsername, loggedInID, otherFirstname, otherLastname, otherUsername } = req.body;
    if(typeof(myUsername) != "string" || typeof(loggedInID) != "number" 
    || typeof(otherFirstname) != "string" || typeof(otherLastname) != "string" || typeof(otherUsername) != "string" 
    || myUsername == otherUsername)
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
                    dbo.collection("users").updateOne({"username": myUsername}, {$addToSet: {"friends": requestedUser}})
                    .then((obj) => {
                        dbo.collection("users").updateOne({"username": myUsername}, {$pull: {"receivedRequests": requestedUser}})
                        .then((obj1) => {
                            let myInfo  = {"firstname": result[0].firstname, "lastname": result[0].lastname, "username": myUsername};
                            dbo.collection("users").updateOne({"username": otherUsername}, {$addToSet: {"friends": myInfo}})
                            .then((obj2) => {
                                dbo.collection("users").updateOne({"username": otherUsername}, {$pull: {"sendRequests": myInfo}})
                                .then((obj3) =>{
                                    res.status(200).send("Friend added successfully!");
                                    database.close();
                                }); 
                        });

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