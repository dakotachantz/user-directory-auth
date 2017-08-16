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
    res.render("home", { data: data.users });
});

// app.get("/:name", (req, res) => {
//     console.log(req.params);
//     const name = req.params.name;
//     const data = {
//         name: name,
//         people: [{ name: "Tanner", favColor: "red" }, { name: "Jill", favColor: "green" }, { name: "Buffy", favColor: "light blue" }, { name: "Dakota", favColor: "blue" }, { name: "Erin", favColor: "purple" }, { name: "Paul", favColor: "orange" }]
//     };
//     res.render("home", );
// });

// app.get("/", (req, res) => {
//     console.log(req.params);
//     const name = req.params.name;
//     const data = {
//         name: name,
//         people: [{ name: "Tanner", favColor: "red" }, { name: "Jill", favColor: "green" }, { name: "Buffy", favColor: "light blue" }, { name: "Dakota", favColor: "blue" }, { name: "Erin", favColor: "purple" }, { name: "Paul", favColor: "orange" }]
//     };
//     res.render("home", );
// });


app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
})

