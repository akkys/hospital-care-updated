const mongoose = require("mongoose");
const { schema } = require("./DoctorModel");

const Schema = mongoose.Schema;

const AddPatient = new Schema({
  pid: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: String, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  admitDate: { type: Date, required: true },
  status: { type: String, required: true },
  contact: { type: String, required: true },
  roomNum: { type: String, required: true },
  roomType: { type: String, required: true },
  docName: { type: String, required: true },
});

const Patient = mongoose.model("Patient", AddPatient);

module.exports = Patient;
