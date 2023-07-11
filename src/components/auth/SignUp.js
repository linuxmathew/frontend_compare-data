import React, { useState } from "react";
import "./Login.css";
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
import welcome from "../../images/image2.jpg";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "./Auth";
import { successToastMessage } from "../utilities/ShowToastInfo";

function SignUp() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [regInfo, setRegInfo] = useState({
    names: "",
    email: "",
    username: "",
    password: "",
  });
  const { names, email, username, password } = regInfo;

  const handleFormChange = (e) => {
    setRegInfo({ ...regInfo, [e.target.name]: e.target.value });
    setErrorMessage(false);
  };

  const signUp = async (e) => {
    console.log("regInfo", regInfo);
    e.preventDefault();
    try {
      setIsLoading(true);
      // makes authentication to firebase
      const { user } = await createUserWithEmailAndPassword(
        auth,
        regInfo.email,
        regInfo.password
      );
      console.log(user);

      // update profile
      await updateProfile(user, {
        displayName: names,
      });
      console.log("response", user);

      // add addition reg info to db
      const response = await AxiosInstance.post("/api/register", {
        names: names,
        email: email,
        username: username,
        userId: user.uid,
      });
      // on successful log-in- redirect to resource
      console.log("response", response);
      setIsLoading(false);
      successToastMessage({ message: "Registration successful" });
      navigate("/sign-in");
    } catch (err) {
      setIsLoading(false);
      console.log(err.message);
      setErrorMessage(err.message);
      if (err.message === "Firebase: Error (auth/user-not-found).") {
        setErrorMessage("Invalid credential");
        // setError(true);
      }
    }
  };
  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className="g-0">
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
                Create your account
              </h5>
              {errorMessage !== "" && (
                <p className="small text-danger">
                  {/* replace with info coming from backend based on status */}
                  {errorMessage}
                </p>
              )}
              <MDBInput
                wrapperClass="mb-4"
                label="Names"
                id="formControlLg"
                type="names"
                name="names"
                value={names}
                size="lg"
                onChange={handleFormChange}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="formControlLg"
                type="email"
                name="email"
                value={email}
                size="lg"
                onChange={handleFormChange}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="username"
                id="formControlLg"
                type="username"
                name="username"
                value={username}
                size="lg"
                onChange={handleFormChange}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="password"
                id="formControlLg"
                type="password"
                name="password"
                value={password}
                size="lg"
                onChange={handleFormChange}
              />
              <MDBBtn
                className="mb-4 px-5"
                color="dark"
                size="lg"
                onClick={signUp}
                disabled={
                  email === "" ||
                  names === "" ||
                  username === "" ||
                  password === ""
                }
              >
                {isLoading ? <MDBSpinner /> : "Register"}
              </MDBBtn>

              <div className="d-flex flex-row justify-content-center">
                <p className="small text-muted me-1">&copy;</p>
                <p className="small text-muted me-1">company compare</p>
              </div>
            </MDBCardBody>
          </MDBCol>
          <MDBCol md="6 d-none d-md-block">
            <MDBCardImage
              src={welcome}
              alt="login-form"
              className="rounded-end w-100"
            />
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default SignUp;
