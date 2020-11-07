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
        if (req.session.userType == "business") {
          await business.find(
            {
              email: req.session.email,
              active: true,
            },
            (err, result) => {
              if (err) throw err;
              if (result.length > 0) {
                userData = result[0];

                res.render("servicesForm", {
                  userData,
                  user: req.session.userType,
                });
              }
            }
          );
        }
      }
    });
  } catch (e) {
    res.send("No User Found...");
  }
};
