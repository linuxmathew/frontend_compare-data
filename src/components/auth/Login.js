import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
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
import { signInWithEmailAndPassword } from "firebase/auth";
import { successToastMessage } from "../utilities/ShowToastInfo";
// import { successToastMessage } from "../utilities/ShowToastInfo";

function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { email, password } = userData;

  const onInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setError(false);
  };

  const logIn = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await signInWithEmailAndPassword(auth, email, password);

      console.log(response);
      // on successful log-in- direct to resource
      setIsLoading(false);
      navigate("/resource");
      successToastMessage({ message: "Login successful" });
      console.log("response", response);
    } catch (err) {
      setIsLoading(false);
      console.log(err.message);
      setErrorMessage(err.message);
      setError(true);
      if (err.message === "Firebase: Error (auth/user-not-found).") {
        setErrorMessage("Invalid credential");
        setError(true);
      }
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
                    {errorMessage}
                  </p>
                )}

                <MDBInput
                  wrapperClass="mb-4"
                  label="email"
                  id="formControlLg"
                  type="email"
                  name="email"
                  size="lg"
                  value={email}
                  onChange={onInputChange}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="password"
                  id="formControlLg"
                  type="password"
                  name="password"
                  size="lg"
                  value={password}
                  onChange={onInputChange}
                />
                <MDBBtn
                  className="mb-4 px-5"
                  color="dark"
                  size="lg"
                  onClick={logIn}
                  disabled={userData.password === "" || userData.email === ""}
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
