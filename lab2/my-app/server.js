const express = require('express');
const sanitize = require('mongo-sanitize');
const xssClean = require('xss-clean');

const app = express();

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(xssClean()); // sanitizes the get and post requests
app.use((req, res, next) => {
 res.header('Access-Control-Allow-Origin', '*');
 res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With',
 'Content-Type, Accept');
 next();
});

const ObjectID = require('mongodb').ObjectID;

const { MongoClient } = require('mongodb');
let url = "mongodb://localhost:27017/";

// Spara meddelande
app.post('/save', function (req, res) {
    const { message, status } = req.body;
    let validStatus = false;
    let validMessage = false;
    if(status == "read" || status == "unread") 
        validStatus = true;
    if((message.length > 0 && message.length  <= 140) && typeof(message) == "string")
        validMessage = true;
        
    if(!validMessage || !validStatus)
    {
        res.status(400).send("Wrong parameter!");        
    }
    else{
        sanitize(message);
        sanitize(status);
        MongoClient.connect(url, (err, dbs) => {
            if(err) { throw err; }
            let dbo = dbs.db("tdp013");
	   
            dbo.collection("messages").insertOne({"message" : message, "status" : status, "time": new Date()})
		.then((data) => {
		    res.send(data.insertedId);
                    dbs.close();
            })
            .catch((err) => {
                console.log("Something went wrong..." + err)
                dbs.close();
            })
            
        });
	//res.send("Fungerar"); 
    }
});


// Markera som läst/oläst
app.post('/flag', function (req, res) {
    const { id, status } = req.body

    let validId = false;
    let validStatus = false;

    if(typeof(id) == "string") { validId = true;}
    if(status == "read" || status == "unread") { validStatus = true;}
    if(!validId || !validStatus)
    {
        res.status(400).send("Wrong parameter!");
    }
    else{
        sanitize(id);
        sanitize(status);
        MongoClient.connect(url, (err, dbs) => {
            if(err) { throw err; }
            let dbo = dbs.db("tdp013");
            let mongo = require('mongodb');

            dbo.collection("messages").updateOne({"_id": new mongo.ObjectId(id)}, {$set: {"status" : status}})
            .then((data) => {
                    if(data.matchedCount == 0){
                        res.status(400).send("Wrong parameter!");
                    }
                    else{
                        res.send('Update fungerar!');
                    }
                    dbs.close();
                })
                .catch((err) => {
                    console.log("Something went wrong..." + err);
                    dbs.close();
                })
                
        });
    }
});

// Hämta meddelande
app.get('/get', function (req, res) {
    const id = req.query.id;
    if(typeof(id) != "string") { res.status(400).send("Wrong parameter!"); }
    MongoClient.connect(url, (err, dbs) => {
        if(err) { throw err; }
        let dbo = dbs.db("tdp013");
        let mongo = require('mongodb');

        dbo.collection("messages").find({"_id": new mongo.ObjectId(id)}).toArray((err, result) => {
            if(err){ throw err; }
            if(result.length == 0){
                res.status(400).send("Wrong parameter!");
            }
            else{
                res.send(result);
            }
            dbs.close();
        })
    });
});

// Hämta alla meddelande
app.get('/getall', function (req, res) {

    MongoClient.connect(url, (err, dbs) => {
        if(err) { throw err; }
        let dbo = dbs.db("tdp013");
        dbo.collection("messages").find({}).sort({"time": 1}).toArray((err, result) => {
            res.send(result);
            dbs.close();
        })
    });
});


// Felhantering
app.all('/flag', function (req, res) {
    res.status(405).send("Bad method!");
});
app.all('/save', function (req, res) {
    res.status(405).send("Bad method!");
});
app.all('/getall', function (req, res) {
    res.status(405).send("Bad method!");
});
app.all('/get', function (req, res) {
    res.status(405).send("Bad method!");
});

app.all('*', function (req, res) {
    res.status(404).send("Sorry! The page you are looking does not exist!");
})

app.use(function (req, res, next) {
    res.status(500).send("Something broke!");
})

let server;
function makeServer(){
    server = app.listen(3000, () => {
        let host = server.address().address;
        let port = server.address().port;
        console.log(`Lyssnar på http://${host}:${port}`);
    })
}

function closeServer(){
    server.close();
}

module.exports = {
    makeServer,
    closeServer
}
