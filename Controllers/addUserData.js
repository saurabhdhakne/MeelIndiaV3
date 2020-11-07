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
      console.log("connected");
      await databases.find({ email: req.body.email }, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
         res.send("Email Already Exsist!!");
        }
        else{
          randomString = cryptoRandomString({ length: 50, type: "alphanumeric" });

          toEmail = req.body.email;
          password = req.body.password;
          console.log(toEmail);
          nodemailer.createTestAccount((err, account) => {
            let transporter = nodemailer.createTransport({
              host: 'smtp.gmail.com',
              port: 465,
              secure: true, 
              auth: {
                user: `${process.env.email}`, //Gmail username
                pass: `${process.env.emailpass}`, // Gmail password
              },
            });
    
            let mailOptions = {
              from: "Saurabh Dhakne",
              to: toEmail, // Recepient email address. Multiple emails can send separated by commas
              subject: "MeelIndia : Account Confirmation",
              html: `<h1> Your MeelIndia Account created Successfully.</h1> <br> <br> 
              <h2> <a href='${process.env.ip}/confirmEmailUser?enc=${randomString}'> <strong> Click Here </strong> </a> <br> to activate your account, Please do not share your password with anyone else.</h2> <br><br> 
              <h2 style="float:right"> Thank You. from : MellIndia </h2> `,
            };
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                return console.log(error);
              }
              console.log("Message sent: %s", info.messageId);
            });
          });
    
          databases.create(
            {
              fname: req.body.fname,
    
              lname: req.body.lname,
    
              email: req.body.email,
    
              enc: randomString,
    
              active: false,
    
              password: sha256(req.body.password),
            },
            (error, post) => {
              console.log(error, post);
            }
          );
          
          res.render("accountCreated");
        }

      });

    }
  });

};
