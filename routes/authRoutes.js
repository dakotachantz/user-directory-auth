const express = require("express");
const authRoutes = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

authRoutes.get("/signup", (req, res) => {
    res.render("signup");
});

authRoutes.post("/signup", (req, res) => {
    let newUser = new User(req.body);
    let salt = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(newUser.password, salt);
    newUser
        .save()
        .then(function (savedUser) {
            res.redirect("/login");
        })
        .catch(function (err) {
            if (!savedUser) res.status(500).send("Error saving user!");
        });
});

authRoutes.get("/", (req, res) => {
    res.render("login");
});
authRoutes.get("/login", (req, res) => {
    res.render("login");
});

authRoutes.post("/login", (req, res) => {
    let reqUsername = req.body.username;
    let reqPassword = req.body.password;

    User.findOne({ username: reqUsername }).then(function (foundUser) {
        console.log("foundUser", foundUser);
        console.log("foundUser password", foundUser.password);
        if (!foundUser) {
            return res.render("login", { errors: ["No user found."] });
        }

        const authorized = bcrypt.compareSync(reqPassword, foundUser.password);

        if (!authorized) {
            return res.render("login", { errors: ["Password does not match."] });
        }

        delete foundUser.password;
        req.session.user = foundUser;
        res.redirect("/directory");
    });
});

module.exports = authRoutes;