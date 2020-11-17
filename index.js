require("dotenv").config();

const bodyParser = require("body-parser");

const express = require("express");

const { config, engine } = require("express-edge");

const fs = require("fs");

//const expressSession = require("express-session");

const expressSession = require("cookie-session");

const imageToBase64 = require("image-to-base64");

const path = require("path");

const mysql = require("mysql");

const util = require("util");

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
const SignUpBusiness = require("./Controllers/signUpBusiness");
const addBusinessData = require("./Controllers/addBusinessData");
const addUserData = require("./Controllers/addUserData");

//confirm email
const confirmEmailUser = require("./Controllers/confirmEmailUser");
const confirmEmailBusiness = require("./Controllers/confirmEmailBusiness");

// sign In
const signInBusiness = require("./Controllers/signInBusiness");

const signInUser = require("./Controllers/signInUser");

const signInUserData = require("./Controllers/signInUserData");

const signInBusinessData = require("./Controllers/signInBusinessData");

const contact = require("./Controllers/contact");

const about = require("./Controllers/about");

const help = require("./Controllers/help");

//proflie
const profileUser = require("./Controllers/profileUser");

const profileUserData = require("./Controllers/profileUserData");

const profileBusiness = require("./Controllers/profileBusiness");

// others
const businessData = require("./Controllers/businessData");

const services = require("./Controllers/services");

//Forget password
const FPUser = require("./Controllers/FPUser");
const FPUserSend = require("./Controllers/FPUserSend");
const FPUserReset = require("./Controllers/FPUserReset");
const FPUserResetDB = require("./Controllers/FPUserResetDB");

const FPBusiness = require("./Controllers/FPBusiness");
const FPBusinessSend = require("./Controllers/FPBusinessSend");
const FPBusinessReset = require("./Controllers/FPBusinessReset");
const FPBusinessResetDB = require("./Controllers/FPBusinessResetDB");

//deactivate Account
const deactivateUserAccPage = require("./Controllers/deactivateUserAccPage");
const deactivateUserAcc = require("./Controllers/deactivateUserAcc");
const deactivateBusinessAccPage = require("./Controllers/deactivateBusinessAccPage");
const deactivateBusinessAcc = require("./Controllers/deactivateBusinessAcc");

//update
const updateUser = require("./Controllers/updateUser");
const updateBusiness = require("./Controllers/updateBusiness");
const updateBusinessImage = require("./Controllers/updateBusinessImage");
const updateUserImage = require("./Controllers/updateUserImage");

// Services
const servicesForm = require("./Controllers/servicesForm");
const addService = require("./Controllers/addService");
const updateService = require("./Controllers/updateService");
const updateServiceImage = require("./Controllers/updateServiceImage");
const deleteService = require("./Controllers/deleteService");

// Invitation
const invitationCreate = require("./Controllers/invitationCreate");
const invitationCreateDB = require("./Controllers/invitationCreateDB");
const invitation = require("./Controllers/invitation");
const inviteUpdate = require("./Controllers/inviteUpdate");
const inviteDelete = require("./Controllers/inviteDelete");

//Greeting
const greetingCreate = require("./Controllers/greetingCreate");
const greetingCreateDB = require("./Controllers/greetingCreateDB");
const greeting = require("./Controllers/greeting");
const greetingUpdate = require("./Controllers/greetingUpdate");
const greetingDelete = require("./Controllers/greetingDelete");

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

const redirectLoginBusiness = (req, res, next) => {
  if (!req.session.userType) {
    res.redirect("/businessSignIn");
  } else if (req.session.userType == "business") {
    next();
  } else {
    res.redirect("/businessSignIn");
  }
};

app.get("/", indexRoute);

app.get("/new", (req, res) => {
  res.render("newInvite");
});

app.get("/help", help);

app.get("/about", about);

app.get("/contact", contact);

app.get("/testing", (req, res) => {
  res.send("application is working");
});

app.get("/logout", (req, res, next) => {
  if (req.session) {
    req.session = null;
  }
  res.redirect("/");
});

//registration

app.get("/signUpUser", signUpUser);

app.get("/signUpBusiness", SignUpBusiness);

app.post("/signUpUser", urlencodedParser, addUserData);

app.post("/signUpBusiness", urlencodedParser, addBusinessData);

// confirm emails

app.get("/confirmEmailUser", confirmEmailUser);

app.get("/confirmEmailBusiness", confirmEmailBusiness);

// login

app.get("/signInUser", signInUser);

app.get("/signInBusiness", signInBusiness);

app.post("/signInUserData", urlencodedParser, signInUserData);

app.post("/signInBusinessData", urlencodedParser, signInBusinessData);

// profile

app.get("/profileUser", redirectLoginUser, profileUser);

app.get("/profileUserData", redirectLoginUser, profileUserData);

app.get("/profileBusiness", redirectLoginBusiness, profileBusiness);

// other
app.get("/businessData", businessData);

app.get("/services", services);

// Forget Password
app.get("/FPUser", FPUser);

app.post("/FPUser", urlencodedParser, FPUserSend);

app.get("/FPUserReset", FPUserReset);

app.post("/FPUserReset", urlencodedParser, FPUserResetDB);

app.get("/FPBusiness", FPBusiness);

app.post("/FPBusiness", urlencodedParser, FPBusinessSend);

app.get("/FPBusinessReset", FPBusinessReset);

app.post("/FPBusinessReset", urlencodedParser, FPBusinessResetDB);

//Deactivate Account
app.get("/deactivateUserAcc", redirectLoginUser, deactivateUserAccPage);

app.post(
  "/deactivateUserAcc",
  redirectLoginUser,
  urlencodedParser,
  deactivateUserAcc
);

app.get(
  "/deactivateBusinessAcc",
  redirectLoginBusiness,
  deactivateBusinessAccPage
);

app.post(
  "/deactivateBusinessAcc",
  redirectLoginBusiness,
  urlencodedParser,
  deactivateBusinessAcc
);

// update
app.post("/updateUser", urlencodedParser, redirectLoginUser, updateUser);

app.post(
  "/updateUserImage",
  urlencodedParser,
  redirectLoginUser,
  updateUserImage
);

app.post(
  "/updateBusiness",
  urlencodedParser,
  redirectLoginBusiness,
  updateBusiness
);

app.post(
  "/updateBusinessImage",
  urlencodedParser,
  redirectLoginBusiness,
  updateBusinessImage
);

// services
app.get("/serviceForm", redirectLoginBusiness, servicesForm);

app.post("/addService", urlencodedParser, redirectLoginBusiness, addService);

app.post(
  "/updateService",
  urlencodedParser,
  redirectLoginBusiness,
  updateService
);

app.post(
  "/updateServiceImage",
  urlencodedParser,
  redirectLoginBusiness,
  updateServiceImage
);

app.post(
  "/deleteService",
  urlencodedParser,
  redirectLoginBusiness,
  deleteService
);

//Invitation
app.get("/invitationCreate", redirectLoginUser, invitationCreate);

app.post("/invitationCreate", urlencodedParser, invitationCreateDB);

app.get("/invitation", invitation);

app.post("/inviteUpdate", urlencodedParser, redirectLoginUser, inviteUpdate);

app.post(
  "/inviteDelete",
  urlencodedParser,
  redirectLoginUser,
  inviteDelete
);

//Greeting
app.get("/greetingCreate", redirectLoginUser, greetingCreate);

app.post("/greetingCreate", urlencodedParser, greetingCreateDB);

app.get("/greeting", greeting);

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

app.use((req, res) => res.render("notfound"));

server.listen(process.env.PORT, () => {
  console.log(`HTTP App listening on port ${process.env.PORT}`);
});

const server2 = https
  .createServer(httpsOptions, app)
  .listen(`${process.env.PORT2}`, () => {
    console.log(`HTTPS App listening on port ${process.env.PORT2}`);
  });
