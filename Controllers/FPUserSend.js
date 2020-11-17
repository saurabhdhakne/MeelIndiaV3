const mongoose = require("mongoose");

const cryptoRandomString = require("crypto-random-string");

const nodemailer = require("nodemailer");

const user = require("../database/models/user");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

module.exports = async (req, res) => {
  try {
    var url = `${process.env.db}`;

    var flag = false;

    await mongoose.connect(url, async (err, db) => {
      if (err) {
        console.log("Unable to connect");
      } else {
        console.log(req.body.email);
        await user.find({ email: req.body.email }, (err, result) => {
          if (err) throw err;
          if (result.length > 0) {
            flag = true;
          } else {
            console.log("Invalid Details");
          }
        });
        if (flag) {
          randomString = cryptoRandomString({
            length: 50,
            type: "alphanumeric",
          });
          await user.updateOne(
            { email: req.body.email },
            { $set: { enc: randomString, active: true } },
            function (err, res) {
              if (err) throw err;
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
                  from: "Saurabh Dhakne",
                  to: req.body.email, // Recepient email address. Multiple emails can send separated by commas
                  subject: "MeelIndia : Password Reset",
                  html: `<h1> MeelIndia Account Password Reset.</h1> <br> <br> 
                  <h2> <a href='${process.env.ip}/FPUserReset?enc=${randomString}'> <strong> Click Here </strong> </a> <br> to Reset Password, Please do not share your password with anyone else.</h2> <br><br> 
                  <h2 style="float:right"> Thank You. from : MeelIndia </h2>`,
                };
                transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                    return console.log(error);
                  }
                  console.log("Message sent: %s", info.messageId);
                });
              });

              console.log("1 document updated");
            }
          );
          res.render("passwordResetSent");
        } else {
          res.render("notfound");
        }
      }
      db.close();
    });
  } catch (e) {
    console.log("Invalid Details");
    res.send("Invalid Request");
  }
};
