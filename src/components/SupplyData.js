import React, { useState } from "react";
import "./auth/Login.css";
import { Link } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBRow,
  MDBCol,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

function SupplyData() {
  const [userData, setUserData] = useState({ username: "", password: "" });

  let obj = [
    {
      names: "Mathew",
      email: "darhoja@gmail.com",
      username: "linux23",
      password: "Oladele19",
      noOfCompanies: 22,
      productPerCompany: 5,
    },
    {
      names: "Temitayo",
      email: "linuxmathew1245@gmail.com",
      username: "linux24",
      password: "Oladele19#",
      noOfCompanies: 5,
      productPerCompany: 2,
    },
    {
      names: "Afolabi",
      email: "temfoden@gmail.com",
      username: "linux25",
      password: "Oladele19#",
      noOfCompanies: 11,
      productPerCompany: 7,
    },
  ];

  const logIn = () => {
    try {
      console.log("userdata", userData);
    } catch (err) {}
  };

  return (
    <body className="myBody py-3">
      <MDBContainer className="my-5">
        <MDBCard>
          <MDBCardBody className="d-flex flex-column">
            <div className="d-flex flex-row mt-2">
              <span className="h3 fw-bold mb-5">Welcome, {obj[0].names}</span>
            </div>
            <h5
              className="fw-normal my-4 pb-3"
              style={{ letterSpacing: "1px" }}
            >
              Kindly fill the below fields
            </h5>

            <MDBRow>
              <MDBCol md="6">
                <MDBInput
                  wrapperClass="mb-4"
                  label="No of Companies"
                  id="formControlLg"
                  type="number"
                  size="lg"
                  onChange={(e) => {
                    let text = e.target.value;
                    let info = { ...userData };
                    let name = info.username;
                    name = text;
                    info.username = name;
                    setUserData(info);
                  }}
                />
              </MDBCol>
              <MDBCol md="6">
                <MDBInput
                  wrapperClass="mb-4"
                  label="No of Products per Company"
                  id="formControlLg"
                  type="number"
                  size="lg"
                  onChange={(e) => {
                    let text = e.target.value;
                    let info = { ...userData };
                    let pass = info.password;
                    pass = text;
                    info.password = pass;
                    setUserData(info);
                  }}
                />
              </MDBCol>
            </MDBRow>

            <MDBBtn
              className="mb-4 px-5"
              color="dark"
              size="lg"
              onClick={logIn}
              disabled={userData.password === "" || userData.username === ""}
            >
              submit
            </MDBBtn>
            <p className="small text-muted text-center" href="#!">
              Enter login Details and Sign In
            </p>

            <Link className="small" to="/sign-up" style={{ color: "red" }}>
              Log out
            </Link>

            <div className="d-flex flex-row justify-content-center">
              <p className="small text-muted me-1">&copy;</p>
              <p className="small text-muted me-1">company compare</p>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </body>
  );
}

export default SupplyData;
