// DECLARE VARIABLES
const express = require("express");
const mustacheExpress = require("mustache-express");
const session = require("express-session");
const logger = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const sessionConfig = require("./sessionConfig");
const checkAuth = require("./middleware/checkAuth");
const directoryRoutes = require("./routes/directoryRoutes");
const profileRoutes = require("./routes/profileRoutes");
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");
const bluebird = require("bluebird");
const app = express();
const port = process.env.PORT || 7777;

mongoose.Promise = bluebird;
mongoose.connect("mongodb://localhost:27017/user-directory");

// TEMPLATING ENGINE
app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

// MIDDLEWARE
app.use(express.static(path.join(__dirname, "./public")));
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionConfig));

// ROUTES
app.use("/", authRoutes);
app.use("/directory", checkAuth, directoryRoutes);
app.use("/users", checkAuth, profileRoutes);

// LISTEN
app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});


