import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import history from "../../../history";
import CIcon from "@coreui/icons-react";
import Axios from "axios";
import { connect } from "react-redux";
import { store } from "../../../store";

const ForgotPassword = () => {
  // const [account, setAccount] = useState({user});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedin, setLoggedin] = useState(false);

  const handleLogin = () => {
    if (username.trim() === "") {
      alert("Please Enter User Email I.D ");
      return;
    }

    Axios.post("https://cloudclinicapi.azurewebsites.net/api/accounts/users/forgetpassword", {
      UserName: username,
    })
      .then((res) => {
        console.log(res);
        if (res.data === "Email not Exist") {
          alert(res.data);
        } else {
          history.push("/fogetSuccess");
          alert("Email Sent To Your Email Address");
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="4">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h3>Forgot Password</h3>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        autoComplete="username"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          color="primary"
                          className="px-4 mb-2"
                          onClick={handleLogin}
                        >
                          Submit
                        </CButton>
                      </CCol>
                      {/* <CCol xs="12"> */}
                      {/* <CButton color="link" className="d-block"> */}
                      Already have an account ? &nbsp;
                      <Link to="/login"> Login</Link>
                      {/* </CButton> */}
                      {/* </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userReducer: state.userReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setToken: () => dispatch(alert("")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
