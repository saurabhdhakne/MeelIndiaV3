require("dotenv").config();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const nodemailer = require("nodemailer");


mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

var fname;

module.exports = async (req, res) => {
          
      userEmail = req.session.email;
      toEmail = 'sbdhakne309@gmail.com';
      console.log(toEmail);
          
            nodemailer.createTestAccount((err, account) => {
            let transporter = nodemailer.createTransport({
              host: "smtp.googlemail.com", // Gmail Host
              port: 465, // Port
              secure: true, // this is true as port is 465
              auth: {
                user: `${process.env.email}`, //Gmail username
                pass: `${process.env.emailpass}`, // Gmail password
              },
            });
    
            let mailOptions = {
              from: "MeelIndia",
              to: toEmail, // Recepient email address. Multiple emails can send separated by commas
              subject: "MeelIndia : Ask For Quote",
              html: `<h1>Invitation Created Successully.</h1> <br> <br> 
               <br><br> 
              <h2> Email : ${userEmail} <br> Name : ${req.body.fname} <br> Mobile : ${req.body.mobile} <br> Quantity : ${req.body.quantity} </h2> `,
            };
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                return console.log(error);
              }
              console.log("Message sent: %s", info.messageId);
              res.render("askForQuoteSuccess");
              db.close();
            });
          });
 
};