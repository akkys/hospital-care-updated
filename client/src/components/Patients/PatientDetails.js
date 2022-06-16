import React from "react";
import { Button, Modal } from "react-bootstrap";

const PatientDetails = ({
  showPatientDetailModal,
  closePatientDetailModal,
  patient,
  admitDate,
  openDeleteModal,
}) => {
  return (
    <Modal
      className="modal-container appt-modal"
      show={showPatientDetailModal}
      onHide={closePatientDetailModal}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Patient Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="details-modal">
        <div className="row ">
          <div className="col-md-6">
            <label>Name :</label> <span>{patient.name}</span>
          </div>
          <div className="col-md-6">
            <label>Patient ID :</label> <span>{patient.pid}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label>Contact :</label> <span>{patient.contact}</span>
          </div>
          <div className="col-md-6">
            <label>Admission Date :</label> <span>{admitDate}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label>Gender :</label> <span>{patient.gender}</span>
          </div>
          <div className="col-md-6">
            <label>Room No. :</label> <span>{patient.roomNum}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label>Age :</label> <span>{patient.age}</span>
          </div>
          <div className="col-md-6">
            <label>Room Type :</label> <span>{patient.roomType}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label>Address :</label> <span>{patient.address}</span>
          </div>
          <div className="col-md-6">
            <label>Treated By :</label> <span>{patient.docName}</span>
          </div>
        </div>
        <div></div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => openDeleteModal(patient._id)}
        >
          Delete Patient
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PatientDetails;
