const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
  description: Array,

  price: Number,

  customerId: String,

  customer: String,

  deliveredBy: String,

  checkInCheckOut: Array,

  paidBy: String,

  salesPoint: String,

  userStatus: String,

  status: {
    type: Boolean,
    default: false,
  },

  transaction: {
    type: Boolean,
    default: false,
  },

  day: String,

  time: String,

  formatedDate: String,
});

const Sales = mongoose.model("Sales", salesSchema);

module.exports = Sales;
