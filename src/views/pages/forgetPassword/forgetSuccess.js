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

const ForgotPasswordSuccess = () => {
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="4">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h3>Email Sent</h3>
                    <p className="text-muted">
                      The Link has been sent Please check your email to reset
                      password &nbsp;
                      <Link to="/login">Login here</Link>
                    </p>
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

export default ForgotPasswordSuccess;
