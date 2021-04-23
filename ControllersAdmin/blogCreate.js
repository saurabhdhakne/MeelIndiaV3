const mongoose = require("mongoose");

const blog = require("../database/models/blog");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

module.exports = (req, res) => {
  try {
    var url = `${process.env.db}`;

    mongoose.connect(url, async (err, db) => {
      if (err) {
        console.log("Unable to connect");
      } else {
        res.render("blogCreate");
      }
    });
  } catch (e) {
    res.send("Error");
  }
};