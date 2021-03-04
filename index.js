require("dotenv").config();

const bodyParser = require("body-parser");

const express = require("express");

const { config, engine } = require("express-edge");

const fs = require("fs");

//const expressSession = require("express-session");

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
const indexRoute = require("./Controllers/index");

// registration
const signUpUser = require("./Controllers/signUpUser");
const addUserData = require("./Controllers/addUserData");
const addUserData2 = require("./Controllers/addUserData2");

//confirm email
const confirmEmailUser = require("./Controllers/confirmEmailUser");

// sign In
const signInUser = require("./Controllers/signInUser");

const signInUserData = require("./Controllers/signInUserData");

const contact = require("./Controllers/contact");

const about = require("./Controllers/about");

const help = require("./Controllers/help");

//proflie
const profileUser = require("./Controllers/profileUser");

const profileUserData = require("./Controllers/profileUserData");

//Forget password
const FPUser = require("./Controllers/FPUser");
const FPUserSend = require("./Controllers/FPUserSend");
const FPUserReset = require("./Controllers/FPUserReset");
const FPUserResetDB = require("./Controllers/FPUserResetDB");

//deactivate Account
const deactivateUserAccPage = require("./Controllers/deactivateUserAccPage");
const deactivateUserAcc = require("./Controllers/deactivateUserAcc");

//update
const updateUser = require("./Controllers/updateUser");
const updateUserImage = require("./Controllers/updateUserImage");

//not found
const notfound = require("./Controllers/notfound");

// Invitation
const invitationCreate = require("./Controllers/invitationCreate");
const invitationCreateCustom = require("./Controllers/invitationCreateCustom");
const invitationCreateDB = require("./Controllers/invitationCreateDB");
const invitationCustomCreateDB = require("./Controllers/invitationCustomCreateDB");
const invitation = require("./Controllers/invitation");
const invitationCustom = require("./Controllers/invitationCustom");
const inviteUpdate = require("./Controllers/inviteUpdate");
const inviteDelete = require("./Controllers/inviteDelete");
const inviteCustomDelete = require("./Controllers/inviteCustomDelete");
const engangementPravinNikita = require("./Controllers/engangementPravinNikita");

//greeting
const greetingCreate = require("./Controllers/greetingCreate");
const greetingCreateDB = require("./Controllers/greetingCreateDB");
const greeting = require("./Controllers/greeting");
const greetingUpdate = require("./Controllers/greetingUpdate");
const greetingDelete = require("./Controllers/greetingDelete");
const addUserData3 = require("./Controllers/addUserData3");
const greetingCustomCreateDB = require("./Controllers/greetingCustomCreateDB");
const greetingCustom = require("./Controllers/greetingCustom");
const greetingCreateCustom = require("./Controllers/greetingCreateCustom");


// create application/json parser
var jsonParser = bodyParser.json();

app.use(bodyParser.json({ limit: "10mb", extended: true }));
// create application/x-www-form-urlencoded parser

var urlencodedParser = bodyParser.urlencoded({ extended: true, limit: "10mb" });

app.use(express.static("public"));

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
      maxAge: 1800000, //Session liftime
      sameSite: true,
      secure: IN_PROD, //set true when application is in production mode and false when it is in development mode
    },
  })
);

app.set("views", `${__dirname}/views`);

var data;

const redirectLoginUser = (req, res, next) => {
  if (!req.session.userType) {
    res.redirect("/signInUser");
  } else if (req.session.userType == "user") {
    next();
  } else {
    res.redirect("/signInUser");
  }
};

app.get("/", indexRoute);

app.get("/help", help);

app.get("/about", about);

app.get("/contact", contact);

app.get("/logout", (req, res, next) => {
  if (req.session) {
    req.session = null;
  }
  res.redirect("/");
});

//registration

app.get("/signUpUser", signUpUser);

app.post("/signUpUser", urlencodedParser, addUserData);

app.get("/signUpUser2", addUserData2);

app.get("/signUpUser3", addUserData3);

// confirm emails

app.get("/confirmEmailUser", confirmEmailUser);

// login

app.get("/signInUser", signInUser);

app.post("/signInUserData", urlencodedParser, signInUserData);

// profile

app.get("/profileUser", redirectLoginUser, profileUser);

app.get("/profileUserData", redirectLoginUser, profileUserData);


// Forget Password
app.get("/FPUser", FPUser);

app.post("/FPUser", urlencodedParser, FPUserSend);

app.get("/FPUserReset", FPUserReset);

app.post("/FPUserReset", urlencodedParser, FPUserResetDB);

//Deactivate Account
app.get("/deactivateUserAcc", redirectLoginUser, deactivateUserAccPage);

app.post(
  "/deactivateUserAcc",
  redirectLoginUser,
  urlencodedParser,
  deactivateUserAcc
);

// update
app.post("/updateUser", urlencodedParser, redirectLoginUser, updateUser);

app.post(
  "/updateUserImage",
  urlencodedParser,
  redirectLoginUser,
  updateUserImage
);

//Invitation
app.get("/invitationCreate", redirectLoginUser, invitationCreate);

app.get("/invitationCreateCustom", redirectLoginUser, invitationCreateCustom);

app.post("/invitationCreate", urlencodedParser, invitationCreateDB);

app.post("/invitationCustomCreateDB", urlencodedParser, invitationCustomCreateDB);

app.get("/invitation", invitation);

app.get("/invitationCustom", invitationCustom);

app.get("/engangement", engangementPravinNikita);

app.post("/inviteUpdate", urlencodedParser, redirectLoginUser, inviteUpdate);

app.post(
  "/inviteDelete",
  urlencodedParser,
  redirectLoginUser,
  inviteDelete
);

app.post(
  "/inviteCustomDelete",
  urlencodedParser,
  redirectLoginUser,
  inviteCustomDelete
);

//Greeting
app.get("/greetingCreate", redirectLoginUser, greetingCreate);

app.get("/greetingCreateCustom", redirectLoginUser, greetingCreateCustom);

app.post("/greetingCreate", urlencodedParser, greetingCreateDB);

app.post("/greetingCustomCreateDB", urlencodedParser, greetingCustomCreateDB);

app.get("/greeting", greeting);

app.get("/greetingCustom", greetingCustom);

app.post(
  "/greetingUpdate",
  urlencodedParser,
  redirectLoginUser,
  greetingUpdate
);

app.post(
  "/greetingDelete",
  urlencodedParser,
  redirectLoginUser,
  greetingDelete
);


app.use(notfound);

server.listen(process.env.PORT, () => {
  console.log(`HTTP App listening on port ${process.env.PORT}`);
});

const server2 = https
  .createServer(httpsOptions, app)
  .listen(`${process.env.PORT2}`, () => {
    console.log(`HTTPS App listening on port ${process.env.PORT2}`);
  });
