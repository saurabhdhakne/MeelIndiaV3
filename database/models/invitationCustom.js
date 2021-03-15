const mongoose = require("mongoose");

const DatabaseSchema = new mongoose.Schema({

  email : String,

  title: String,

  dateTime : String,

  image : String,
  
  type: String,

  lng: String,

  lat: String,

  loc: String,

});

const invitationCustom = mongoose.model("invitationCustom", DatabaseSchema);

module.exports = invitationCustom;
