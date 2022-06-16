import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className=" error-container">
      <h1> 404</h1>
      <h2>Opps! Page Not Found</h2>
      <h3>Sorry, the page you're looking for doesn't exists.</h3>
      <div className="row">
        <div className="col-md-5"></div>
        <div className="col-md-2">
          <Link to="/home" className="btn btn-lg btn-primary btn-block">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
