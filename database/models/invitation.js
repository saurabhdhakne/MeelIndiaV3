const mongoose = require("mongoose");

const DatabaseSchema = new mongoose.Schema({

  email : String,

  title: String,

  subtitle: String,

  content: String,

  dateTime : String,

  nameFont : String,

  bodyFont : String,
  
  subFont : String,

  bg: String,

  type: String,

  lng: String,

  lat: String,

});

const invitation = mongoose.model("invitation", DatabaseSchema);

module.exports = invitation;
