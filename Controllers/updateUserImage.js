require("dotenv").config();
const user = require("../database/models/user");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

var fname;

module.exports = async (req, res) => {
  let upload = multer({
    storage: storage,
    fileFilter: imageFilter,
  }).single("profile_pic");

  upload(req, res, function (err) {
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }
    var url = `${process.env.db}`;

    mongoose.connect(url, async (err, db) => {
      if (err) {
        console.log("Unable to connect");
      } else {
        await user.updateOne(
          { _id: req.body._id },
          {
            $set: {
              image: `./uploads/user/${fname}`,
            },
          },
          function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
          }
        );
        res.redirect("/profileUserData");
      }
      db.close();
    });
  });
};
const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/user");
  },

  filename: function (req, file, cb) {
    fname = file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, fname);
  },
});
