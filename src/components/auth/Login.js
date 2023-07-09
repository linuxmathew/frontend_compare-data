import React, { useState } from "react";
import "./Login.css";
import { Link, redirect } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBRow,
  MDBCol,
  MDBCardImage,
  MDBCardBody,
  MDBIcon,
  MDBInput,
  MDBSpinner,
} from "mdb-react-ui-kit";
import sideImg from "../../images/img1.webp";
import { auth } from "../../firebase";
import { signInWithRedirect } from "firebase/auth";

function Login() {
  const [userData, setUserData] = useState({ username: "", password: "" });
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const logIn = async (e) => {
    e.preventDefault();
    try {
      const response = await signInWithRedirect(
        auth,
        userData.username,
        userData.password
      );

      console.log(response);
      setIsLoading(true);
      // on successful log-in- direct to resource
      redirect("supply-data");
      console.log("userdata", userData);
    } catch (err) {
      isLoading(false);
      setError(true);
    }
  };

  return (
    <body className="myBody py-3">
      <MDBContainer className="my-5">
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6">
              <MDBCardImage
                src={sideImg}
                alt="login-form"
                className="rounded-start w-100"
              />
            </MDBCol>
            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column">
                <div className="d-flex flex-row mt-2">
                  <MDBIcon
                    fas
                    icon="cubes fa-3x me-3"
                    style={{ color: "#ff6219" }}
                  />
                  <span className="h3 fw-bold mb-0">
                    Company & Product Analyzer
                  </span>
                </div>
                <h5
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Sign into your account
                </h5>
                {error && (
                  <p className="small text-danger">
                    {/* replace with info coming from backend based on status */}
                    username or password incorrect
                  </p>
                )}

                <MDBInput
                  wrapperClass="mb-4"
                  label="username"
                  id="formControlLg"
                  type="username"
                  size="lg"
                  value={userData.username}
                  onChange={(e) => {
                    let text = e.target.value;
                    let info = { ...userData };
                    let name = info.username;
                    name = text;
                    info.username = name;
                    setUserData(info);
                  }}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  value={userData.password}
                  onChange={(e) => {
                    let text = e.target.value;
                    let info = { ...userData };
                    let pass = info.password;
                    pass = text;
                    info.password = pass;
                    setUserData(info);
                  }}
                />
                <MDBBtn
                  className="mb-4 px-5"
                  color="dark"
                  size="lg"
                  onClick={logIn}
                  disabled={
                    userData.password === "" || userData.username === ""
                  }
                >
                  {isLoading ? <MDBSpinner /> : "Login"}
                </MDBBtn>
                <p className="small text-muted text-center" href="#!">
                  Enter login Details and Sign In
                </p>
                <p className="mb-5 pb-lg-5" style={{ color: "#393f81" }}>
                  Don't have an account?{" "}
                  <Link to="/sign-up" style={{ color: "#393f81" }}>
                    Register here
                  </Link>
                </p>
                <div className="d-flex flex-row justify-content-center">
                  <p className="small text-muted me-1">&copy;</p>
                  <p className="small text-muted me-1">company compare</p>
                </div>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </body>
  );
}

export default Login;
