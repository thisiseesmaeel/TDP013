let express = require('express');
let router = express.Router();
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";

/* show friend list. */
router.post('/', function(req, res) {
    const { myUsername, loggedInID} = req.body;
    if(typeof(myUsername) != "string" || typeof(loggedInID) != "number"){ 
        res.status(400).send("Wrong parameter!");
    }
    else{
        MongoClient.connect(url,(error, database) => {
            if(error) { throw error; }
            let dbo = database.db("database");
            dbo.collection("users").find({"username": myUsername}).toArray((err, result) => {
                if(err){ throw err; }
                if(result.length <= 0){
                    res.status(404).send("Not found");
                    database.close();
                }
                else if(result.length > 1){
                    res.status(500).send("Internal Server Error!");
                    database.close();
                }
                else if(result[0].loggedInID == loggedInID && result[0].loggedInID != null)
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