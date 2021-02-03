require("dotenv").config();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const nodemailer = require("nodemailer");

const invitation = require("../database/models/invitationCustom");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

var fname;

module.exports = async (req, res) => {
  let upload = multer({
    storage: storage,
    fileFilter: imageFilter,
  }).single("image");

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

      image2 = `./uploads/invitations/${fname}`,
          
      toEmail = req.session.email;
      console.log(toEmail);
     

      invitation.create(
        {
          email: req.session.email,

          title: req.body.title,

          image: image2,
          
          lat:req.body.lat,

          lng:req.body.lng,

          dateTime:req.body.dateTime,      

        },
        (error, post) => {
            
          console.log(error, post);

          nodemailer.createTestAccount((err, account) => {
            let transporter = nodemailer.createTransport({
              host: "smtp.googlemail.com", // Gmail Host
              port: 465, // Port
              secure: true, // this is true as port is 465
              auth: {
                user: `${process.env.email}`, //Gmail username
                pass: `${process.env.emailpass}`, // Gmail password
              },
            });
    
            let mailOptions = {
              from: "MeelIndia",
              to: toEmail, // Recepient email address. Multiple emails can send separated by commas
              subject: "MeelIndia : Invitation Created",
              html: `<h1>Invitation Created Successully.</h1> <br> <br> 
               <br><br> 
              <h2 style="float:right"> Thank You. from :MeelIndia </h2> `,
            };
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                return console.log(error);
              }
              console.log("Message sent: %s", info.messageId);
              res.redirect("invitationCustom?id="+post._id);
              db.close();
            });
          });
        }
      );

      }
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
    cb(null, "./public/uploads/invitations");
  },

  filename: function (req, file, cb) {
    fname = file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, fname);
  },
});


