import React from "react";

const ErrorAlert = (props) => {
  return (
    <>
      <div className="alert alert-danger alert-dismissible " role="alert">
        {props.message}
      </div>
    </>
  );
};

export default ErrorAlert;
