import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../actions/UserAction";
import LoadingPage from "../Pages/LoadingPage";
import { Link } from "react-router-dom";
import ErrorAlert from "../../misc/ErrorAlert";
import InputField from "../../misc/InputField";
import ReUseComp from "../../misc/ReUseComp";

const LoginPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/home";

  useEffect(() => {
    document.title = "Login | A S K Hospitals";
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      // cleanup
    };
  }, [userInfo, props.history, redirect]);
  console.log("Data", userInfo);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
    console.log(email, password);
  };

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="home-container container">
      <div className="row" id="login-container">
        <div className="col-md-1"></div>
        <div className="col-md-5">
          <div className="image-container">
            <h1>
              A S K<br /> Hospital
            </h1>
          </div>
        </div>
        <div className="col-md-5">
          <h2>Sign-In</h2>

          <form onSubmit={handleSubmit} className="mt-5">
            {error && <ErrorAlert message={error} />}
            <ReUseComp
              avatar="fa fa-envelope"
              inputType="text"
              type="email"
              name={email}
              value={email}
              setValue={setEmail}
              placeholder="Email Address"
            />
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-lock fa-lg " />
                </span>
              </div>
              <input
                type={passwordShown ? "text" : "password"}
                className="form-control form-control-sm"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />

              <div className="input-group-append">
                <span className="input-group-text" id="basic-addon2">
                  {!passwordShown ? (
                    <i
                      className="fa fa-eye-slash"
                      onClick={togglePasswordVisiblity}
                    />
                  ) : (
                    <i
                      className="fa fa-eye"
                      onClick={togglePasswordVisiblity}
                    />
                  )}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-warning btn-sm btn-block"
              id="add-cart"
            >
              Sign-In
            </button>
            <h6 className="mt-4">New to A S K Hospital?</h6>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <button
                type="submit"
                className="btn btn-primary btn-sm btn-block mt-4"
              >
                Register your account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
