const mongoose = require("mongoose");

const user = require("../database/models/user");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

module.exports = async (req, res) => {
  try {
    var url = `${process.env.db}`;

    await mongoose.connect(url, async (err, db) => {
      if (err) {
        console.log("Unable to connect");
      } else {
        await user.updateOne(
          { email: req.body.email },
          { $set: { active: false } },
          function (err, res) {
            if (err) throw err;
            req.session = null;
            console.log("1 document updated");
          }
        );
        res.render("accountActivated3");
      }
      db.close();
    });
  } catch (e) {
    console.log("Invalid Details");
    res.send("Invalid Request");
  }
};
