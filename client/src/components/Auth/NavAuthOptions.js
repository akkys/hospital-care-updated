import React from "react";
import { useSelector } from "react-redux";
import { Nav, Navbar, NavDropdown, Dropdown, Form } from "react-bootstrap";
import LoadingPage from "../Pages/LoadingPage";
import Cookie from "js-cookie";
import { Link } from "react-router-dom";

const NavAuthOption = () => {
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo } = userSignin;

  const logOut = (e) => {
    e.preventDefault();
    Cookie.remove("userInfo");
    window.location.href = "/login";
  };

  return loading ? (
    <LoadingPage />
  ) : (
    <>
      {userInfo ? (
        <>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link as={Link} className="mr-3 " to="/home">
                Home
              </Nav.Link>

              <NavDropdown
                title="Team"
                id="basic-nav-dropdown"
                className="mr-3"
              >
                <NavDropdown.Item
                  as={Link}
                  to="/doctorsList"
                  style={{ fontWeight: "500" }}
                >
                  Doctors
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="Facilities"
                id="basic-nav-dropdown"
                className="mr-3"
              >
                <NavDropdown.Item
                  as={Link}
                  to="/ambulanceService"
                  style={{ fontWeight: "500" }}
                >
                  Ambulance Services
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  as={Link}
                  to="/wardsList"
                  style={{ fontWeight: "500" }}
                >
                  Types of Wards
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} className="mr-3" to="/contactUs">
                Contact Us
              </Nav.Link>
              <Nav.Link as={Link} to="/branchList" className="mr-3 ">
                Branches
              </Nav.Link>
            </Nav>
            <Dropdown className="mr-5">
              <Dropdown.Toggle variant="default" id="dropdown-basic">
                <span
                  className="mr-1"
                  style={{ fontWeight: "520", fontSize: "14px" }}
                >
                  <i className="fa fa-user fa-lg mr-2" />
                  {userInfo.name}
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {/* <Dropdown.Header></Dropdown.Header> */}
                <Dropdown.Item as={Link} to="/appointmentList">
                  Appointments
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/patientList">
                  Patients
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/labRoomList">
                  Laboratory
                </Dropdown.Item>
                <Dropdown.Divider />

                <Dropdown.Item>
                  <span className="text-danger" onClick={logOut}>
                    Logout
                  </span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </>
      ) : (
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link as={Link} className="mr-3 " to="/home">
              Home
            </Nav.Link>
            <NavDropdown title="Team" id="basic-nav-dropdown" className="mr-3">
              <NavDropdown.Item
                as={Link}
                to="/doctorsList"
                style={{ fontWeight: "500" }}
              >
                Doctors
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="Facilities"
              id="basic-nav-dropdown"
              className="mr-3"
            >
              <NavDropdown.Item
                as={Link}
                to="/ambulanceService"
                style={{ fontWeight: "500" }}
              >
                Ambulance Services
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                as={Link}
                to="/wardsList"
                style={{ fontWeight: "500" }}
              >
                Types of Wards
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/branchList" className="mr-3 ">
              Branches
            </Nav.Link>
            <Nav.Link as={Link} className="mr-3" to="/contactUs">
              Contact Us
            </Nav.Link>
          </Nav>
          <Form inline>
            <Link
              to="/register"
              className="btn btn-outline-primary btn-sm mr-3"
            >
              Register
            </Link>
            <Link to="/login" className="btn btn-success btn-sm">
              Sign-In
            </Link>
          </Form>
        </Navbar.Collapse>
      )}
    </>
  );
};

export default NavAuthOption;
