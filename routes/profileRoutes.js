const express = require("express");
const profileRoutes = express.Router();
const User = require("../models/User");

profileRoutes.get("/profile", (req, res) => {
    res.render("profile", { user: req.session.user });
});

profileRoutes.get("/:id", (req, res) => {
    User.findById(req.params.id)
        .then(function (foundUser) {
            if (!foundUser) res.send("No user found");
            res.render("profile", { user: foundUser });
        });
});


profileRoutes.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.send("Error logging out");
        } else {
            res.redirect("/");
        }
    });
});

module.exports = profileRoutes;