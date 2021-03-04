const mongoose = require("mongoose");

const DatabaseSchema = new mongoose.Schema({

  email : String,

  title: String,

  dateTime : String,

  image : String,
  
  type: String,

  lng: String,

  lat: String,

});

const greetingCustom = mongoose.model("greetingCustom", DatabaseSchema);

module.exports = greetingCustom;
