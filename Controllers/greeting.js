const sha256 = require("sha256");

const user = require("../database/models/user");

const mongoose = require("mongoose");

const { async } = require("crypto-random-string");

const greeting = require("../database/models/greeting");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

greetingData = [];

module.exports = (req, res) => {
  try {
    var url = `${process.env.db}`;

    mongoose.connect(url, async (err, db) => {
      if (err) {
        console.log("Unable to connect");
      } else {
        await greeting.find({ _id: req.query.id }, (err, result) => {
          if (err) throw err;
          if (result.length > 0) {
            greetingData = result;
                res.render("greeting", {
                    greetings : greetingData,
                });
          }
        });

      }
    });
  } catch (e) {
    res.send("No User Found...");
  }
};
