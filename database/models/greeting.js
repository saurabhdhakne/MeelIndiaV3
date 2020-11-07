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

const greeting = mongoose.model("greeting", DatabaseSchema);

module.exports = greeting;
