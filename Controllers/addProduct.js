const mongoose = require("mongoose");

const sha256 = require("sha256");

const fs = require("fs");

const path = require("path");

const nodemailer = require("nodemailer");

const cryptoRandomString = require("crypto-random-string");

const mPost = require("../database/models/mPost");

module.exports = (req, res) => {
  try {
    var url = `${process.env.db}`;

    mongoose.set("useNewUrlParser", true);
    mongoose.set("useFindAndModify", false);
    mongoose.set("useCreateIndex", true);
    mongoose.set("useUnifiedTopology", true);

    mongoose.connect(url, (err, db) => {
      if (err) {
        console.log("Unable to connect");
      } else {
        console.log("connected");

        toEmail = req.session.email;
        console.log(toEmail);

        mPost.create(
          {
            email: toEmail,

            title: req.body.title,

            tags: req.body.tags,

            amount: req.body.amount,

            desc: req.body.desc,
          },
          (error, post) => {
            console.log(error, post);
          }
        );
        nodemailer.createTestAccount((err, account) => {
          let transporter = nodemailer.createTransport({
            host: "smtp.googlemail.com", // Gmail Host
            port: 465, // Port
            secure: true, // this is true as port is 465
            auth: {
              user: "srb.bonny@gmail.com", //Gmail username
              pass: "theckmb@12345", // Gmail password
            },
          });

          let mailOptions = {
            from: "Saurabh Dhakne",
            to: toEmail, // Recepient email address. Multiple emails can send separated by commas
            subject: "AdzPay : New Ad Posted",
            html: `<h1> Your New Ad Uploaded Successfully.</h1> <br> <br>  
            <h2 style="float:right"> Thank You. from : Saurabh Dhakne </h2> `,
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log("Message sent: %s", info.messageId);
          });
        });
      }
    });

    res.render("adAdded");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
