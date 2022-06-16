import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavAuthOption from "../Auth/NavAuthOptions";

const NavigationBar = () => {
  return (
    <Navbar
      bg="light"
      variant="light"
      expand="lg"
      fixed="top"
      className="navbar-container"
    >
      <Navbar.Brand as={Link} to="/home" className="ml-5 mr-5">
        <h3>A S K Hospital</h3>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <NavAuthOption />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
