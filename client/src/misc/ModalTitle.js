import React from "react";
import { Modal } from "react-bootstrap";

const ModalTitle = ({ id, title }) => {
  return (
    <Modal.Title>
      <h4>{!id ? `Add New ${title}` : `Update ${title}`}</h4>
    </Modal.Title>
  );
};

export default ModalTitle;
