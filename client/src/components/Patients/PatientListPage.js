import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addPatient,
  deletePatient,
  listPatients,
} from "../../actions/PatientAction";
import ErrorAlert from "../../misc/ErrorAlert";
import ModalBtn from "../../misc/ModalBtn";
import ModalTitle from "../../misc/ModalTitle";
import ReUseComp from "../../misc/ReUseComp";
import TableHead from "../../misc/TableHead";
import PageHeader from "../Layout/PageHeader";
import PaginationButton from "../Layout/PaginationButton";
import LoadingPage from "../Pages/LoadingPage";
import PatientList from "./PatientList";

const PatientListPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [pid, setPid] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [admitDate, setAdmitDate] = useState("");
  const [status, setStatus] = useState("");
  const [roomNum, setRoomNum] = useState("");
  const [roomType, setRoomType] = useState("");
  const [docName, setDocName] = useState("");
  const [docts, setDocts] = useState([]);
  const [genders] = useState(["Male", "Female", "Others"]);
  const [patientStatus, setPatientStatus] = useState([
    "Treating",
    "Discharged",
    "Under Observation",
  ]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredPatient, setFilteredPatient] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultPerPage] = useState(5);

  const patientList = useSelector((state) => state.patientList);
  const { loading, patients } = patientList;
  const patientAdd = useSelector((state) => state.patientAdd);
  const { success: successSave, error: errorSave } = patientAdd;

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Patients | A S K Hospitals";
    //Get the list patients
    dispatch(listPatients());

    //Get the list of doctors
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

    //Get the list of wards
    async function getRoomNames() {
      const roomNameData = await axios.get("http://localhost:5000/wards/");

      if (roomNameData.data.length > 0) {
        return (
          setRoomTypes(roomNameData.data.map((room) => room.roomType)),
          setDocName(roomNameData.data[0].roomType)
        );
      }
    }
    getRoomNames();

    // // Get the list of Genders
    // setGenders(genders.map((gender) => gender));
    // setGender(genders[0]);

    // Get the list of Patient Status
    setPatientStatus(patientStatus.map((status) => status));
    setStatus(patientStatus[0]);
  }, [dispatch]);

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
      dispatch(listPatients());
    }
  }, [dispatch, successSave]);

  //Search filter
  useEffect(() => {
    setFilteredPatient(
      patients.filter((patient) => {
        return (
          patient.pid.includes(search) ||
          patient.contact.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  }, [search, patients]);

  const openModal = (patient) => {
    if (patient._id) {
      setModalVisible(true);
      setId(patient._id);
      setPid(patient.pid);
      setName(patient.name);
      setAge(patient.age);
      setGender(patient.gender);
      setContact(patient.contact);
      setAddress(patient.address);
      setAdmitDate(patient.admitDate);
      setStatus(patient.status);
      setRoomNum(patient.roomNum);
      setRoomType(patient.roomType);
      setDocName(patient.docName);
    } else {
      setModalVisible(true);
      setId();
      setPid();
      setName();
      setAge();
      setGender();
      setContact();
      setAddress();
      setAdmitDate();
      setStatus();
      setRoomNum();
      setRoomType();
      setDocName();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const patient = {
      _id: id,
      pid,
      name,
      age,
      gender,
      contact,
      address,
      admitDate,
      roomNum,
      roomType,
      status,
      docName,
    };
    dispatch(addPatient(patient));
  };

  const deleteHandler = (patient) => {
    dispatch(deletePatient(patient._id));
    dispatch(listPatients());
  };

  //Pagination
  const indexOfLastResult = currentPage * resultPerPage;
  const indexOfFirstResult = indexOfLastResult - resultPerPage;
  const currentResult = filteredPatient.slice(
    indexOfFirstResult,
    indexOfLastResult
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < patients.length / resultPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const patientListData = currentResult.map((patient, i) => {
    return (
      <PatientList
        key={i}
        patient={patient}
        openModal={openModal}
        deleteHandler={deleteHandler}
        filteredPatient={filteredPatient}
      />
    );
  });

  const contents = [
    "",
    "PID",
    "Name",
    "Admission Date",
    "Room No",
    "Status",
    "Info",
  ];

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="home-container container">
      <PageHeader
        data={patients}
        title="Patients"
        openModal={openModal}
        search={search}
        setSearch={setSearch}
      />
      {currentResult.length === 0 ? (
        <h4>Search result : {currentResult.length}</h4>
      ) : (
        <div className="container mt-3">
          {search && <h4>Search result : {currentResult.length}</h4>}
          <TableHead contents={contents} data={patientListData} />
        </div>
      )}

      <PaginationButton
        PerPage={resultPerPage}
        total={patients.length}
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
            <ModalTitle id={id} title="Patient" />
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              {errorSave && <ErrorAlert message={errorSave} />}
              <div className="row">
                <div
                  className="col-md-6"
                  style={{ borderRight: "1px solid rgb(206, 206, 206)" }}
                >
                  <ReUseComp
                    label="Patient ID"
                    inputType="text"
                    type="text"
                    name="pid"
                    value={pid}
                    setValue={setPid}
                  />
                  <ReUseComp
                    label="Name"
                    inputType="text"
                    type="text"
                    name="name"
                    value={name}
                    setValue={setName}
                  />
                  <ReUseComp
                    label="Admission Date"
                    inputType="text"
                    type="datetime-local"
                    name="admitDate"
                    value={admitDate}
                    setValue={setAdmitDate}
                  />
                  <ReUseComp
                    label="Status"
                    data={patientStatus}
                    inputType="select"
                    name="status"
                    value={status}
                    setValue={setStatus}
                  />
                  <ReUseComp
                    label="Room No."
                    inputType="text"
                    type="text"
                    name="roomNum"
                    value={roomNum}
                    setValue={setRoomNum}
                  />
                  <ReUseComp
                    label="Room Type"
                    data={roomTypes}
                    inputType="select"
                    type="text"
                    name="roomType"
                    value={roomType}
                    setValue={setRoomType}
                  />
                </div>
                <div
                  className="col-md-6"
                  style={{ borderRight: "1px solid rgb(206, 206, 206)" }}
                >
                  <ReUseComp
                    label="Age"
                    inputType="text"
                    type="text"
                    name="age"
                    value={age}
                    setValue={setAge}
                  />
                  <ReUseComp
                    label="Gender"
                    data={genders}
                    inputType="select"
                    name="gender"
                    value={gender}
                    setValue={setGender}
                  />
                  <ReUseComp
                    label="Contact"
                    inputType="text"
                    type="text"
                    name="contact"
                    value={contact}
                    setValue={setContact}
                  />
                  <ReUseComp
                    label="Address"
                    inputType="textarea"
                    type="textarea"
                    rows="3"
                    name="address"
                    value={address}
                    setValue={setAddress}
                  />
                  <ReUseComp
                    label="Treated By"
                    data={docts}
                    inputType="select"
                    name="docName"
                    value={docName}
                    setValue={setDocName}
                  />
                </div>
              </div>
              <ModalBtn id={id} />
            </form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default PatientListPage;
