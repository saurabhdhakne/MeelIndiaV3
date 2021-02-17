const mongoose = require("mongoose");

const sha256 = require("sha256");

const fs = require("fs");

const path = require("path");

const nodemailer = require("nodemailer");

const cryptoRandomString = require("crypto-random-string");

const databases = require("../database/models/user");
const { async } = require("crypto-random-string");

module.exports = (req, res) => {
  var url = `${process.env.db}`;

  mongoose.set("useNewUrlParser", true);
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
  mongoose.set("useUnifiedTopology", true);

  mongoose.connect(url, async (err, db) => {
    if (err) {
      console.log("Unable to connect");
    } else {
      console.log(req.query.email);
      await databases.find({ email: req.query.email },(err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send("email");
        }
        else{
            res.send("active");
        }
      });

    }
  });

};
