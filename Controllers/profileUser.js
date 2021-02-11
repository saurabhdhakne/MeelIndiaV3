const sha256 = require("sha256");

const user = require("../database/models/user");

const mongoose = require("mongoose");

const { async } = require("crypto-random-string");

const invitation = require("../database/models/invitation");

const invitationCustom = require("../database/models/invitationCustom");

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
        result = [];
        result2 = [];
        result3 = [];

        await invitation.find({ email: req.session.email }, (err, result1) => {
          if (err) throw err;
          if (result1.length > 0) {
            invitationData = result1;
          }
        });
        await invitationCustom.find({ email: req.session.email }, (err, result2) => {
          if (err) throw err;
          if (result2.length > 0) {
            console.log(result2);
            invitationData2 = result2;
          }
        });
        await greeting.find({ email: req.session.email }, (err, result3) => {
          if (err) throw err;
          if (result3.length3 > 0) {
            greetingData = result3;
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
                invitationsCustom : invitationData2,
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
