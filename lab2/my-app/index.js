const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const ObjectID = require('mongodb').ObjectID

const { MongoClient } = require('mongodb')
let url = "mongodb://localhost:27017/"


app.get('/', function (req, res) {

    MongoClient.connect(url, (err, db) => {
        if(err) { throw err; }
        let dbo = db.db("tdp013")
    
        dbo.collection("messages").find({}).toArray((err, result) => {
            if(err){ throw err; }
            console.log(result)
            db.close()
        })
    });
    res.send("Hello World!")
});
    
app.post('/save', function (req, res) {
    const { message, status } = req.body;
    console.log(message)
    console.log(status)

    MongoClient.connect(url, (err, dbs) => {
        if(err) { throw err; }
        let dbo = dbs.db("tdp013")
        dbo.collection("messages").insertOne({"message" : message, "status" : status})
    });

    res.send('Post fungerar!')
});

app.post('/update', function (req, res) {
    const { id, status } = req.body;
    console.log(id)
    console.log(status)

    MongoClient.connect(url, (err, dbs) => {
        if(err) { throw err; }
        let dbo = dbs.db("tdp013")

        let mongo = require('mongodb')


        dbo.collection("messages").updateOne({"_id": new mongo.ObjectId(id)}, {$set: {"status" : status}})
    });

    res.send('Update fungerar!')
});


// //you can now query
// Model.find({_id: good_id})



let server = app.listen(3000, () => {
    let host = server.address().address
    let port = server.address().port
    console.log(`Lyssnar på http://${host}:${port}`)
})  