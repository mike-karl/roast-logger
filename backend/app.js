require("dotenv").config();
require("./config/database").connect();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const express = require("express");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middleware/verifyJWT");
const credentials = require("./middleware/credential");
const path = require("path");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const app = express();

// custtom middleware logger
app.use(logger);
// Handle options credentials check - before cors and fetch cookies credentials requirement
app.use(credentials);
// Cross origin resource sharing
app.use(cors(corsOptions));
// Built in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));
// Built in middleware for json
app.use(express.json());
// middleware for cookies
app.use(cookieParser());
//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

// Logic goes here...
const roastLogsRouter = require("./routes/roastLogs");

// routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use(verifyJWT);
app.use("/mantraCoffee", roastLogsRouter);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

module.exports = app;
