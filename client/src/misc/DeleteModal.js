import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteModal = (props) => {
  const { data, deleteHandler, deleteModalVisible, setDeleteModalVisible } =
    props;
  return (
    <Modal
      show={deleteModalVisible}
      onHide={() => setDeleteModalVisible(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-danger" style={{ fontWeight: "500" }}>
          Confirm Message
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="">
        This will be deleted permanently. Are you sure? <br /> Please
        <code> Confirm </code>to Delete.
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setDeleteModalVisible(false)}
        >
          Close
        </Button>
        <Button variant="danger" size="sm" onClick={() => deleteHandler(data)}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
