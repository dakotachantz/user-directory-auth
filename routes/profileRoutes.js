const express = require("express");
const profileRoutes = express.Router();
const User = require("../models/User");

profileRoutes.get("/profile", (req, res) => {
    return res.render("profile", { user: req.session.user });
});

profileRoutes.get("/profile-edit", (req, res) => {
    console.log("PROFILE EDIT ROUTE");
    return res.render("edit-profile", { user: req.session.user });
});

profileRoutes.get("/:id", (req, res) => {
    console.log("/ID ROUTE!!");
    User.findById(req.params.id)
        .then(function (foundUser) {
            if (!foundUser) res.send("No user found");
            return res.render("profile", { user: foundUser });
        });
});


profileRoutes.post("/updateuser/:id", (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then(function (updatedUser) {
            if (!updatedUser) {
                return res.send("No user to update.")
            }
            return res.redirect("/users/profile");
        })
        .catch(function (err) {
            return res.status(500).send(err);
        })
});

profileRoutes.post("/deleteuser/:id", (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then(function (message) {
            return res.redirect("/");
        })
        .catch(function (err) {
            return res.status(500).send(err);
        })
})


module.exports = profileRoutes;