const mongoose = require("mongoose");

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
          { enc: req.query.enc, active: true },
          (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
              res.render("FPBusinessSet", { email: result[0].email });
            } else {
              console.log("Invalid Details");
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
