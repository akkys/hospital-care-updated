const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

const db = "mongodb://localhost:27017/hospitalCareDb";

mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected to SERVER."))
  .catch((err) => console.log(err));

const userRoutes = require("./routes/UserRoute");
const apptRoutes = require("./routes/AppointmentRoute");
const doctorRoutes = require("./routes/DoctorRoute");
const roomRoutes = require("./routes/RoomRoute");
const patientRoutes = require("./routes/PatientRoute");
const wardRoutes = require("./routes/WardsRoute");
const branchRoutes = require("./routes/BranchRoute");

app.use("/appointments", apptRoutes);
app.use("/doctors", doctorRoutes);
app.use("/rooms", roomRoutes);
app.use("/patients", patientRoutes);
app.use("/wards", wardRoutes);
app.use("/branches", branchRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at PORT : ${PORT}`);
});
