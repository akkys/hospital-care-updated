import React from "react";

const ModalBtn = ({ id }) => {
  return (
    <button type="submit" className="btn btn-primary btn-sm mt-5 float-right">
      {!id ? "SAVE" : "UPDATE"}
    </button>
  );
};

export default ModalBtn;
