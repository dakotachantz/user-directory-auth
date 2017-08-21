// import express
const express = require("express");
// create an express router
const profileRoutes = express.Router();
const data = require('../models/data');

profileRoutes.get("/", (req, res) => {
    return res.redirect("/");
});

profileRoutes.get("/:id", (req, res) => {
    let id = req.params.id;
    console.log("id: ", id);
    let user = data.users.find(user => user.id === parseInt(id));
    console.log("user: ", user);

    return res.render("profile", { user: user });
});

// export the route
module.exports = profileRoutes;
