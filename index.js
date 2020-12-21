const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()
const cors = require('cors');
const PORT = 5000;
const ObjectId = require('mongodb').ObjectId;

// include database server

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://Fayez:todo123@cluster0.5apek.mongodb.net/Todo?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//========
const app = express();
app.use(bodyParser.json());
app.use(cors());

// connected database
client.connect(err => {
    const todoCollection = client.db("Todo").collection("TodoData");
    console.log("DB Connected");

    //Add todo
    app.post('/addTodo', (req, res) => {
        const todoData = req.body;
        console.log(todoData)
        todoCollection.insertOne(todoData)
            .then(result => {
                console.log(result.insertedCount);
                // res.sendStatus(200)
                res.send(result.insertedCount > 0)
            })
    })

    // load todos data from database
    app.get('/loadTodo', (req, res) => {
        todoCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    //delete single todo task
    app.delete('/deleteTodo', (req, res) => {
        todoCollection.deleteOne({ _id: ObjectId(req.query.id) })
            .then(result => {
                res.send(result)
            })
    })
    //load single event 
    app.get('/singleTodo', (req, res) => {
        todoCollection.find({ _id: ObjectId(req.query.id) })
            .toArray((err, documents) => {
                res.send(documents[0]);
            })
    })

    //update todo
    app.patch('/updateTodo', (req, res) => {
        todoCollection.updateOne({ _id: ObjectId(req.query.id) }, {
            $set: { Title: req.body.Title, Priority: req.body.Priority }
        })
            .then(result => {
                res.send(result)
            })
    })
    // client.close();
});

app.get('/', function (req, res) {
    res.send("Hello! It's todo api")
})

app.listen(process.env.PORT || PORT);