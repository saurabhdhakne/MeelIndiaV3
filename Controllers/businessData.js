const sha256 = require("sha256");

const business = require("../database/models/business");

const user = require("../database/models/user");

const mongoose = require("mongoose");
const { async } = require("crypto-random-string");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

module.exports = (req, res) => {
  try {
    var url = `${process.env.db}`;
    var userData;
    mongoose.connect(url, async (err, db) => {
      if (err) {
        console.log("Unable to connect");
      } else {
        if (req.session.userType == "user") {
          await user.find(
            {
              email: req.session.email,
              active: true,
            },
            (err, result) => {
              if (err) throw err;
              if (result.length > 0) {
                userData = result[0];
              }
            }
          );
        } else if (req.session.userType == "business") {
          await business.find(
            {
              email: req.session.email,
              active: true,
            },
            (err, result) => {
              if (err) throw err;
              if (result.length > 0) {
                userData = result[0];
              }
            }
          );
        }

        business.find({ active: true }, (err, result) => {
          if (err) throw err;
          if (result.length > 0) {
            businessData = result;
            if (req.session.userType != "") {
              res.render("businessData", {
                businessData,
                user: req.session.userType,
                userData,
              });
            } else {
              res.render("businessData", {
                businessData,
              });
            }
          } else {
            res.render("notfound");
          }
          db.close();
        });
      }
    });
  } catch (e) {
    res.send("No User Found...");
  }
};
