const mongoose = require("mongoose");

const invitation = require("../database/models/greetingCustom");

const blog = require("../database/models/blog");

const sha256 = require("sha256");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

module.exports = async (req, res) => {
  try {
    
    var url = `${process.env.db}`;
    var flag = 0;
    await mongoose.connect(url, async (err, db) => {
      
      if (err) {
        console.log("Unable to connect");
      } else {
        await blog.find(
          {
            _id: req.query.id,
          },
           (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
              flag = 1;
            } else {
              res.render("notfound");
            }
          }
        );
        
        if(flag){
          await blog.deleteOne({ _id: req.query.id }, function (err, res) {
            if (err) throw err;
              console.log("1 document Deleted");
          });
          res.redirect("/blogs");
        }
        else{
          res.redirect("/blogs");
        }
      }
      db.close();
    });
  } catch (e) {
    console.log("Invalid Details");
    res.send("Invalid Request");
  }
};
