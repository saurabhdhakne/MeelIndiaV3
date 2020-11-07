const mongoose = require("mongoose");

const marketer = require("../database/models/business");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

module.exports = async (req, res) => {
  try {
    var url = `${process.env.db}`;

    await mongoose.connect(url, async (err, db) => {
      if (err) {
        console.log("Unable to connect");
      } else {
        await marketer.updateOne(
          { _id: req.body._id },
          {
            $set: {
              fname: req.body.fname,
              lname: req.body.lname,
              gender: req.body.gender,
              contact: req.body.contact,
              designation: req.body.designation,
              companyName: req.body.companyName,
              companyEmail: req.body.companyEmail,
              companybio: req.body.companybio,
              Companycontact: req.body.Companycontact,
              companyCategory: req.body.companyCategory,
              website: req.body.website,
              city: req.body.city,
              state: req.body.state,
              country: req.body.country,
            },
          },
          function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
          }
        );
        res.redirect("profileBusiness");
      }
      db.close();
    });
  } catch (e) {
    console.log("Invalid Details");
    res.send("Invalid Request");
  }
};
