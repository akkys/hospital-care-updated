import React, { useEffect } from "react";

const ContactUs = () => {
  useEffect(() => {
    document.title = "Contact Us | A S K Hospital";
  });
  return (
    <div className="container home-container mb-5">
      <h4 className="mb-5">Contact Us</h4>
      <div className="row col-md-6">
        <div className="col-md-1">
          <h6>
            <i className="fa fa-map-marker fa-lg" />
          </h6>
        </div>
        <div className="col-md-11">
          <h5>
            #152, 2nd Cross, 3rd Main,
            <br /> Rajajinagar, Bangalore - 560098
          </h5>
        </div>
      </div>
      <div className="row col-md-6 ">
        <div className="col-md-1">
          <h6>
            <i className="fa fa-envelope fa-lg" />
          </h6>
        </div>
        <div className="col-md-11">
          <h5>deanoffice@askh.ac.in</h5>
        </div>
      </div>
      <h5 className="text-secondary ml-3 mt-3 mb-3">
        For Appointment / Enquiry
      </h5>
      <div className="row col-md-6 ">
        <div className="col-md-1">
          <h6>
            <i className="fa fa-phone-square fa-lg" />
          </h6>
        </div>
        <div className="col-md-11">
          <h5>080 85647854</h5>
        </div>
      </div>
      <div className="row col-md-6">
        <div className="col-md-1">
          <h6>
            <i className="fa fa-users fa-lg" />
          </h6>
        </div>
        <div className="col-md-11">
          <h5>080 85798475</h5>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
