const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5000;

// include database server

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Fayez:todo123@cluster0.5apek.mongodb.net/Todo?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//========
const app = express();
app.use(bodyParser.json());
app.use(cors());

// connected database
client.connect(err => {
    const todoCollection = client.db("Todo").collection("TodoData");
    console.log("DB Connected");
    app.post('/addTodo', (req, res) => {
        const todoData = req.body;
        console.log(todoData)
        todoCollection.insertOne(todoData)
            .then(result => {
                console.log(result.insertedCount);
                res.send(result.insertedCount)
            })
    })

    // load all event data from database
    app.get('/loadTodo', (req, res) => {
        // EventCollection.find({})
        //     .toArray((err, documents) => {
        //         res.send(documents);
        //     })
    })
    // client.close();
});

app.get('/', function (req, res) {
    res.send("Hello! It's todo api")
})

app.listen(port);