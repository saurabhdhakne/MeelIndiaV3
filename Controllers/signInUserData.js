const sha256 = require("sha256");

const user = require("../database/models/user");

const invitation = require("../database/models/invitation");

const greeting = require("../database/models/greeting");

const invitationCustom = require("../database/models/invitationCustom");

const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

module.exports = (req, res) => {
  try {
    var url = `${process.env.db}`;

    mongoose.connect(url, (err, db) => {
      if (err) {
        console.log("Unable to connect");
      } else {

        invitationData = [];
        invitationData2 = [];
        greetingData = [];
        result = [];
        result2 = [];
        result3 = [];

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
                
                await invitation.find({ email: req.session.email }, (err, result1) => {
                  if (err) throw err;
                  if (result1.length > 0) {
                    invitationData = result1;
                  }
                });
                await invitationCustom.find({ email: req.session.email }, (err, result2) => {
                  if (err) throw err;
                  if (result2.length > 0) {
                    invitationData2 = result2;
                  }
                });
                await greeting.find({ email: req.session.email }, (err, result3) => {
                  if (err) throw err;
                  if (result3.length > 0) {
                    greetingData = result3;
                  }
                });

               res.redirect("/");

                //res.redirect('/');

              } else {
                res.render("accountCreated");
              }
            } else {
              res.render("checkCredential");
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
