const sha256 = require("sha256");

const business = require("../database/models/business");

const service = require("../database/models/service");

const mongoose = require("mongoose");
const { async } = require("crypto-random-string");
const services = require("./services");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
servicesData = [];
module.exports = (req, res) => {
  try {
    var url = `${process.env.db}`;

    mongoose.connect(url, async (err, db) => {
      if (err) {
        console.log("Unable to connect");
      } else {
        await service.find({ email: req.session.email }, (err, result) => {
          if (err) throw err;
          if (result.length > 0) {
            servicesData = result;
          }
        });

        await business.find(
          {
            email: req.session.email,
            active: true,
          },
          (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
              userData = result[0];
              res.render("profileBusiness", {
                userData,
                user: req.session.userType,
                services: servicesData,
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
