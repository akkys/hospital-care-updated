const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    num: { type: String, required: true },
    name: { type: String, required: true },
    capacity: { type: String, required: true },
    groups: { type: String, required: true },
    fromTime: { type: String, required: true },
    toTime: { type: String, required: true },
  },

  {
    timestamps: true,
  }
);

const Rooms = mongoose.model("Rooms", roomSchema);

module.exports = Rooms;
