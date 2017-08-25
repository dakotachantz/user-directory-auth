const express = require("express");
const directoryRoutes = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// directoryRoutes.get("/updatemany", (req, res) => {
//     let allUsers;
//     User.find()
//         .then(function (foundUsers) {
//             allUsers = foundUsers;
//             console.log('allUsers: ', allUsers.length);
//             let salt = bcrypt.genSaltSync(10);
//             let password = bcrypt.hashSync("password", salt)
//             User.update({}, { $set: { password: password } })
//                 .then(function (updatedUsers) {
//                     res.send(updatedUsers);
//                     console.log('updatedUsers: ', updatedUsers);
//                 })
//                 .catch(function (err) {
//                     if (!updatedUsers) res.status(500).send("Error saving users!");
//                 });
//         })

// });

directoryRoutes.get("/", (req, res) => {
    User.find()
        .then(function (foundUsers) {
            if (!foundUsers) res.status(500).send("No Users Found.");
            res.render("home", { data: foundUsers });
        });
});

directoryRoutes.get("/employed", (req, res) => {
    User.find({ job: { $ne: null } })
        .then((employedUsers) => {
            if (!employedUsers) res.status(500).send("No Employed Users.");
            res.render("home", { data: employedUsers });
        });
});

directoryRoutes.get("/lookingforwork", (req, res) => {
    User.find({ job: null })
        .then((unemployedUsers) => {
            if (!unemployedUsers) res.status(500).send("No Unemployed Users.");
            res.render("home", { data: unemployedUsers });
        });
});

directoryRoutes.get("/university", (req, res) => {
    User.find({ university: { $ne: null } }).then((universityUsers) => {
        if (!universityUsers) res.status(500).send("No Users Found with Degrees.");
        res.render("home", { data: universityUsers });
    });
});

directoryRoutes.get("/nouniversity", (req, res) => {
    User.find({ university: null }).then((noUniversityUsers) => {
        if (!noUniversityUsers) res.status(500).send("No Users Found without Degrees.");
        res.render("home", { data: noUniversityUsers });
    });
});

module.exports = directoryRoutes;