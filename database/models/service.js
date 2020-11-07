const mongoose = require("mongoose");

const DatabaseSchema = new mongoose.Schema({
  email: String,

  title: String,

  tags: String,

  desc: String,

  startDate: {
    type: String,

    default: new Date(),
  },

  endDate: String,

  address: String,

  image: {
    type: String,

    default: "./images/dummy.png",
  },
});

const service = mongoose.model("service", DatabaseSchema);

module.exports = service;
