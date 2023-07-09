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
} from "mdb-react-ui-kit";
import welcome from "../../images/image2.jpg";

function SignUp() {
  const [regInfo, setRegInfo] = useState({
    names: "",
    email: "",
    username: "",
    password: "",
  });
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
              <MDBInput
                wrapperClass="mb-4"
                label="Names"
                id="formControlLg"
                type="names"
                size="lg"
                onChange={(e) => {
                  let text = e.target.value;
                  let info = { ...regInfo };
                  let name = info.names;
                  name = text;
                  info.names = name;
                  setRegInfo(info);
                }}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="formControlLg"
                type="email"
                size="lg"
                onChange={(e) => {
                  let text = e.target.value;
                  let info = { ...regInfo };
                  let email = info.email;
                  email = text;
                  info.email = email;
                  setRegInfo(info);
                }}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="username"
                id="formControlLg"
                type="username"
                size="lg"
                onChange={(e) => {
                  let text = e.target.value;
                  let info = { ...regInfo };
                  let username = info.username;
                  username = text;
                  info.username = username;
                  setRegInfo(info);
                }}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="password"
                id="formControlLg"
                type="password"
                size="lg"
                onChange={(e) => {
                  let text = e.target.value;
                  let info = { ...regInfo };
                  let password = info.password;
                  password = text;
                  info.password = password;
                  setRegInfo(info);
                }}
              />
              <MDBBtn
                className="mb-4 px-5"
                color="dark"
                size="lg"
                onClick={() => console.log(regInfo)}
                disabled={
                  regInfo.email === "" ||
                  regInfo.names === "" ||
                  regInfo.username === "" ||
                  regInfo.password === ""
                }
              >
                Register
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
