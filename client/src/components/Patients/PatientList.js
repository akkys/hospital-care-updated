import React, { useState } from "react";
import DeleteModal from "../../misc/DeleteModal";
import PatientDetails from "./PatientDetails";

const PatientList = (props) => {
  const { patient, openModal, deleteHandler } = props;
  const [showPatientDetailModal, setShowPatientDetailModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const openPatientDetailModal = () => {
    setShowPatientDetailModal(true);
  };

  const closePatientDetailModal = () => {
    setShowPatientDetailModal(false);
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const admitDate = new Date(patient.admitDate).toLocaleString();

  const patientDetailModal = () => {
    return (
      <PatientDetails
        showPatientDetailModal={showPatientDetailModal}
        closePatientDetailModal={closePatientDetailModal}
        patient={patient}
        admitDate={admitDate}
        openDeleteModal={openDeleteModal}
      />
    );
  };

  return (
    <>
      {deleteModal && (
        <DeleteModal
          deleteHandler={deleteHandler}
          data={patient}
          deleteModalVisible={deleteModal}
          setDeleteModalVisible={setDeleteModal}
        />
      )}
      <tbody>
        <tr>
          <td>
            <i
              onClick={() => openModal(patient)}
              className="fa fa-square-o"
              style={{ cursor: "pointer" }}
            />
          </td>
          <td>{patient.pid}</td>
          <td>{patient.name}</td>
          <td>{admitDate}</td>
          <td>{patient.roomNum}</td>

          {patient.status === "Discharged" ? (
            <td className="text-danger">{patient.status}</td>
          ) : (
            <td className="text-success">{patient.status}</td>
          )}
          <td
            className="btn-link"
            onClick={openPatientDetailModal}
            style={{ cursor: "pointer" }}
          >
            More Info
          </td>
        </tr>
        {patientDetailModal()}
      </tbody>
    </>
  );
};

export default PatientList;
