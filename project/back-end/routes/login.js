let express = require('express');
//const { use } = require('.');
let router = express.Router();
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";


/* Login to the profile. */
router.post('/', function(req, res) {
    const {username, password} = req.body;
    if(typeof(username) != "string" || typeof(password) != "string")
    { 
        res.status(400).send("Wrong parameter!");
    }
    else{
        MongoClient.connect(url, (error, database) => {
            if(error) { throw error; }
            let dbo = database.db("database");
            loggedInID = {"loggedInID": Math.floor(100000 + Math.random() * 900000)};
            dbo.collection("users").updateOne({"username": username, "password": password}, {$set : {"loggedInID": loggedInID["loggedInID"]}}, (error, result) => {
                if(error){ throw error; }
                if(result.matchedCount == 0){
                    res.status(401).send("Wrong username or password!");
                }
                else{
                    dbo.collection("users").find({"username": username}).toArray((err, res1)=> {
                        if(err){ throw err; }
                        const posts = res1[0].posts.sort((a,b) => (a.time < b.time) ? 1 : ((b.time < a.time) ? -1 : 0))
                        let userProfile = {"firstname": res1[0].firstname, "lastname": res1[0].lastname, "username": res1[0].username ,"email": res1[0].email
                        , "friends": res1[0].friends, "posts": posts, "sendRequests": res1[0].sendRequests,
                        "receivedRequests": res1[0].receivedRequests, "loggedInID": loggedInID["loggedInID"]};
                        res.status(200).send(userProfile);
                        database.close();
                    });
                }  
            });
        });
    }
});

module.exports = router;