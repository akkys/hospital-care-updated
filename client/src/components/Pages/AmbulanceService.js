import React, { useEffect } from "react";
import image from "../../img/ambulance.jpg";

const AmbulanceService = () => {
  useEffect(() => {
    document.title = "Ambulance Service | A S K Hospital";
  });
  return (
    <div className="container home-container">
      <h2>Ambulance Service</h2>
      <h5>
        The Ambulance Service is an integral part of Emergency Medicine
        Department. We have a fleet of ambulances with the necessary facilities,
        like monitors, defibrillators, ventilators and continuous oxygen supply.
        The fleet is supported by paramedics skilled in transportation of
        seriously ill patients and victims of road traffic accident.They are
        trained in Advanced Cardiac Life Support and Advanced Trauma Life
        Support
      </h5>
      <div className="row mt-5">
        <div className="col-md-3">
          <img src={image} alt="ambulance" width="100%" />
        </div>
        <div className="col-md-9">
          <h4 style={{ fontWeight: "500" }}>Help Line No :</h4>
          <br />
          <h5>
            +91 89748 74587 <br /> +91 98754 85748
          </h5>
        </div>
      </div>
    </div>
  );
};

export default AmbulanceService;
