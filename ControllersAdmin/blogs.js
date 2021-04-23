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

        await blog.find(
          {
          
          },
          (err, blogs) => {
            if (err) throw err;
            if (blogs.length > 0) {
              res.render("blogs", {
                blogs,
                len:blogs.length
              });
            } else {
              res.render("blogs");
            }
            db.close();
          }
        );
      }
    });
  } catch (e) {
    res.send("No User Found...");
  }
};