import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addBranch,
  deleteBranch,
  listBranches,
} from "../../actions/BranchAction";
import ErrorAlert from "../../misc/ErrorAlert";
import ModalBtn from "../../misc/ModalBtn";
import ModalTitle from "../../misc/ModalTitle";
import ReUseComp from "../../misc/ReUseComp";
import PageHeader from "../Layout/PageHeader";
import ScrollToTop from "../Layout/ScrollToTop";
import LoadingPage from "../Pages/LoadingPage";
import BranchList from "./BranchList";

const BranchListPage = () => {
  const [modalVisible, setModalVisible] = useState("");
  const [id, setId] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [helpLine, setHelpLine] = useState("");
  const [contact, setContact] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const branchList = useSelector((state) => state.branchList);
  const { loading, branches, error } = branchList;
  const branchAdd = useSelector((state) => state.branchAdd);
  const { success: successSave, error: errorSave } = branchAdd;
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Branches | A S K Hospitals";
    dispatch(listBranches());
  }, [dispatch]);
  console.log(branches);

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
      dispatch(listBranches());
    }
  }, [dispatch, successSave]);

  const openModal = (branch) => {
    if (branch._id) {
      setModalVisible(true);
      setId(branch._id);
      setAddress(branch.address);
      setEmail(branch.email);
      setContact(branch.contact);
      setHelpLine(branch.helpLine);
    } else {
      setModalVisible(true);
      setId();
      setAddress();
      setEmail();
      setContact();
      setHelpLine();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const branch = {
      _id: id,
      address,
      email,
      contact,
      helpLine,
    };
    dispatch(addBranch(branch));
  };

  const deleteHandler = (branch) => {
    dispatch(deleteBranch(branch._id));
    dispatch(listBranches());
  };

  const brachListData = branches.map((branch, i) => {
    return (
      <BranchList
        key={i}
        branch={branch}
        openModal={openModal}
        deleteHandler={deleteHandler}
        userInfo={userInfo}
      />
    );
  });

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="home-container container">
      <PageHeader data={branches} title="Branches" openModal={openModal} />
      {modalVisible && (
        <Modal
          show={modalVisible}
          onHide={() => setModalVisible(false)}
          size="md"
          className="modal-container"
        >
          <Modal.Header closeButton>
            <ModalTitle id={id} title="Branch" />
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              {errorSave && <ErrorAlert message={errorSave} />}
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
                label="HelpLine Number"
                inputType="text"
                type="text"
                name="helpLine"
                value={helpLine}
                setValue={setHelpLine}
              />
              <ModalBtn id={id} />
            </form>
          </Modal.Body>
        </Modal>
      )}
      <div className="row">{brachListData}</div>
      <ScrollToTop />
    </div>
  );
};

export default BranchListPage;
