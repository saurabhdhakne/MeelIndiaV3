const mongoose = require("mongoose");

const service = require("../database/models/service");

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
        await service.updateOne(
          { _id: req.body._id },
          {
            $set: {
              title: req.body.title,
              desc: req.body.desc,
              address: req.body.address,
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
