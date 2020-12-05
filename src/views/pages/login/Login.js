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

const Login = () => {
  // const [account, setAccount] = useState({user});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedin, setLoggedin] = useState(false);

  const handleLogin = () => {
    if (username.trim() === "") {
      alert("Please Enter User Name ");
      return;
    }
    if (password.trim() === "") {
      alert("Please Enter Password ");
      return;
    }

    Axios.post("https://cloudclinicapi.azurewebsites.net/api/accounts/users/login", {
      UserName: username,
      Password: password,
    })
      .then((res) => {
        console.log(res);
        if (res.data === "Email or Password is incorrect") {
          alert(res.data);
        } else {
          store.dispatch({
            type: "SET_TOKEN",
            payload: {
              token: "12345",
            },
          });
          history.push("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };
  //Handle Forgot Password
  const handleForgotPassword = () => {
    history.push("/forgotpassword");
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      
      <CContainer>
        <CRow className="justify-content-center">
        
        <div align="center"></div>
          <CCol md="4">
          <CRow className="justify-content-center">
          <img src= {"avatars/Logo.png"} alt='Cloud Clinic Logo' width="250px"/> 
          </CRow>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
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
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={handleLogin}
                        >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          <Link to="/forgotpassword">
                            <span style={{ cursor: "pointer" }}>
                              Forgot password?
                            </span>
                          </Link>
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
