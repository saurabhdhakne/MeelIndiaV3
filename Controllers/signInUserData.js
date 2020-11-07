const sha256 = require("sha256");

const user = require("../database/models/user");

const invitation = require("../database/models/invitation");

const greeting = require("../database/models/greeting");

const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

invitationData = [];
greetingData = [];

module.exports = (req, res) => {
  try {
    var url = `${process.env.db}`;

    mongoose.connect(url, (err, db) => {
      if (err) {
        console.log("Unable to connect");
      } else {
        user.find(
          {
            email: req.body.email,
            password: sha256(req.body.password),
          },
          async (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
              if (result[0].active) {
                
                userData = result[0];
                req.session.userType = "user";
                req.session.email = result[0].email;
                
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

                res.render("profileUser", {
                    userData,
                    user: req.session.userType,
                    invitations : invitationData,
                    greetings : greetingData,

                  });
              } else {
                res.render("accountCreated");
              }
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
