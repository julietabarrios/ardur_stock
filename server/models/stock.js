const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  name: { type: String, required: true},
  comment: { type: String, required: false},
  qty: { type: Number, required: true}
},
{strictQuery: false}
);

module.exports = mongoose.model("stock", stockSchema);