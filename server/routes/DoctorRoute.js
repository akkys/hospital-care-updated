const router = require("express").Router();
const Docs = require("../models/DoctorModel");
const Patient = require("../models/PatientModel");
const jwtAuth = require("../util");

router.get("/", async (req, res) => {
  const docsData = await Docs.find();
  res.json(docsData);
});

router.get("/:id", async (req, res) => {
  const docsData = await Patient.findById({
    userId: req.user,
    _id: req.params.id,
  });
  res.json(docsData);
});

router.post("/add", jwtAuth.isAuth, async (req, res) => {
  try {
    const { name, expert, desc, time, available, exp, contact } = req.body;

    if (!name || !expert || !desc || !time || !available || !exp || !contact)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const newDocs = new Docs({
      name,
      expert,
      desc,
      time,
      available,
      exp,
      contact,
      userId: req.user,
    });

    const savedDocs = await newDocs.save();
    res.json(savedDocs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", jwtAuth.isAuth, async (req, res) => {
  const deletedDocs = await Docs.findByIdAndDelete(req.params.id);
  res.json(deletedDocs);
});

router.post("/update/:id", jwtAuth.isAuth, async (req, res) => {
  try {
    const docsData = await Docs.findByIdAndUpdate({
      userId: req.user,
      _id: req.params.id,
    });
    if (docsData) {
      docsData.name = req.body.name;
      docsData.expert = req.body.expert;
      docsData.desc = req.body.desc;
      docsData.time = req.body.time;
      docsData.available = req.body.available;
      docsData.exp = req.body.exp;
      docsData.contact = req.body.contact;
    }

    const updatedDocs = await docsData.save();
    res.json(updatedDocs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
