const sha256 = require("sha256");

const user = require("../database/models/user");

const mongoose = require("mongoose");

const { async } = require("crypto-random-string");

const invitation = require("../database/models/invitation");

const invitationCustom = require("../database/models/invitationCustom");

const greetingCustom = require("../database/models/greetingCustom");

const greeting = require("../database/models/greeting");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);


module.exports = (req, res) => {
  try {
    var url = `${process.env.db}`;

    mongoose.connect(url, async (err, db) => {
      if (err) {
        console.log("Unable to connect");
      } else {
        
        invitationData = [];
        invitationData2 = [];
        greetingData = [];
        greetingData2 = [];
        var result1 = 0;
        var result2 = 0;
        var result3 = 0;
        var result4 = 0;

        await invitation.find({ email: req.query.email }, (err, result) => {
          if (err) throw err;
          result1 = result.length;
          if (result1 > 0) {
            invitationData = result;
          }
        });

        await invitationCustom.find({ email: req.query.email }, (err, result) => {
          if (err) throw err;
          result2 = result.length;
          if (result2 > 0) {
            invitationData2 = result;
          }
        });
        await greeting.find({ email: req.query.email }, (err, result) => {
          if (err) throw err;
          result3 = result.length;
          if (result3 > 0) {
            greetingData = result;
          }
        });
        await greetingCustom.find({ email: req.query.email }, (err, result) => {
          if (err) throw err;
          result4 = result.length;
          if (result4 > 0) {
            greetingData2 = result;
          }
        });

        await user.find(
          {
            email: req.query.email,
          },
          (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
              userData = result[0];
              res.render("invitations", {
                userData,
                invitations : invitationData,
                invitationsCustom : invitationData2,
                greetingsCustom : greetingData2,
                greetings : greetingData,
                length1 : result1,
                length2 : result2,
                length3 : result3,
                length4 : result4,
              });
            } else {
              res.render("invitations");
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
