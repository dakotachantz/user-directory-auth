// DECLARE VARIABLES
const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const homeRoutes = require("./routes/homeRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();
const port = process.env.PORT || 8880;

// TEMPLATING ENGINE
app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

// MIDDLEWARE
app.use(express.static(path.join(__dirname, "./public")));
app.use("/", homeRoutes);
app.use("/users", profileRoutes);

// LISTEN
app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});


