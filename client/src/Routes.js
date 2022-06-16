import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppointmentListPage from "./components/Appointments/AppointmentListPage";
import LoginPage from "./components/Auth/LoginPage";
import RegisterPage from "./components/Auth/RegisterPage";
import BranchListPage from "./components/Branches/BranchListPage";
import DoctorListPage from "./components/Doctors/DoctorListPage";
import LabRoomPage from "./components/LabRooms/LabRoomPage";
import NavigationBar from "./components/Layout/NavigationBar";
import AmbulanceService from "./components/Pages/AmbulanceService";
import ContactUs from "./components/Pages/ContactUs";
import HomePage from "./components/Pages/HomePage";
import PatientListPage from "./components/Patients/PatientListPage";
import WardsListPage from "./components/Wards/WardsListPage";

const Routes = () => {
  return (
    <div>
      <Router>
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/home" component={HomePage} />
          <Route path="/ambulanceService" component={AmbulanceService} />
          <Route path="/contactUs" component={ContactUs} />
          <Route path="/appointmentList" component={AppointmentListPage} />
          <Route path="/doctorsList" component={DoctorListPage} />
          <Route path="/patientList" component={PatientListPage} />
          <Route path="/wardsList" component={WardsListPage} />
          <Route path="/branchList" component={BranchListPage} />
          <Route path="/labRoomList" component={LabRoomPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default Routes;
