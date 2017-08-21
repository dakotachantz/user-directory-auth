const express = require('express');
const data = require('./models/data');
const path = require('path');
const mustacheExpress = require('mustache-express');
const indexRoutes = require("./routes/indexRoutes");
const profileRoutes = require("./routes/profileRoutes");
const app = express();
const port = process.env.PORT || 8880;

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.static(path.join(__dirname, "./public")));

app.use("/", indexRoutes);
app.use("/profile", profileRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
})

