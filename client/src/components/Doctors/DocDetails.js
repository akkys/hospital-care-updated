import React from "react";
import { Button, Modal } from "react-bootstrap";

const DocDetails = (props) => {
  const { showDocDetails, closeDocModal, docs, img } = props;

  return (
    <Modal
      className="modal-container"
      show={showDocDetails}
      onHide={closeDocModal}
      size="md"
    >
      <Modal.Header closeButton>
        <Modal.Title>Doctor Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3 mt-3 card-container">
          <div className=" ">
            <div className="row">
              <div className="col-md-3">
                <img src={img} className="card-img" alt="..." />
              </div>
              <div className="col-md-9">
                <div className="card-body">
                  <h4 className="card-title">Dr .{docs.name}</h4>
                  <h6 className="card-text">Experience : {docs.exp} Year(s)</h6>
                  <span className="card-text">
                    Specialist in : {docs.expert}
                  </span>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-7">
                  <h6>
                    Available at : <span>{docs.available}</span>
                  </h6>
                </div>
                <div className="col-md-5">
                  <h6>
                    Duty Timings:{" "}
                    <span>
                      {docs.time}
                      {""} Hrs.
                    </span>
                  </h6>
                </div>
              </div>
              <h6>Contact : {docs.contact}</h6>
              <p className="card-text">About: {docs.desc} </p>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeDocModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DocDetails;
