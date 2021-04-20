const sha256 = require("sha256");

const user = require("../database/models/user");

const mongoose = require("mongoose");

const { async } = require("crypto-random-string");

const invitation = require("../database/models/invitation");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

invitationData = [];

module.exports = (req, res) => {
  try {
    var url = `${process.env.db}`;

    mongoose.connect(url, async (err, db) => {
      if (err) {
        console.log("Unable to connect");
      } else {
        await invitation.find({ _id: req.query.id }, (err, result) => {
          if (err) throw err;
          if (result.length > 0) {
            invitationData = result;
            res.render("invitation2", {
                invitations : invitationData,
              });
          }
        });

      }
    });
    
  } catch (e) {
    res.send("No User Found...");
  }
};
