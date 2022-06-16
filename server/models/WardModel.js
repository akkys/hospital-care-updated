const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AddWard = new Schema(
  {
    roomType: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Wards = mongoose.model("Wards", AddWard);

module.exports = Wards;
