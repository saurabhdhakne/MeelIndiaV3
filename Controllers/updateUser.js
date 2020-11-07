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
        await user.updateOne(
          { _id: req.body._id },
          {
            $set: {
              fname: req.body.fname,
              lname: req.body.lname,
              gender: req.body.gender,
              contact: req.body.contact,
              linkedinLink: req.body.linkedinLink,
              igLink: req.body.igLink,
              fbLink: req.body.fbLink,
            },
          },
          function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
          }
        );
        res.redirect("ProfileUser");
      }
      db.close();
    });
  } catch (e) {
    console.log("Invalid Details");
    res.send("Invalid Request");
  }
};
