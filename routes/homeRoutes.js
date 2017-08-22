const express = require("express");
const homeRoutes = express.Router();

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

homeRoutes.get("/", (req, res) => {
    Users.find({}).toArray((err, foundUsers) => {
        if (err) res.status(500).send(err);
        res.render("home", { data: foundUsers });
    });
});

homeRoutes.get("/employed", (req, res) => {
    Users.find({ job: { $ne: null } }).toArray((err, employedUsers) => {
        if (err) res.status(500).send(err);
        res.render("home", { data: employedUsers });
    });
});

homeRoutes.get("/lookingforwork", (req, res) => {
    Users.find({ job: null }).toArray((err, unemployedUsers) => {
        if (err) res.status(500).send(err);
        res.render("home", { data: unemployedUsers });
    });
});

homeRoutes.get("/university", (req, res) => {
    Users.find({ university: { $ne: null } }).toArray((err, universityUsers) => {
        if (err) res.status(500).send(err);
        res.render("home", { data: universityUsers });
    });
});

homeRoutes.get("/nouniversity", (req, res) => {
    Users.find({ university: null }).toArray((err, noUniversityUsers) => {
        if (err) res.status(500).send(err);
        res.render("home", { data: noUniversityUsers });
    });
});

module.exports = homeRoutes;