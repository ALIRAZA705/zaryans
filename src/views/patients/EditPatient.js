import React, { useEffect, useState, createRef } from 'react';
import dateFormat from 'dateformat';
import { Table, Button, Alert } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

export default class EditPatient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nationalID: '',
      name: '',
      dob: '',
      gender: '',
      address: '',
      phone: '',
      guardianName: '',
      guardianPhone: '',
      IsDeleted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {

    const target = event.target;
    const value = target.value;
    const id = target.id;

    this.setState({
      [id]: value
    });
  }

  componentDidMount() {

    const queryString = require('query-string');
    var parsed = queryString.parse(this.props.location.search);
    console.log(this.state);
    console.log(this.state.dob);
    fetch("https://cloudclinicapi.azurewebsites.net/api/patient/" + parsed.Patient)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            nationalID: result.nationalID,
            name: result.name,
            address: result.address,
            //dob: new Date(result.dob).toLocaleDateString('en-US'),
            dob: dateFormat(result.dob, 'mm/dd/yyyy'),
            gender: result.gender,
            phone: result.phone,
            guardianName: result.guardianName,
            guardianPhone: result.guardianPhone,
            IsDeleted: false
          });

        },
        (error) => {
          this.setState({

          });
        }
      )
  }
  handleSubmit(event) {

    fetch('https://cloudclinicapi.azurewebsites.net/api/patient/933585789', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    }).then(response => response.json())
      .then(status => console.log(status))
      .catch(() => console.log("Can’t access response. Blocked by browser?"));
  }

  //   onEditPatient=()=>{
  //   
  //   console.log(this.state.patient);
  //       fetch('https://cloudclinicapi.azurewebsites.net/api/patient/35202-2222222-2', {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify( this.state.patient )
  //   }).then(response => response.json())
  //   .then(status => console.log(status))
  //   .catch(() => console.log("Can’t access response. Blocked by browser?"));
  // }
  onDeletePatient = () => {

    this.setState({
      IsDeleted: true
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>

<div class="row">
    <div class="col-md-4">
        <h4>Edit Patient</h4>
    </div>
      </div>
<hr></hr>
<div className="form-horizontal">
<div class="form-body">
        <div className="form-group row">
          <label class="control-label col-sm-2" htmlFor="nationalID">National ID</label>
          <div class="col-sm-6">
          <input type="text" value={this.state.nationalID} onChange={this.handleChange} className="form-control" id="nationalID" placeholder="Enter national identification code" />
        </div>
        </div>

        <div className="form-group row">
          <label class="control-label col-sm-2" htmlFor="gender">Select Gender</label>
          <div class="col-sm-6">
          <select value={this.state.gender} className="form-control" id="gender" onChange={this.handleChange}>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Undisclosed">Prefer not to disclose</option>
          </select>
        </div>
        </div>

        <div className="form-group row">
          <label class="control-label col-sm-2" htmlFor="patientName">Patient Name</label>
          <div class="col-sm-6">
          <input type="text" value={this.state.name} onChange={this.handleChange} className="form-control" id="name" placeholder="Enter patient name" />
        </div>
        </div>

        <div className="form-group row">
          <label class="control-label col-sm-2" htmlFor="dob">Date of Birth</label>
          <div class="col-sm-6">
          <input type="text" value={this.state.dob} dateFormat="YYYY-MM-DD" onChange={this.handleChange} className="form-control" id="dob" placeholder="Enter date of birth" />
        </div>
        </div>

        <div className="form-group row">
          <label class="control-label col-sm-2" htmlFor="address">Address</label>
          <div class="col-sm-6">
          <input type="text" value={this.state.address} onChange={this.handleChange} className="form-control" id="address" placeholder="Enter address" />
        </div>
        </div>

        <div className="form-group row">
          <label class="control-label col-sm-2" htmlFor="phone">Phone</label>
          <div class="col-sm-6">
          <input type="text" value={this.state.phone} onChange={this.handleChange} className="form-control" id="phone" placeholder="Enter phone" />
        </div>
        </div>

        <div className="form-group row">
          <label class="control-label col-sm-2" htmlFor="guardianName">Guardian Name</label>
          <div class="col-sm-6">
          <input type="text" value={this.state.guardianName} onChange={this.handleChange} className="form-control" id="guardianName" placeholder="Enter guardian name" />
        </div>
        </div>

        <div className="form-group row">
          <label class="control-label col-sm-2" htmlFor="guardianPhone">Guardian Phone</label>
          <div class="col-sm-6">
          <input type="text" value={this.state.guardianPhone} onChange={this.handleChange} className="form-control" id="guardianPhone" placeholder="Enter guardian phone" />
        </div>
        </div>

        <div className="form-group row">
        <label class="control-label col-sm-2"></label>
        <div class="col-sm-1">
          <input type="submit" value="Update" className="btn btn-primary pull-right" />
          </div>
          <div class="col-sm-1">
          <input type="submit" onClick={this.onDeletePatient} value="Delete" className="btn btn-primary btn-danger pull-right" />
        </div>
        </div>
        </div>
        </div>
      </form>
    );
  }
}
