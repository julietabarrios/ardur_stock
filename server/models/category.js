const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema({
  name: { type: String, required: true}
},
{strictQuery: false}
);

module.exports = mongoose.model("category", positionSchema);