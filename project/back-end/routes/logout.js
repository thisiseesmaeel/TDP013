let express = require('express');
const { use } = require('.');
let router = express.Router();
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";

/* Logout the profile. */
  
router.post('/', function(req, res) {
    const { myUsername, loggedInID} = req.body;
    if(typeof(myUsername) != "string" || typeof(loggedInID) != "number")
    { 
        res.status(400).send("Wrong parameter!");
    }
    else{
        MongoClient.connect(url, (error, database) => {
            if(error) { throw error; }
            let dbo = database.db("database");
            dbo.collection("users").find({"username": myUsername}).toArray((err, result) => {
                if(err){ throw err;}
                if(result.length <= 0 ){
                    res.status(404).send("User not found!");
                    database.close();
                }
                // else if(result.length <= 0){
                //         res.status(400).send("User not found!");
                //         database.close();
                // }
                else if(result[0].loggedInID == loggedInID && result[0].loggedInID != null){
                    dbo.collection("users").updateOne({"username": myUsername}, {$set : {"loggedInID": null}}, (error, res1) => {
                        if(error){ throw error; }
                        if(res1.length == 0){
                            res.status(204).send("No Content!");
                        }else{
                            res.status(200).send(res1);
                           
                        }
                        database.close();
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
