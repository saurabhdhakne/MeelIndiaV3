const sha256 = require("sha256");

const user = require("../database/models/user");

const blog = require("../database/models/blog");

const business = require("../database/models/business");

const mongoose = require("mongoose");
const { async } = require("crypto-random-string");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

module.exports = (req, res) => {
  try {
    var url = `${process.env.db}`;
    var blogs;
    var content1;
    var content;
    mongoose.connect(url,async (err, db) => {
      if (err) {
        console.log("Unable to connect");
      } else {

        await blog.find({_id:req.query.id}, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                blogs = result;
            }
        });
  
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
                res.render("blogPost", {
                  userData,
                  user: req.session.userType,
                  blogs
                });
              } else {
                res.render("blogPost",{
                    blogs
                });
              }
              db.close();
            }
          );
        } else if (req.session.userType == "business") {
          business.find(
            {
              email: req.session.email,
              active: true,
            },
            (err, result) => {
              if (err) throw err;
              if (result.length > 0) {
                userData = result[0];
                res.render("blogPost", {
                  userData,
                  user: req.session.userType,
                  blogs
                });
              } else {
                res.render("blogPost",{
                    blogs
                  });
              }
              db.close();
            }
          );
        } else {
            res.render("blogPost",{
                blogs
            });
        }
      }
    });
  } catch (e) {
    res.send("No User Found...");
  }
};
