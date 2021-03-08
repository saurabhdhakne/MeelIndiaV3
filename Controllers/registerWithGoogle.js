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
      await databases.find({ email: req.user.emails[0].value }, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            // res.send("Account Associalted with this Email is Already Exsist!!");
            req.session.userType = "user";
            req.session.email = req.user.emails[0].value;
            res.redirect("/");
        }
        else{

          randomString = cryptoRandomString({ length: 50, type: "alphanumeric" });

          toEmail = req.user.emails[0].value;
          fname = req.user.name.familyName;
          lname = req.user.name.givenName
          password = randomString;

          console.log(toEmail);
          console.log(fname);
          console.log(lname);
          
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
              from: "MeelIndia",
              to: toEmail, // Recepient email address. Multiple emails can send separated by commas
              subject: "MeelIndia : Account Created Successfully",
              html: `<h1> Your MeelIndia Account created Successfully, Your Password is <i> ${password} </i> . </h1> <br> <br> 
               <h2> Enjoy Creating Invitation and Greeting for Your beloved ones.</h2>
              <h2 style="float:right"> Thank You. from : MeelIndia </h2> `,
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
              fname: fname,
    
              lname: lname,
    
              email: toEmail,
    
              enc: randomString,
    
              active: true,
    
              password: sha256(password),
            },
            (error, post) => {
                
                console.log(error, post);
            }
          );
            req.session.userType = "user";
            req.session.email = req.user.emails[0].value;
            res.redirect("/");
        }

      });

    }
  });

};
