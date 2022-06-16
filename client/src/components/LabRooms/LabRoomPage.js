import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addRoom, deleteRoom, listRooms } from "../../actions/RoomAction";
import ErrorAlert from "../../misc/ErrorAlert";
import ModalBtn from "../../misc/ModalBtn";
import ModalTitle from "../../misc/ModalTitle";
import ReUseComp from "../../misc/ReUseComp";
import TableHead from "../../misc/TableHead";
import PageHeader from "../Layout/PageHeader";
import PaginationButton from "../Layout/PaginationButton";
import LoadingPage from "../Pages/LoadingPage";
import LabRoom from "./LabRoom";

const LabRoomPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [num, setNum] = useState("");
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [groups, setGroups] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [sampleGroups, setSampleGroups] = useState([
    "Blood",
    "Urine",
    "Stool",
    "Throat Swab",
    "UV Scan",
    "MRI",
    "X-Ray",
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultPerPage] = useState(5);

  const roomList = useSelector((state) => state.roomList);
  const { rooms, loading } = roomList;
  const roomAdd = useSelector((state) => state.roomAdd);
  const { success: successSave, error: errorSave } = roomAdd;

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Laboratory | A S K Hospitals";
    dispatch(listRooms());
  }, [dispatch]);

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
      dispatch(listRooms());
    }
  }, [dispatch, successSave]);

  useEffect(() => {
    setSampleGroups(sampleGroups.map((sample) => sample));
    setGroups(sampleGroups[0]);
  }, []);

  const openModal = (room) => {
    if (room._id) {
      setModalVisible(true);
      setId(room._id);
      setNum(room.num);
      setName(room.name);
      setCapacity(room.capacity);
      setFromTime(room.fromTime);
      setToTime(room.toTime);
      setGroups(room.groups);
    } else {
      setModalVisible(true);
      setId();
      setNum();
      setName();
      setCapacity();
      setFromTime();
      setToTime();
      setGroups();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const room = {
      _id: id,
      num,
      name,
      capacity,
      groups,
      fromTime,
      toTime,
    };
    dispatch(addRoom(room));
  };

  const deleteHandler = (room) => {
    dispatch(deleteRoom(room._id));
    dispatch(listRooms());
  };

  //Pagination
  const indexOfLastResult = currentPage * resultPerPage;
  const indexOfFirstResult = indexOfLastResult - resultPerPage;
  const currentResult = rooms.slice(indexOfFirstResult, indexOfLastResult);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < rooms.length / resultPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const roomListData = currentResult.map((room, i) => {
    return (
      <LabRoom
        key={i}
        room={room}
        openModal={openModal}
        deleteHandler={deleteHandler}
      />
    );
  });

  const contents = [
    "",
    "No.",
    "Room Name",
    "Sample Groups",
    "Capacity",
    "Timing",
    "Remove",
  ];

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="home-container container">
      <PageHeader
        data={rooms}
        fullTitle="List of Labs available in our Hospital"
        openModal={openModal}
      />
      <div className="container mt-3">
        {rooms.length > 0 && (
          <TableHead contents={contents} data={roomListData} style="center" />
        )}
      </div>
      <PaginationButton
        PerPage={resultPerPage}
        total={rooms.length}
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
          size="md"
          className="modal-container"
        >
          <Modal.Header closeButton>
            <ModalTitle id={id} title="Laboratory" />
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              {errorSave && <ErrorAlert message={errorSave} />}
              <ReUseComp
                label="Name"
                inputType="text"
                type="text"
                name="name"
                value={name}
                setValue={setName}
              />
              <ReUseComp
                label="Lab No."
                inputType="text"
                type="text"
                name="num"
                value={num}
                setValue={setNum}
              />
              <ReUseComp
                label="Capacity"
                inputType="text"
                type="text"
                name="capacity"
                value={capacity}
                setValue={setCapacity}
              />
              <div className="form-group row">
                <label className="col-md-4">Time Slots</label>

                <div className="col-md-3">
                  <input
                    type="time"
                    className="form-control form-control-sm"
                    value={fromTime}
                    onChange={(e) => setFromTime(e.target.value)}
                  />
                </div>

                <label className="col-md-1" style={{ textAlign: "center" }}>
                  To
                </label>
                <div className="col-md-3">
                  <input
                    type="time"
                    className="form-control form-control-sm"
                    value={toTime}
                    onChange={(e) => setToTime(e.target.value)}
                  />
                </div>
              </div>
              <ReUseComp
                label="Sample Groups"
                data={sampleGroups}
                inputType="select"
                name="groups"
                value={groups}
                setValue={setGroups}
              />
              <ModalBtn id={id} />
            </form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default LabRoomPage;
