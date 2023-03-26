const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
  category: String,
  question: String,
  answer: String,
  status: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const Faq = mongoose.model("Faq", faqSchema);

module.exports = Faq;
