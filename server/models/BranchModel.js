const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const branchSchema = new Schema(
  {
    address: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    helpLine: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Branch = mongoose.model("Branch", branchSchema);

module.exports = Branch;
