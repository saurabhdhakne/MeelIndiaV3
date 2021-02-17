const sha256 = require("sha256");

const user = require("../database/models/user");

const business = require("../database/models/business");

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
        if (req.session.userType == "user") {
          user.find(
            {
              email: req.session.email,
              active: true,
            },
            (err, result) => {
              if (err) throw err;
              if (result.length > 0) {
                userData = result[0];
                res.render("greetingCreate", {
                  userData,
                  user: req.session.userType,
                  type:req.query.type

                });
              } else {
                res.render("notfound");
              }
              db.close();
            }
          );
        } else if (req.session.userType == "business") {
          business.find(
            {
              email: req.session.email,
              active: true,
            },
            (err, result) => {
              if (err) throw err;
              if (result.length > 0) {
                userData = result[0];
                res.render("greetingCreate", {
                  userData,
                  user: req.session.userType,
                });
              } else {
                res.render("notfound");
              }
              db.close();
            }
          );
        } else {
          res.render("notfound");
        }
      }
    });
  } catch (e) {
    res.send("No User Found...");
  }
};
