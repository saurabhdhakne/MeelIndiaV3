const sha256 = require("sha256");

const business = require("../database/models/business");

const service = require("../database/models/service");

const mongoose = require("mongoose");
const { async } = require("crypto-random-string");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
var servicesData = [];
module.exports = (req, res) => {
  try {
    var url = `${process.env.db}`;

    mongoose.connect(url, (err, db) => {
      if (err) {
        console.log("Unable to connect");
      } else {
         business.find(
          {
            email: req.body.email,
            password: sha256(req.body.password),
          },
          async (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
              if (result[0].active) {
                userData = result[0];
                req.session.userType = "business";
                req.session.email = result[0].email;
                await service.find({ email: req.session.email }, (err, result) => {
                  if (err) throw err;
                  if (result.length > 0) {
                    servicesData = result;
                  }
                });

                res.render("profileBusiness", {
                  userData,
                  user: req.session.userType,
                  services: servicesData,
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
