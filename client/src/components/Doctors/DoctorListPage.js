import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addDoctor,
  listDoctors,
  deleteDoctor,
} from "../../actions/DoctorAction";
import ErrorAlert from "../../misc/ErrorAlert";
import ModalBtn from "../../misc/ModalBtn";
import ModalTitle from "../../misc/ModalTitle";
import ReUseComp from "../../misc/ReUseComp";
import PageHeader from "../Layout/PageHeader";
import ScrollToTop from "../Layout/ScrollToTop";
import LoadingPage from "../Pages/LoadingPage";
import DoctorList from "./DoctorList";

const DoctorListPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [expert, setExpert] = useState("");
  const [desc, setDesc] = useState("");
  const [time, setTime] = useState("");
  const [available, setAvailable] = useState("");
  const [exp, setExp] = useState("");
  const [contact, setContact] = useState("");
  const [experts, setExperts] = useState([
    "Cardiology",
    "Psychology",
    "Neurology",
    "Dermotology",
    "Surgeon",
    "Paramedic",
    "ENT",
    "Consulting",
  ]);
  const [availables, setAvailables] = useState([
    "Morning",
    "Afternoon",
    "Evening",
    "Night",
    "Full Day",
  ]);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const doctorList = useSelector((state) => state.doctorList);
  const { doctors, loading } = doctorList;
  const doctorAdd = useSelector((state) => state.doctorAdd);
  const { success: successSave, error: errorSave } = doctorAdd;

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Doctors | A S K Hospitals";
    dispatch(listDoctors());
  }, [dispatch]);
  console.log("Docs", doctors);

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
      dispatch(listDoctors());
    }
  }, [dispatch, successSave]);

  useEffect(() => {
    setExperts(experts.map((exp) => exp));
    setExpert(experts[0]);
    setAvailables(availables.map((avail) => avail));
    setAvailable(availables[0]);
  }, []);

  const openModal = (doctor) => {
    if (doctor._id) {
      setModalVisible(true);
      setId(doctor._id);
      setName(doctor.name);
      setExpert(doctor.expert);
      setAvailable(doctor.available);
      setExp(doctor.exp);
      setContact(doctor.contact);
      setDesc(doctor.desc);
      setTime(doctor.time);
    } else {
      setModalVisible(true);
      setId();
      setName();
      setExpert();
      setAvailable();
      setExp();
      setContact();
      setDesc();
      setTime();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const doctor = {
      _id: id,
      name,
      expert,
      available,
      exp,
      contact,
      desc,
      time,
    };
    dispatch(addDoctor(doctor));
    console.log(doctor);
  };

  const deleteHandler = (doctor) => {
    dispatch(deleteDoctor(doctor._id));
    dispatch(listDoctors());
  };

  const doctorsListData = doctors.map((doctor, i) => {
    return (
      <DoctorList
        key={i}
        docs={doctor}
        userInfo={userInfo}
        openModal={openModal}
        deleteHandler={deleteHandler}
      />
    );
  });

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="home-container container">
      <PageHeader
        data={doctors}
        fullTitle="List of Doctors available in our Hospital"
        openModal={openModal}
      />
      <div className="row mt-3">
        <div className="container ">
          <div className="row">{doctorsListData}</div>
        </div>
      </div>
      {modalVisible && (
        <Modal
          show={modalVisible}
          onHide={() => setModalVisible(false)}
          size="lg"
          className="modal-container"
        >
          <Modal.Header closeButton>
            <ModalTitle id={id} title="Doctor" />
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              {errorSave && <ErrorAlert message={errorSave} />}
              <ReUseComp
                label="Doctor Name"
                inputType="text"
                type="text"
                name="name"
                value={name}
                setValue={setName}
              />
              <ReUseComp
                label="Expertise In"
                inputType="select"
                data={experts}
                name="expert"
                value={expert}
                setValue={setExpert}
              />
              <ReUseComp
                label="Experience in Year"
                inputType="text"
                type="text"
                name="exp"
                value={exp}
                setValue={setExp}
              />
              <ReUseComp
                label="Contact Numbe"
                inputType="text"
                type="text"
                name="contact"
                value={contact}
                setValue={setContact}
              />
              <ReUseComp
                label="Availbale At"
                inputType="select"
                data={availables}
                name="available"
                value={available}
                setValue={setAvailable}
              />
              <ReUseComp
                label="Available Times"
                inputType="text"
                type="text"
                name="time"
                value={time}
                setValue={setTime}
              />
              <ReUseComp
                label="About"
                inputType="textarea"
                type="textarea"
                rows="3"
                name="desc"
                value={desc}
                setValue={setDesc}
              />
              <ModalBtn id={id} />
            </form>
          </Modal.Body>
        </Modal>
      )}
      <ScrollToTop />
    </div>
  );
};

export default DoctorListPage;
