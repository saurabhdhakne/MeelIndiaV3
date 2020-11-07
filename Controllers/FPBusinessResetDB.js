const mongoose = require("mongoose");

const sha256 = require("sha256");

const business = require("../database/models/business");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

module.exports = async (req, res) => {
  try {
    var url = `${process.env.db}`;

    var flag = false;

    await mongoose.connect(url, async (err, db) => {
      if (err) {
        console.log("Unable to connect");
      } else {
        await business.find(
          { email: req.body.email, active: true },
          (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
              flag = true;
            } else {
              console.log("Invalid Details");
            }
          }
        );
        if (flag) {
          await business.updateOne(
            { email: req.body.email, active: true },
            { $set: { enc: "", password: sha256(req.body.password) } },
            function (err, res) {
              if (err) throw err;
              console.log("1 document updated");
            }
          );
          res.render("passwordResetSuccess");
        } else {
          res.render("accountActivated2");
        }
      }
      db.close();
    });
  } catch (e) {
    console.log("Invalid Details");
    res.send("Invalid Request");
  }
};
