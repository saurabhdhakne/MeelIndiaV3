const mongoose = require("mongoose");

const DatabaseSchema = new mongoose.Schema({
  fname: String,

  lname: String,

  email: String,

  designation: {
    type: String,
    default: "designation",
  },

  tags: {
    type: String,
    default: "tags",
  },

  gender: {
    type: String,
    default: "gender",
  },

  contact: {
    type: String,
    default: "contact Number",
  },

  companyName: {
    type: String,
    default: "Company Name",
  },

  companyEmail: {
    type: String,
    default: "CompanyEmail",
  },

  Companycontact: {
    type: String,
    default: "Company Contact Number",
  },

  companybio: {
    type: String,
    default: "write short description about company.",
  },

  companyCategory: {
    type: String,
    default: "Company Category",
  },

  website: {
    type: String,
    default: "compay Website Link",
  },

  city: {
    type: String,
    default: "city",
  },

  state: {
    type: String,
    default: "State",
  },

  country: {
    type: String,
    default: "country",
  },

  image: {
    type: String,
    default: "./gifs/gif12.gif",
  },

  password: String,

  enc: String,

  active: Boolean,
});

const business = mongoose.model("business", DatabaseSchema);

module.exports = business;
