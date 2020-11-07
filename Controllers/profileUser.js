const sha256 = require("sha256");

const user = require("../database/models/user");

const mongoose = require("mongoose");

const { async } = require("crypto-random-string");

const invitation = require("../database/models/invitation");

const greeting = require("../database/models/greeting");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

invitationData = [];
greetingData = [];

module.exports = (req, res) => {
  try {
    var url = `${process.env.db}`;

    mongoose.connect(url, async (err, db) => {
      if (err) {
        console.log("Unable to connect");
      } else {
        await invitation.find({ email: req.session.email }, (err, result) => {
          if (err) throw err;
          if (result.length > 0) {
            invitationData = result;
          }
        });
        await greeting.find({ email: req.session.email }, (err, result) => {
          if (err) throw err;
          if (result.length > 0) {
            greetingData = result;
          }
        });

        await user.find(
          {
            email: req.session.email,
            active: true,
          },
          (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
              userData = result[0];
              res.render("profileUser", {
                userData,
                user: req.session.userType,
                invitations : invitationData,
                greetings : greetingData,
              });
            } else {
              res.render("notfound");
            }
            db.close();
          }
        );
      }
    });
  } catch (e) {
    res.send("No User Found...");
  }
};
