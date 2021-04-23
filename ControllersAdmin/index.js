const sha256 = require("sha256");

const user = require("../database/models/user");


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
        if (req.session.userType == "admin") {
          user.find(
            {
              // active: true
            },
            (err, result) => {
              if (err) throw err;
              if (result.length > 0) {
                userData = result;
                
                len1 = result.length;
                
                res.render("index", {
                  userData,
                  len1
                });

              } else {
                res.send("0 Users Found");
              }
              db.close();
            }
          );
        }  else {
          res.redirect("adminLogin");
        }
      }
    });
  } catch (e) {
    res.send("No User Found...");
  }
};
