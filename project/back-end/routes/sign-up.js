var express = require('express');
var router = express.Router();
const { use } = require('.');
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";

/* Sign-up to the system. */
router.post('/', function(req, res, next) {
    const {firstname, lastname, email, username, password} = req.body;
    if(typeof(firstname) != "string" || typeof(lastname) != "string" || typeof(email) !="string" || typeof(username) != "string" || typeof(password) != "string")   
    {
        res.status(400).send('respond with a resource');
    }
    MongoClient.connect(url, (error, database) => {
        if(error) { throw error; }
        let dbo = database.db("database");
        loggedInID = {"loggedInID": Math.floor(100000 + Math.random() * 900000)};
        dbo.collection("users").insertOne({"firstname": firstname, "lastname": lastname, "email": email, "username": username, "password": password,
        "friends": [], "posts": [], "sendRequests": [], "receivedRequests": [], "loggedInID": loggedInID["loggedInID"]})
        .then((data) => {
            let userProfile = {"firstname": firstname, "lastname": lastname, "email": email
            , "friends": [], "posts": [], "sendRequests": [], "receiveRequests": [], "loggedInID": loggedInID["loggedInID"]};
            res.status(200).send(userProfile);
            database.close();
        })
        .catch((error) => {
            res.status(500).send("Internal Server Error");
            database.close();
        });
        
    });
});


module.exports = router;


// app.post('/save', function (req, res) {
//     const { message, status } = req.body;
//     let validStatus = false;
//     let validMessage = false;
//     if(status == "read" || status == "unread") 
//         validStatus = true;
//     if((message.length > 0 && message.length  <= 140) && typeof(message) == "string")
//         validMessage = true;
        
//     if(!validMessage || !validStatus)
//     {
//         res.status(400).send("Wrong parameter!");        
//     }
//     else{
//         sanitize(message);
//         sanitize(status);
//         MongoClient.connect(url, (err, database) => {
//             if(err) { throw err; }
//             let dbo = database.db("tdp013");
	   
//             dbo.collection("messages").insertOne({"message" : message, "status" : status, "time": new Date()})
// 		.then((data) => {
// 		    res.send(data.insertedId);
//                     dbs.close();
//             })
//             .catch((err) => {
//                 console.log("Something went wrong..." + err)
//                 database.close();
//             })
            
//         });
// 	//res.send("Fungerar"); 
//     }
// });

