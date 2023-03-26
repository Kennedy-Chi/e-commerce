const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  page: String,
  intro: String,
  title: String,
  image: String,
  status: {
    type: Boolean,
    default: false,
  },
  dateCreated: Date,
});

const Banner = mongoose.model("Banner", bannerSchema);

module.exports = Banner;
