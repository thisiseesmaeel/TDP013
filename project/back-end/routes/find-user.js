var express = require('express');
const { use } = require('.');
var router = express.Router();
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";

router.get('/', function(req, res, next) {
    const {me, user} = req.body;
    const userArr = user.split(" ");
    firstname = userArr[0];
    lastname = userArr[1];
    if(typeof(firstname) != "string" || typeof(lastname) != "string")
    { 
        res.status(400).send("Wrong parameter!");
    }
    MongoClient.connect(url, (error, database) => {
        if(error) { throw error; }
        let dbo = database.db("database");

        dbo.collection("users").find({"firstname": firstname, "lastname": lastname}).toArray((error, searchResult) => {
            if(error){ throw error; }
            if(searchResult.length == 0){
                res.status(204).send("No Content!");
            }else{
                let myFriends = [];
                dbo.collection("users").find({"username": me}).toArray((error, result) => {
                    if(error){ throw error; }
                    if(result.length > 1){ res.status(500).send("Internal Server Error");}
                    myFriends = result[0].friends;
                    let foundUsers = [];
                    searchResult.forEach((value) => {
                        if(!myFriends.includes(value.username)){
                            let tempUser = {"firstname": value.firstname ,"lastname": value.lastname, "username": value.username};
                            foundUsers.push(tempUser);
                        }

                        });
                    res.status(200).send(foundUsers);
                    database.close();
                });
            }
        });
    });
});

module.exports = router;