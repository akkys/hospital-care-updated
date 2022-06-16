import React from "react";
import { Button, Modal } from "react-bootstrap";

const AppointmentDetails = ({
  appt,
  showApptDetailModal,
  closeApptDetailModal,
  time,
  openDeleteModal,
}) => {
  return (
    <Modal
      className="modal-container appt-modal"
      show={showApptDetailModal}
      onHide={closeApptDetailModal}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Appointment Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6">
            <label>Name :</label> <span>{appt.name}</span>
          </div>
          <div className="col-md-6">
            <label>Date :</label> <span>{time}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label>Contact :</label> <span>{appt.contact}</span>
          </div>
          <div className="col-md-6">
            <label>Doctor :</label> <span>{appt.docName}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label>Email :</label>{" "}
            {appt.email ? (
              <span>{appt.email}</span>
            ) : (
              <span>Not Mentioned</span>
            )}
          </div>
          <div className="col-md-6">
            <label>Reason :</label> <span>{appt.choose}</span>
          </div>
        </div>

        <div>
          <label>Address :</label> <span>{appt.address}</span>
        </div>
        <div>
          <label>City :</label> <span>{appt.city}</span>
        </div>
        <div>
          <label>Zipcode :</label> <span>{appt.zipcode}</span>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => openDeleteModal(appt._id)}
        >
          Delete Appointment
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AppointmentDetails;
