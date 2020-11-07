const mongoose = require("mongoose");

const DatabaseSchema = new mongoose.Schema({
  fname: String,

  lname: String,

  email: String,

  gender: {
    type: String,
    default: "Gender",
  },

  contact: {
    type: String,
    default: "contact Number",
  },

  image: {
    type: String,
    default: "./gifs/user.png",
  },

  fbLink: {
    type: String,
    default: "facebook.com",
  },

  igLink: {
    type: String,
    default: "instagram.com",
  },

  linkedinLink: {
    type: String,
    default: "linkedin.com",
  },

  password: String,

  enc: String,

  active: Boolean,
});

const user = mongoose.model("user", DatabaseSchema);

module.exports = user;
