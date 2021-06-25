const sha256 = require("sha256");

const user = require("../database/models/user");

const mongoose = require("mongoose");

const { async } = require("crypto-random-string");

const invitation = require("../database/models/invitationCustom");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);


module.exports = (req, res) => {
  try {
    var url = `${process.env.db}`;
    invitationData = [];
    mongoose.connect(url, async (err, db) => {
      if (err) {
        console.log("Unable to connect");
      } else {
        await invitation.find({ _id: req.query.id }, (err, result) => {
          if (err) throw err;
          if (result.length > 0) {
            invitationData = result;
            res.render("invitationCustom2", {
              invitations : invitationData,
            });
            console.log(invitationData[0]._id);
          }
        });

      }
    });
    
  } catch (e) {
    res.send("No User Found...");
  }
};
