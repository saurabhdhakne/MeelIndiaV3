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
    if(req.body.email == "admin@mail.com" && req.body.password == "123" ){
     
      req.session.userType = "admin";
      res.redirect('/');

    }
  } catch (e) {
    res.send("No User Found...");
  }
};
