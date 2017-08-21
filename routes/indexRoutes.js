// import express
const express = require("express");
// create an express router
const indexRoutes = express.Router();
const data = require('../models/data');

indexRoutes.get("/", (req, res) => {
    return res.render("home", { data: data.users });
});

// export the route
module.exports = indexRoutes;