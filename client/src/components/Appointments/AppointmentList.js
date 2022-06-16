import React, { useState } from "react";
import AppointmentDetails from "./AppointmentDetails";

const AppointmentList = (props) => {
  const { appt, openModal, openDeleteModal } = props;

  const [showApptDetailModal, setShowApptDetailModal] = useState(false);

  const currTime = new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const time = new Date(appt.datetime).toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const openApptDetailModal = () => {
    setShowApptDetailModal(true);
  };

  const closeApptDetailModal = () => {
    setShowApptDetailModal(false);
  };

  const apptDetailModal = () => {
    return (
      <AppointmentDetails
        showApptDetailModal={showApptDetailModal}
        setShowApptDetailModal={setShowApptDetailModal}
        closeApptDetailModal={closeApptDetailModal}
        appt={appt}
        time={time}
        openDeleteModal={openDeleteModal}
      />
    );
  };

  return (
    <tbody>
      <tr className="table-active">
        <td>
          <i
            onClick={() => openModal(appt)}
            className="fa fa-pencil"
            style={{ cursor: "pointer" }}
          />
        </td>
        <td className="">{time}</td>
        <td>{appt.name}</td>
        <td>
          <span>{appt.contact}</span>
        </td>
        <td>{appt.choose}</td>
        {time >= currTime ? (
          <td className="">Pending</td>
        ) : (
          <td className="text-danger">Completed / Expired</td>
        )}{" "}
        <td
          onClick={openApptDetailModal}
          className="btn-link"
          style={{ cursor: "pointer" }}
        >
          More Info
        </td>
      </tr>
      {apptDetailModal()}
    </tbody>
  );
};

export default AppointmentList;
