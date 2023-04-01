const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyName: String,
  systemEmail: String,
  companyAccountName: String,
  companyBankName: String,
  companyAccountNumber: String,
  invoiceNumber: Number,
  socials: Array,
  coloredSocials: Array,
  media: Array,
  coloredMedia: Array,
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
