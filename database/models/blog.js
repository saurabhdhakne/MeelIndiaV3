const mongoose = require("mongoose");

const DatabaseSchema = new mongoose.Schema({
  

  title : String,

  img : String,
  
  dateTime: String,

  content: String,

  active: {
        type : Boolean,
        default : true   
  },

});

const blog = mongoose.model("blog", DatabaseSchema);

module.exports = blog;
