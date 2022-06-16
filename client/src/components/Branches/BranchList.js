import React from "react";

const BranchList = (props) => {
  const { branch, openModal, deleteHandler, userInfo } = props;
  return (
    <div className="col-md-6 mb-3 mt-3">
      <div className="card border-secondary text-dark bg-light mb-3 ">
        <div className="card-body mt-3">
          <div className="row m-auto">
            <div className="col-md-1">
              <h6>
                <i className="fa fa-map-marker fa-lg" />
              </h6>
            </div>
            <div className="col-md-10">
              <h5>{branch.address}</h5>
            </div>
          </div>
          <div className="row m-auto">
            <div className="col-md-1">
              <h6>
                <i className="fa fa-envelope fa-lg" />
              </h6>
            </div>
            <div className="col-md-10">
              <h5>{branch.email}</h5>
            </div>
          </div>
          <h5 className="text-secondary ml-3 mt-3 mb-3">
            For Appointment / Enquiry
          </h5>
          <div className="row m-auto">
            <div className="col-md-1">
              <h6>
                <i className="fa fa-phone-square fa-lg" />
              </h6>
            </div>
            <div className="col-md-10">
              <h5>{branch.contact}</h5>
            </div>
          </div>
          <div className="row m-auto">
            <div className="col-md-1">
              <h6>
                <i className="fa fa-users fa-lg" />
              </h6>
            </div>
            <div className="col-md-10">
              <h5>Help Line : {branch.helpLine}</h5>
            </div>
          </div>
          {userInfo && (
            <>
              {" "}
              <span
                onClick={() => openModal(branch)}
                className="mt-3 ml-3 text-secondary float-left"
                style={{ cursor: "pointer" }}
              >
                Edit
              </span>
              <span
                onClick={() => deleteHandler(branch)}
                className="mt-3 mr-3 text-danger float-right"
                style={{ cursor: "pointer" }}
              >
                Remove
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BranchList;
