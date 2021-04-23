require("dotenv").config();

const bodyParser = require("body-parser");

const express = require("express");

const { config, engine } = require("express-edge");

const fs = require("fs");

const passport = require('passport')

require('./passport-setup')

// const expressSession = require("express-session");

const expressSession = require("cookie-session");

const path = require("path");

const app = new express();

var server = require("http").createServer(app);

var http = require("http");

var https = require("https");

const httpsOptions = {
  key: fs.readFileSync("./security/key.pem"),
  cert: fs.readFileSync("./security/server.crt"),
};

//Controllers
const indexRoute = require("./ControllersAdmin/index");
const adminLogin = require("./ControllersAdmin/adminLogin");
const signInUser = require("./ControllersAdmin/signInUser");
const invitation = require("./ControllersAdmin/invitations");

// create application/json parser
var jsonParser = bodyParser.json();

app.use(bodyParser.json({ limit: "10mb", extended: true }));
// create application/x-www-form-urlencoded parser

var urlencodedParser = bodyParser.urlencoded({ extended: true, limit: "10mb" });

app.use(express.static("publicAdmin"));

// Configure Edge if need to
config({ cache: process.env.NODE_ENV === "production" });

// Automatically sets view engine and adds dot notation to app.render
app.use(engine);

const IN_PROD = process.env.NODE_ENV === "production";

app.use(
  expressSession({
    name: process.env.SESSION_NAME, //setting custom name
    resave: false, // do not store if it never modified
    secret: process.env.SESSION_SECRETE, // secrete key which we dont't want expose to client
    saveUninitialized: false, //dont save the session which is empty

    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, //Session liftime
      sameSite: true,
      secure: IN_PROD, //set true when application is in production mode and false when it is in development mode
    },
  })
);

app.set("views", `${__dirname}/viewsAdmin`);

const redirectLoginUser = (req, res, next) => {
  if (!req.session.userType) {
    res.redirect("/adminLogin");
  } else if (req.session.userType == "admin") {
    next();
  } else {
    res.redirect("/adminLogin");
  }
};

app.get("/", redirectLoginUser, indexRoute);

app.get("/adminLogin", adminLogin);

app.post("/signInUser", urlencodedParser, signInUser);

app.get("/invitations", urlencodedParser, invitation);

app.get("/logout", (req, res, next) => {
  if (req.session) {
    req.session = null;
  }
  res.redirect("/");
});

// app.use(notfound);

server.listen(process.env.PORT3, () => {
  console.log(`HTTP App listening on port ${process.env.PORT3}`);
});

const server2 = https
  .createServer(httpsOptions, app)
  .listen(`${process.env.PORT4}`, () => {
    console.log(`HTTPS App listening on port ${process.env.PORT4}`);
});