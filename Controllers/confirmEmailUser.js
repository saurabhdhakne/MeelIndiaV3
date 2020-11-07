const mongoose = require("mongoose");

const user = require("../database/models/user");

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
        await user.find({ enc: req.query.enc }, (err, result) => {
          if (err) throw err;
          if (result.length > 0) {
            if (!result[0].active) {
              flag = true;
            }
          } else {
            console.log("Invalid Details");
          }
        });
        if (flag) {
          await user.updateOne(
            { enc: req.query.enc },
            { $set: { active: true, enc: "" } },
            function (err, res) {
              if (err) throw err;
              console.log("1 document updated");
            }
          );
          res.render("accountActivated");
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
