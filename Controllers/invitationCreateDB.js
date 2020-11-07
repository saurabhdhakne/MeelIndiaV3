const mongoose = require("mongoose");

const sha256 = require("sha256");

const fs = require("fs");

const path = require("path");

const nodemailer = require("nodemailer");

const invitation = require("../database/models/invitation");

module.exports = (req, res) => {
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
          subject: "MeelIndia : Invitation Created",
          html: `<h1>Invitation Created Successully.</h1> <br> <br> 
           <br><br> 
          <h2 style="float:right"> Thank You. from :MeelIndia </h2> `,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log("Message sent: %s", info.messageId);
        });
      });

      invitation.create(
        {
          email: req.session.email,

          title: req.body.title,

          subtitle: req.body.subtitle,

          content: req.body.content,

          bg:req.body.bg,

          type:req.body.type,

          nameFont:req.body.nameFont,

          subFont:req.body.subFont,

          bodyFont:req.body.bodyFont,

          lat:req.body.lat,

          lng:req.body.lng,

          dateTime:req.body.dateTime,          

        },
        (error, post) => {
          console.log(error, post);
        }
      );
    }
  });

};
