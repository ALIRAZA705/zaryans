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
import qs from "query-string";
const ResetPassword = (props) => {
  // const [account, setAccount] = useState({user});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [loggedin, setLoggedin] = useState(false);

  const handleChangePassword = () => {
    let UserID = qs.parse(props.location.search)?.userId;
    let code = qs.parse(props.location.search)?.code;
    debugger;
    // code = encodeURIComponent(code);
    if (password.trim() === "") {
      alert("Please Enter Password ");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords did Not Matched");
      return;
    } else {
      Axios.put("https://cloudclinicapi.azurewebsites.net/api/accounts/users/ResetPassword", {
        UserID: encodeURIComponent(UserID),
        newPassword: password,
        code: code.replaceAll(" ", "+"),
      })
        .then((res) => {
          console.log(res);
          if (
            res.data.toLowerCase() ===
            "Password Reset Successfully".toLowerCase()
          ) {
            alert(res.data);
            history.push("/login");
          } else {
            alert("Something went wrong.");
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error.message);
        });
    }
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
                    <h1>Reset Password</h1>
                    <p className="text-muted">Reset Password</p>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        name="changepassword"
                        onChange={(e) => setconfirmPassword(e.target.value)}
                        placeholder="Change Password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={handleChangePassword}
                        >
                          Submit
                        </CButton>
                      </CCol>
                      {/* <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
