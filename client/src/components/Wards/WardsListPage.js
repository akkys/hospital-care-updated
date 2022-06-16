import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addWard, deleteWard, listWards } from "../../actions/WardAction";
import ErrorAlert from "../../misc/ErrorAlert";
import ModalBtn from "../../misc/ModalBtn";
import ModalTitle from "../../misc/ModalTitle";
import ReUseComp from "../../misc/ReUseComp";
import PageHeader from "../Layout/PageHeader";
import LoadingPage from "../Pages/LoadingPage";
import WardList from "./WardList";

const WardsListPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [roomType, setRoomType] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const wardList = useSelector((state) => state.wardList);
  const { loading, wards } = wardList;
  const wardAdd = useSelector((state) => state.wardAdd);
  const { success: successSave, error: errorSave } = wardAdd;

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Wards | A S K Hospitals";
    dispatch(listWards());
  }, [dispatch]);
  console.log(wards);

  useEffect(() => {
    document.title = "Wards | A S K Hospitals";
    if (successSave) {
      setModalVisible(false);
      dispatch(listWards());
    }
  }, [dispatch, successSave]);

  const openModal = (ward) => {
    if (ward._id) {
      setModalVisible(true);
      setId(ward._id);
      setRoomType(ward.roomType);
      setDesc(ward.desc);
      setPrice(ward.price);
    } else {
      setModalVisible(true);
      setId();
      setRoomType();
      setDesc();
      setPrice();
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ward = {
      _id: id,
      roomType,
      desc,
      price,
    };
    dispatch(addWard(ward));
  };

  const deleteHandler = (ward) => {
    dispatch(deleteWard(ward._id));
    dispatch(listWards());
  };

  const wardsListData = wards.map((ward, i) => {
    return (
      <WardList
        key={i}
        ward={ward}
        openModal={openModal}
        userInfo={userInfo}
        deleteHandler={deleteHandler}
      />
    );
  });

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="home-container container">
      <PageHeader data={wards} title="Wards" openModal={openModal} />
      <div className="row">{wardsListData}</div>
      {modalVisible && (
        <Modal
          show={modalVisible}
          onHide={() => setModalVisible(false)}
          size="md"
          className="modal-container"
        >
          <Modal.Header closeButton>
            <ModalTitle id={id} title="Ward" />
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              {errorSave && <ErrorAlert message={errorSave} />}
              <ReUseComp
                label="Room Name"
                inputType="text"
                type="text"
                name="roomType"
                value={roomType}
                setValue={setRoomType}
              />
              <ReUseComp
                label="Price"
                inputType="text"
                type="text"
                name="price"
                value={price}
                setValue={setPrice}
              />
              <ReUseComp
                label="Description"
                inputType="textarea"
                type="textarea"
                rows="4"
                name="desc"
                value={desc}
                setValue={setDesc}
              />
              <ModalBtn id={id} />
            </form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default WardsListPage;
