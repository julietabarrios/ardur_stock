const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true},
  description: { type: String, required: true},
  limitRed: { type: Number, required: true},
  limitBlack: { type: Number, required: true},
},
{strictQuery: false}
);

module.exports = mongoose.model("product", productSchema);