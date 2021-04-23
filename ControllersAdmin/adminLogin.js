const sha256 = require("sha256");

const user = require("../database/models/user");

const business = require("../database/models/business");

const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

module.exports = (req, res) => {
    try{
        res.render('adminLogin');   
    }catch (e) {
        res.send("No User Found...");
  }
};
