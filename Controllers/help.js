const sha256 = require("sha256");

const youtuber = require("../database/models/user");
const marketer = require("../database/models/business");

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
        if (req.session.userType == "youtuber") {
          youtuber.find(
            {
              email: req.session.email,
              active: true,
            },
            (err, result) => {
              if (err) throw err;
              if (result.length > 0) {
                userData = result[0];
                res.render("help", {
                  userData,
                  user: req.session.userType,
                });
              } else {
                res.render("help");
              }
              db.close();
            }
          );
        } else if (req.session.userType == "marketer") {
          marketer.find(
            {
              email: req.session.email,
              active: true,
            },
            (err, result) => {
              if (err) throw err;
              if (result.length > 0) {
                userData = result[0];
                res.render("", {
                  userData,
                  user: req.session.userType,
                });
              } else {
                res.render("help");
              }
              db.close();
            }
          );
        } else {
          res.render("help");
        }
      }
    });
  } catch (e) {
    res.send("No User Found...");
  }
};
