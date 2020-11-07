const mongoose = require("mongoose");

const greeting = require("../database/models/greeting");

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
        await greeting.updateOne(
          { _id: req.body._id, email : req.session.email },
          {
            $set: {
              title: req.body.title,
              subtitle: req.body.subtitle,
              content: req.body.content,
            },
          },
          function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
          }
        );
        res.redirect("profileUser");
      }
      db.close();
    });
  } catch (e) {
    console.log("Invalid Details");
    res.send("Invalid Request");
  }
};
