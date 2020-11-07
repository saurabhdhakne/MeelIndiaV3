const mongoose = require("mongoose");

const service = require("../database/models/service");

const business = require("../database/models/business");

const sha256 = require("sha256");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

module.exports = async (req, res) => {
  try {
    var url = `${process.env.db}`;

    await mongoose.connect(url, async (err, db) => {
      console.log(req.body);
      if (err) {
        console.log("Unable to connect");
      } else {
        await business.find(
          {
            email: req.body.email,
            password: sha256(req.body.password),
          },
          (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
              service.deleteOne({ _id: req.body._id }, function (err, res) {
                if (err) throw err;
                console.log("1 document Deleted");
              });
              res.redirect("/profileBusiness");
            } else {
              res.render("notfound");
            }
          }
        );
      }
      db.close();
    });
  } catch (e) {
    console.log("Invalid Details");
    res.send("Invalid Request");
  }
};
