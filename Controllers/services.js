const sha256 = require("sha256");

const business = require("../database/models/business");

const service = require("../database/models/service");

const user = require("../database/models/user");

const mongoose = require("mongoose");
const { async } = require("crypto-random-string");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
serviceData = [];
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

        service.find({}, (err, result) => {
          if (err) throw err;
          if (result.length > 0) {
            serviceData = result;
            if (req.session.userType != "") {
              res.render("services", {
                serviceData,
                user: req.session.userType,
                userData,
              });
            } else {
              res.render("services", {
                serviceData,
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
