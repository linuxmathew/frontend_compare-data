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
  MDBSpinner,
} from "mdb-react-ui-kit";
import AxiosInstance from "./auth/Auth";
import { successToastMessage } from "./utilities/ShowToastInfo";

function Resource() {
  const [compareData, setCompareData] = useState(false);
  const [allData, setAllData] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [viewUsers, setViewUsers] = useState(true);
  const [userIndex, setUserIndex] = useState(0);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [userId, setUserId] = useState("");
  const [singleView, setSingleView] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [companyData, setCompanyData] = useState({
    noOfCompany: 0,
    productPerCompany: 0,
  });

  const { noOfCompany, productPerCompany } = companyData;

  const onInputChange = (e) => {
    setCompanyData({ ...companyData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserDetails(user);
        setUserId(user.uid);
        // console.log(user);

        // get Id token
        try {
          const idToken = await user.getIdToken();
          setToken(idToken);
        } catch (error) {
          console.log("Error retrieving Id token");
        }
      } else {
        setUserDetails(null);
        setCompanyData(false);
        navigate("/sign-in");
      }
    });

    return () => {
      listen();
    };
  }, [navigate, token]);

  const userSignOut = async () => {
    try {
      const response = signOut(auth);
      console.log("signout success", response);
      navigate("/sign-in");
      successToastMessage({ message: "Signed out successfully, see you soon" });
    } catch {
      console.log("unable to signout");
    }
  };

  const sendCompanyData = async () => {
    const data = { ...companyData, userId: userId };
    console.log("data", data);
    try {
      const response = await AxiosInstance.put(
        `/api/users/:userId/companies`,
        data,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      console.log("userdata", response);
      if (response.status === 200) {
        successToastMessage({ message: "inputs saved successfully" });
        setSaveSuccess(true);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const users = await AxiosInstance.get("/api/users", {
        headers: { Authorization: "Bearer " + token },
      });
      console.log(users.data.obj);
      let data = users.data.obj;
      data.length < 1 ? setIsEmpty(true) : setIsEmpty(false);
      setAllData(data);
      setViewUsers(false);
      setSingleView(true);
      setCurrentUser(data[userIndex]);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const isFirstUser = userIndex === 0;
  const isLastUser = userIndex === allData.length - 1 || allData.length === 0;

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
                {saveSuccess ? (
                  <h6>informations saved successfully</h6>
                ) : (
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
                )}
              </>
            ) : (
              <>
                {singleView && (
                  <>
                    {isEmpty ? (
                      <h6> No user Record found. Please check back later</h6>
                    ) : (
                      <>
                        <h5
                          className="fw-normal my-4 pb-3"
                          style={{ letterSpacing: "1px" }}
                        >
                          Each user is shown below, click next to view others
                        </h5>
                        <MDBTable align="middle">
                          <MDBTableHead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Names</th>
                              <th scope="col">Username</th>
                              <th scope="col"> No of Companies</th>
                              <th scope="col">Products by Company</th>
                            </tr>
                          </MDBTableHead>
                          <MDBTableBody>
                            <tr>
                              <td>
                                <p className="fw-normal mb-1">
                                  {userIndex + 1}
                                </p>
                              </td>
                              <td>
                                <p className="fw-normal mb-1">
                                  {currentUser && currentUser.names}
                                </p>
                              </td>
                              <td>
                                <p className="fw-normal mb-1">
                                  {" "}
                                  {currentUser && currentUser.username}
                                </p>
                              </td>
                              <td>
                                <p className="fw-normal mb-1">
                                  {currentUser && currentUser.noofcompanies}
                                </p>
                              </td>
                              <td>
                                <p className="fw-normal mb-1">
                                  {currentUser && currentUser.productpercompany}
                                </p>
                              </td>
                            </tr>
                          </MDBTableBody>
                        </MDBTable>

                        <MDBRow className="g-3 mb-3">
                          <MDBCol className="col-6">
                            <MDBBtn
                              color="dark"
                              size="lg"
                              onClick={() => {
                                setCurrentUser(allData[userIndex - 1]);
                                setUserIndex(userIndex - 1);
                              }}
                              disabled={isFirstUser}
                            >
                              prev
                            </MDBBtn>
                          </MDBCol>
                          <MDBCol className="col-6">
                            <MDBBtn
                              color="dark"
                              size="lg"
                              onClick={() => {
                                setCurrentUser(
                                  allData && allData.length > 0
                                    ? allData[userIndex + 1]
                                    : null
                                );
                                setUserIndex(userIndex + 1);
                              }}
                              disabled={isLastUser}
                            >
                              Next
                            </MDBBtn>
                          </MDBCol>
                        </MDBRow>
                      </>
                    )}
                  </>
                )}
                {compareData && (
                  <div>
                    <h5
                      className="fw-normal my-4 pb-3"
                      style={{ letterSpacing: "1px" }}
                    >
                      Summary of all Users information
                    </h5>
                    <MDBTable align="middle">
                      <MDBTableHead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Names</th>
                          <th scope="col">Username</th>
                          <th scope="col"> No of Companies</th>
                          <th scope="col">Products by Company</th>
                        </tr>
                      </MDBTableHead>
                      <MDBTableBody>
                        {allData &&
                          allData.map((val, index) => (
                            <tr key={index}>
                              <td>
                                <p className="fw-normal mb-1">{index + 1}</p>
                              </td>
                              <td>
                                <p className="fw-normal mb-1">{val.names}</p>
                              </td>
                              <td>
                                <p className="fw-normal mb-1">{val.username}</p>
                              </td>
                              <td>
                                <p className="fw-normal mb-1">
                                  {val.noofcompanies}
                                </p>
                              </td>
                              <td>
                                <p className="fw-normal mb-1">
                                  {val.productpercompany}
                                </p>
                              </td>
                            </tr>
                          ))}
                      </MDBTableBody>
                    </MDBTable>
                  </div>
                )}
                {viewUsers ? (
                  <MDBBtn
                    className="mb-4 px-5"
                    color="dark"
                    size="lg"
                    onClick={fetchUsers}
                  >
                    {isLoading ? <MDBSpinner /> : "view users"}
                  </MDBBtn>
                ) : (
                  !compareData && (
                    <MDBBtn
                      className="mb-4 px-5"
                      color="dark"
                      size="lg"
                      onClick={() => {
                        setCompareData(true);
                        setSingleView(false);
                      }}
                      // disabled={noOfCompany === "" || productPerCompany === ""}
                    >
                      Compare
                    </MDBBtn>
                  )
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
