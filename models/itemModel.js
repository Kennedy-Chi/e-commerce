const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  image: String,

  name: {
    type: String,
    unique: [true, "An item with this name already exist"],
  },

  category: String,

  buyingPrice: Number,

  sellingPrice: Number,

  description: String,

  buyingUnit: String,

  sellingUnit: String,

  color: Object,

  type: String,

  whished: Boolean,

  ratingNumber: Number,

  review: String,

  newPrice: Number,

  isPromo: Boolean,

  outputsPerInput: Number,

  status: {
    type: String,
    default: "Exhausted",
    enum: ["Good", "Warning", "Danger", "Exhausted"],
  },

  remaining: {
    type: [Number],
    default: [0, 0],
  },

  dateCreated: Number,

  availability: {
    type: Boolean,
    default: false,
  },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
