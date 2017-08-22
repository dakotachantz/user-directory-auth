const express = require("express");
const profileRoutes = express.Router();

// NEW DB INFO
const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const ObjectId = mongo.ObjectID;
const dbUrl = "mongodb://localhost:27017/user-directory"
let DB;
let Users;

MongoClient.connect(dbUrl, (err, db) => {
    if (err) {
        return console.log("Error connecting to the database:", err);
    }
    DB = db;
    Users = db.collection("users");
});

profileRoutes.get("/:id", (req, res) => {
    Users.findOne({ _id: ObjectId(req.params.id) }, function (err, foundUser) {
        if (err) res.status(500).send(err);
        if (!foundUser) res.send("No user found");
        res.render("profile", { user: foundUser });
    });
});

module.exports = profileRoutes;