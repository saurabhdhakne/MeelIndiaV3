const sha256 = require("sha256");

const user = require("../database/models/user");

const business = require("../database/models/business");

const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

module.exports = (req, res) => {
  try {
    var url = `${process.env.db}`;

    mongoose.connect(url, (err, db) => {
      if (err) {
        console.log("Unable to connect");
      } else {
        if (req.session.userType == "user") {
          user.find(
            {
              email: req.session.email,
              active: true,
            },
            (err, result) => {
              if (err) throw err;
              if (result.length > 0) {
                userData = result[0];
                  if(req.query.type)
                {
                  res.render("invitationCreate", {
                  userData,
                  user: req.session.userType,
                  type:req.query.type
                  });
                }else{
                  res.redirect("/")
                }
              } else {
                res.redirect("SignInUser");
              }
              db.close();
            }
          );
        } else {
            res.redirect("SignInUser");
        }
      }
    });
  } catch (e) {
    res.send("No User Found...");
  }
};
