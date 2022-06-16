const router = require("express").Router();
let Appointment = require("../models/AppointmentModel");
const jwtAuth = require("../util");

router.post("/add", jwtAuth.isAuth, async (req, res) => {
  try {
    const {
      name,
      email,
      contact,
      address,
      city,
      zipcode,
      datetime,
      choose,
      docName,
    } = req.body;

    if (
      !name ||
      !email ||
      !contact ||
      !address ||
      !city ||
      !zipcode ||
      !datetime ||
      !choose ||
      !docName
    )
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const newAppointment = new Appointment({
      name,
      email,
      contact,
      address,
      city,
      zipcode,
      datetime,
      choose,
      docName,
      userId: req.user,
    });

    const savedAppointment = await newAppointment.save();
    res.json(savedAppointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/update/:id", jwtAuth.isAuth, async (req, res) => {
  try {
    const appointmentData = await Appointment.findByIdAndUpdate({
      userId: req.user,
      _id: req.params.id,
    });
    if (appointmentData) {
      appointmentData.name = req.body.name;
      appointmentData.email = req.body.email;
      appointmentData.contact = req.body.contact;
      appointmentData.address = req.body.address;
      appointmentData.city = req.body.city;
      appointmentData.zipcode = req.body.zipcode;
      appointmentData.datetime = req.body.datetime;
      appointmentData.choose = req.body.choose;
      appointmentData.docName = req.body.docName;
    }

    const updatedAppointment = await appointmentData.save();
    res.json(updatedAppointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", jwtAuth.isAuth, async (req, res) => {
  const appointmentData = await Appointment.find({ userId: req.user });
  res.json(appointmentData);
});

router.get("/:id", jwtAuth.isAuth, async (req, res) => {
  const appointmentData = await Appointment.findById({
    userId: req.user,
    _id: req.params.id,
  });
  res.json(appointmentData);
});

router.delete("/:id", jwtAuth.isAuth, async (req, res) => {
  const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
  res.json(deletedAppointment);
});

module.exports = router;
