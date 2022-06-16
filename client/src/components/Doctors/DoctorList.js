import React, { useState } from "react";
import img from "../../img/doc.png";
import DeleteModal from "../../misc/DeleteModal";
import DocDetails from "./DocDetails";

const DoctorList = (props) => {
  const { docs, userInfo, openModal, deleteHandler } = props;

  const [showDocDetails, setShowDocDetails] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDocModal = () => {
    setShowDocDetails(true);
  };

  const closeDocModal = () => {
    setShowDocDetails(false);
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const docDetailModal = () => {
    return (
      <DocDetails
        docDetailModal={docDetailModal}
        closeDocModal={closeDocModal}
        docs={docs}
        img={img}
        showDocDetails={showDocDetails}
        setShowDocDetails={setShowDocDetails}
      />
    );
  };

  return (
    <>
      {/* Delete Modal  */}
      {deleteModal && (
        <DeleteModal
          deleteHandler={deleteHandler}
          data={docs}
          deleteModalVisible={deleteModal}
          setDeleteModalVisible={setDeleteModal}
        />
      )}

      <div className="col-md-3 mb-3 mt-3 card-container">
        <div className="card border-secondary text-dark bg-light mb-3 ">
          <div className="row">
            <img src={img} className="card-img-top" alt="..." />
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card-body">
                <h5 className="card-title">
                  Dr. {docs.name}
                  {userInfo && (
                    <i
                      onClick={() => openModal(docs)}
                      className="fa fa-pencil-square-o float-right text-success"
                    />
                  )}
                </h5>
                <h6 className="card-text">Experience : {docs.exp} Year(s)</h6>
                <h6 className="card-text">Specialist in : {docs.expert}</h6>
                <h6>Contact : {docs.contact}</h6>
              </div>
            </div>
          </div>
          <div className="card-body">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={handleDocModal}
            >
              Know More...
            </button>
            {userInfo && (
              <i
                onClick={openDeleteModal}
                className="fa fa-trash fa-lg float-right text-danger"
                style={{
                  marginLeft: "95%",
                  fontSize: "23px",
                }}
              />
            )}
          </div>
        </div>
      </div>
      {docDetailModal()}
    </>
  );
};

export default DoctorList;
