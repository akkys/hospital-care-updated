const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DocSchema = new Schema(
  {
    name: { type: String, required: true },
    expert: { type: String, required: true },
    desc: { type: String, required: true },
    time: { type: String, required: true },
    available: { type: String, required: true },
    exp: { type: String, required: true },
    contact: { type: String, required: true },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Docs = mongoose.model("Docs", DocSchema);

module.exports = Docs;
