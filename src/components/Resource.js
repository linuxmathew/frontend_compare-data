import React, { useEffect, useState } from "react";
import "./auth/Login.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBRow,
  MDBCol,
  MDBCardBody,
  MDBInput,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";

function Resource() {
  const [compareData, setCompareData] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [companyData, setCompanyData] = useState({
    noOfCompany: "",
    productPerCompany: "",
  });

  const { noOfCompany, productPerCompany } = companyData;

  const onInputChange = (e) => {
    setCompanyData({ ...companyData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserDetails(user);
      } else {
        setUserDetails(null);
        setCompanyData(false);
        navigate("/sign-in");
      }
    });

    return () => {
      listen();
    };
  }, [navigate]);

  const userSignOut = async () => {
    try {
      const response = signOut(auth);
      console.log("signout success", response);
      navigate("/sign-in");
    } catch {
      console.log("unable to signout");
    }
  };

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

  const sendCompanyData = () => {
    try {
      console.log("userdata", userDetails);
    } catch (err) {}
  };

  return (
    <body className="myBody py-3">
      <MDBContainer className="my-5">
        <MDBCard>
          <MDBCardBody className="d-flex flex-column">
            <div className="d-flex flex-row mt-2">
              <span className="h3 fw-bold mb-5">
                Welcome, {userDetails && userDetails.displayName}
              </span>
            </div>
            {userDetails && userDetails.email !== "temfoden@gmail.com" ? (
              <>
                <h5
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Kindly fill the below fields and hit submit
                </h5>

                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="No of Companies"
                      id="formControlLg"
                      type="number"
                      size="lg"
                      min="0"
                      name="noOfCompany"
                      value={noOfCompany}
                      onChange={onInputChange}
                    />
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="No of Products per Company"
                      id="formControlLg"
                      type="number"
                      size="lg"
                      name="productPerCompany"
                      min="0"
                      value={productPerCompany}
                      onChange={onInputChange}
                    />
                  </MDBCol>
                </MDBRow>

                <MDBBtn
                  className="mb-4 px-5"
                  color="dark"
                  size="lg"
                  onClick={sendCompanyData}
                  disabled={noOfCompany === "" || productPerCompany === ""}
                >
                  submit
                </MDBBtn>
              </>
            ) : (
              <>
                <h5
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  View and compare the users' inputs by clicking the below
                  buttons
                </h5>

                {companyData && (
                  <div>
                    <MDBTable align="middle">
                      <MDBTableHead>
                        <tr>
                          <th scope="col">Names</th>
                          <th scope="col">Username</th>
                          <th scope="col"> No of Companies</th>
                          <th scope="col">Products by Company</th>
                        </tr>
                      </MDBTableHead>
                      <MDBTableBody>
                        {obj.map((val) => (
                          <tr>
                            <td>
                              <p className="fw-normal mb-1">{val.names}</p>
                            </td>
                            <td>
                              <p className="fw-normal mb-1">{val.username}</p>
                            </td>
                            <td>
                              <p className="fw-normal mb-1">
                                {val.noOfCompanies}
                              </p>
                            </td>
                            <td>
                              <p className="fw-normal mb-1">
                                {val.productPerCompany}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </MDBTableBody>
                    </MDBTable>
                  </div>
                )}

                {!compareData && (
                  <MDBBtn
                    className="mb-4 px-5"
                    color="dark"
                    size="lg"
                    onClick={() => {
                      console.log(companyData);
                      setCompareData(true);
                    }}
                    // disabled={noOfCompany === "" || productPerCompany === ""}
                  >
                    Compare
                  </MDBBtn>
                )}
              </>
            )}

            <div className="pt-5">
              <MDBBtn
                className="small bg-light"
                style={{ color: "red" }}
                onClick={userSignOut}
              >
                Log out
              </MDBBtn>
            </div>

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

export default Resource;
