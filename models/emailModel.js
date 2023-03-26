const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  title: String,
  template: String,
  content: String,
  banner: String,
  bannerUrl: String,
  url: String,
  dateCreated: {
    type: Date,
    default: new Date(),
  },
});

const Email = mongoose.model("Email", emailSchema);

module.exports = Email;
