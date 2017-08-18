const express = require('express');
const data = require('./data');
// console.log(data.users[0]);
const path = require('path');
const mustacheExpress = require('mustache-express');
const app = express();
const port = process.env.PORT || 8880;

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.static(path.join(__dirname, "./public")));

app.get("/", (req, res) => {
    return res.render("home", { data: data.users });
});

app.get("/profile", (req, res) => {
    return res.redirect("/");
});

app.get("/profile/:id", (req, res) => {
    let id = req.params.id;
    console.log("id: ", id);
    let user = data.users.find(user => user.id === parseInt(id));
    console.log("user: ", user);

    return res.render("profile", { user: user });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
})

