const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const ObjectID = require('mongodb').ObjectID

const { MongoClient } = require('mongodb')
let url = "mongodb://localhost:27017/"

// För testing
app.get('/', function (req, res) {
    res.send("Welcome!")
});

// Spara meddelande
app.post('/save', function (req, res) {
    const { message, status } = req.body;

    MongoClient.connect(url, (err, dbs) => {
        if(err) { throw err; }
        let dbo = dbs.db("tdp013")
        dbo.collection("messages").insertOne({"message" : message, "status" : status})
        .then((data) => {
            dbs.close()
        })
        .catch((err) => {
            console.log("Something went wrong..." + err)
            dbs.close()
        })
        
    });

    res.send('Post fungerar!')
});


// Markera som läst/oläst
app.post('/flag', function (req, res) {
    const { id, status } = req.body;

    MongoClient.connect(url, (err, dbs) => {
        if(err) { throw err; }
        let dbo = dbs.db("tdp013")
        let mongo = require('mongodb')

        dbo.collection("messages").updateOne({"_id": new mongo.ObjectId(id)}, {$set: {"status" : status}})
        .then((data) => {
            res.send('Update fungerar!')
            dbs.close()
        })
        .catch((err) => {
            console.log("Something went wrong..." + err)
            dbs.close()
        })
        
    });
    
});

// Hämta meddelande
app.get('/get', function (req, res) {
    const id = req.query.id

    MongoClient.connect(url, (err, dbs) => {
        if(err) { throw err; }
        
        let dbo = dbs.db("tdp013")
        let mongo = require('mongodb')

        dbo.collection("messages").find({"_id": new mongo.ObjectId(id)}).toArray((err, result) => {
            if(err){ throw err; }
            
            res.send(result)
            dbs.close()
        })
    });
});

// Hämta alla meddelande
app.get('/getall', function (req, res) {

    MongoClient.connect(url, (err, dbs) => {
        if(err) { throw err; }
        let dbo = dbs.db("tdp013")   
        dbo.collection("messages").find({}).toArray((err, result) => {
            if(err){ throw err; }
            
            res.send(result)
            dbs.close()
        })
    });
});




let server = app.listen(3000, () => {
    let host = server.address().address
    let port = server.address().port
    console.log(`Lyssnar på http://${host}:${port}`)
})  