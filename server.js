// DECLARE VARIABLES
const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');

// NEW DB INFO
const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const ObjectId = mongo.ObjectID;
const dbUrl = "mongodb://localhost:27017/user-directory"
let DB;
let Users;

const app = express();
const port = process.env.PORT || 8880;

// TEMPLATING ENGINE
app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

// MIDDLEWARE
app.use(express.static(path.join(__dirname, "./public")));

// CONNECT TO DB
MongoClient.connect(dbUrl, (err, db) => {
    if (err) {
        return console.log("Error connecting to the database:", err);
    }

    DB = db;
    Users = db.collection("users");

});

app.get("/", (req, res) => {
    Users.find({}).toArray((err, foundUsers) => {
        if (err) res.status(500).send(err);
        res.render("home", { data: foundUsers });
    });
});

app.get("/users/:id", (req, res) => {
    Users.findOne({ _id: ObjectId(req.params.id) }, function (err, foundUser) {
        if (err) res.status(500).send(err);
        if (!foundUser) res.send("No user found");
        res.render("profile", { user: foundUser });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
})

