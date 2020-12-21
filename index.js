const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5000;

// include database server

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Fayez:F@yez112233@cluster0.dwklg.mongodb.net/Todo-task?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//========
const app = express();
app.use(bodyParser.json());
app.use(cors());

// connected database
client.connect(err => {
    const todoCollection = client.db("Todo-task").collection("todo");

    // post data into database
    app.post('/addTodo', (req, res) => {
        const todoData = req.body;
        todoCollection.insertOne(todoData)
            .then(result => {
                console.log(result.insertedCount);
                res.send(result.insertedCount)
            })
    })



});


app.get('/', function (req, res) {
    res.send("Hello! It's todo api")
})

app.listen(process.env.PORT || port);