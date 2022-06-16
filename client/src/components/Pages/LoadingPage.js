import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";

const LoadingPage = () => {
  return (
    <div
      className="main-container"
      style={{ textAlign: "center", fontWeight: "bold", marginTop:"10%" }}
    >
      <h2>
        Loading...{" "}
        <span style={{ fontSize: "13px" }}>
          <Spinner animation="border" role="status" />
        </span>
      </h2>

      <h4>Please Wait...</h4>
    </div>
  );
};

export default LoadingPage;
