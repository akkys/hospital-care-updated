import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addAppointment,
  deleteAppointment,
  listAppointments,
} from "../../actions/AppointmentAction";
import LoadingPage from "../Pages/LoadingPage";
import AppointmentList from "./AppointmentList";
import ErrorAlert from "../../misc/ErrorAlert";
import DeleteModal from "../../misc/DeleteModal";
import PaginationButton from "../Layout/PaginationButton";
import PageHeader from "../Layout/PageHeader";
import InputField from "../../misc/InputField";
import ReUseComp from "../../misc/ReUseComp";
import ModalBtn from "../../misc/ModalBtn";
import ModalTitle from "../../misc/ModalTitle";
import TableHead from "../../misc/TableHead";

const AppointmentListPage = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [datetime, setDatetime] = useState("");
  const [choose, setChoose] = useState("");
  const [choice] = useState([
    "A New Patient Appointment",
    "A Routine Checkup",
    "A Comprehensive Health Exam",
  ]);
  const [docName, setDocName] = useState("");
  const [docts, setDocts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredAppt, setFilteredAppt] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultPerPage] = useState(5);

  const appointmentList = useSelector((state) => state.appointmentList);
  const { appointments, loading } = appointmentList;
  const appointmentAdd = useSelector((state) => state.appointmentAdd);
  const { success: successSave, error: errorSave } = appointmentAdd;

  const openModal = (appointment) => {
    if (appointment._id) {
      setModalVisible(true);
      setId(appointment._id);
      setName(appointment.name);
      setEmail(appointment.email);
      setContact(appointment.contact);
      setAddress(appointment.address);
      setCity(appointment.city);
      setZipcode(appointment.zipcode);
      setDatetime(appointment.datetime);
      setChoose(appointment.choose);
      setDocName(appointment.docName);
    } else {
      setModalVisible(true);
      setId();
      setName();
      setEmail();
      setContact();
      setAddress();
      setCity();
      setZipcode();
      setDatetime();
      setChoose();
      setDocName();
    }
  };

  const openDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Appointments | A S K Hospitals";
    dispatch(listAppointments());
  }, [dispatch]);

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
      dispatch(listAppointments());
    }
  }, [dispatch, successSave]);

  useEffect(() => {
    async function getDocNames() {
      const docNameData = await axios.get("http://localhost:5000/doctors/");
      //   console.log(docNameData.data);
      if (docNameData.data.length > 0) {
        return (
          setDocts(docNameData.data.map((doc) => doc.name)),
          setDocName(docNameData.data[0].name)
        );
      }
    }
    getDocNames();
  }, []);

  useEffect(() => {
    setFilteredAppt(
      appointments.filter((appointment) => {
        return (
          appointment.contact.includes(search) ||
          appointment.email.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  }, [search, appointments]);
  console.log("Filter", filteredAppt);

  const handleSubmit = (e) => {
    e.preventDefault();
    const appointment = {
      _id: id,
      name,
      email,
      contact,
      datetime,
      address,
      city,
      zipcode,
      docName,
      choose,
    };
    dispatch(addAppointment(appointment));
    console.log("Appt", appointment);
  };

  const deleteHandler = (appointment) => {
    dispatch(deleteAppointment(appointment._id));
    setDeleteModalVisible(false);
    dispatch(listAppointments());
  };

  //Pagination
  const indexOfLastResult = currentPage * resultPerPage;
  const indexOfFirstResult = indexOfLastResult - resultPerPage;
  const currentResult = filteredAppt.slice(
    indexOfFirstResult,
    indexOfLastResult
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < appointments.length / resultPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const appointmentListData = currentResult.map((appointment, i) => {
    return (
      <AppointmentList
        key={i}
        appt={appointment}
        openModal={openModal}
        openDeleteModal={openDeleteModal}
        deleteHandler={deleteHandler}
      />
    );
  });

  //Table Header
  const contents = [
    "",
    "Date",
    "Name",
    "Contact & Email",
    "Type",
    "Status",
    "Info",
  ];

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="home-container container">
      <PageHeader
        data={appointments}
        title="Appointments"
        openModal={openModal}
        search={search}
        setSearch={setSearch}
      />
      {currentResult.length === 0 ? (
        <div className="container">
          <h4>Search result : {currentResult.length}</h4>
        </div>
      ) : (
        <div className="container mt-3">
          {search && <h4>Search result : {currentResult.length}</h4>}
          <TableHead contents={contents} data={appointmentListData} />
        </div>
      )}
      <PaginationButton
        PerPage={resultPerPage}
        total={appointments.length}
        paginate={paginate}
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
        perPageLength={currentResult.length}
      />
      {modalVisible && (
        <Modal
          show={modalVisible}
          onHide={() => setModalVisible(false)}
          size="lg"
          className="modal-container"
        >
          <Modal.Header closeButton>
            <ModalTitle id={id} title="Appointment" />
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              {errorSave && <ErrorAlert message={errorSave} />}
              <ReUseComp
                label="Patient Name"
                inputType="text"
                type="text"
                name="name"
                value={name}
                setValue={setName}
              />
              <ReUseComp
                label="Email"
                inputType="text"
                type="email"
                name="email"
                value={email}
                setValue={setEmail}
              />
              <ReUseComp
                label="Contact Number"
                inputType="text"
                type="text"
                name="contact"
                value={contact}
                setValue={setContact}
              />
              <ReUseComp
                label="Schedule Date & Time"
                inputType="text"
                type="datetime-local"
                name="datetime"
                value={datetime}
                setValue={setDatetime}
              />
              <ReUseComp
                label="Doctor Name"
                inputType="select"
                data={docts}
                name="docName"
                value={docName}
                setValue={setDocName}
              />
              <ReUseComp
                label="Patient Address"
                inputType="text"
                type="text"
                name="address"
                value={address}
                setValue={setAddress}
              />
              <ReUseComp
                label="City"
                inputType="text"
                type="text"
                name="city"
                value={city}
                setValue={setCity}
              />
              <ReUseComp
                label="Zipcode"
                inputType="text"
                type="text"
                name="zipcode"
                value={zipcode}
                setValue={setZipcode}
              />
              <ReUseComp
                label="I Would Like To"
                inputType="select"
                data={choice}
                name="choose"
                value={choose}
                setValue={setChoose}
              />
              {/* <button
                type="submit"
                className="btn btn-primary mt-5 float-right"
              >
                {!id ? "Add Appointment" : "Update Appointment"}
              </button> */}
              <ModalBtn id={id} />
            </form>
          </Modal.Body>
        </Modal>
      )}
      {appointments.map((appointment, i) => {
        return (
          <div key={i}>
            {deleteModalVisible && (
              <DeleteModal
                key={i}
                data={appointment}
                deleteHandler={deleteHandler}
                openDeleteModal={openDeleteModal}
                deleteModalVisible={deleteModalVisible}
                setDeleteModalVisible={setDeleteModalVisible}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AppointmentListPage;
