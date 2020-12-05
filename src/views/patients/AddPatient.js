import React, { useEffect, useState, createRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap/dist/js/bootstrap.min.js';
import ReactDOM from 'react-dom';
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react';

export default class AddPatient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NationalID: '',
      Name: '',
      DOB: '',
      Gender: '',
      Address: '',
      Phone: '',
      GuardianName: ' ',
      GuardianPhone: ' '
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {

    this.setState({ [event.target.id]: event.target.value });
  }

  onCreatePatient = () => {

    console.log(this.state);
    fetch('https://cloudclinicapi.azurewebsites.net/api/patient', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    }).then(response => response.json())
      .then(status => console.log(status))
      .catch(() => console.log("Can’t access response. Blocked by browser?"));
  }

  render() {

    return (




      <form>


        <div class="row">
    <div class="col-md-4">
        <h4>Add Patient</h4>
    </div>
      </div>
<hr></hr>

<div className="form-horizontal">
<div class="form-body">
        <div className="form-group row">
          <label class="control-label col-sm-2" htmlFor="NationalID">National ID</label>
          <div class="col-sm-6">
          <input type="text" onChange={this.handleChange} className="form-control" id="NationalID" placeholder="Enter national identification code" />
          </div>
        </div>
        <div className="form-group row">
          <label class="control-label col-sm-2" htmlFor="Gender">Select Gender</label>
          <div class="col-sm-6">
          <select className="form-control" id="Gender" onChange={this.handleChange}>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Undisclosed">Prefer not to disclose</option>
          </select>
          </div>
        </div>
        <div className="form-group row">
          <label class="control-label col-sm-2" htmlFor="Name">Patient Name</label>
          <div class="col-sm-6">
          <input type="text" onChange={this.handleChange} className="form-control" id="Name" placeholder="Enter patient name" />
        </div>
        </div>

        <div className="form-group row">
          <label class="control-label col-sm-2" htmlFor="DOB">Date of Birth</label>
          <div class="col-sm-6">
          <input type="Date" onChange={this.handleChange} className="form-control" id="DOB" placeholder="Enter date of birth" />
        </div>
        </div>

        <div className="form-group row">
          <label class="control-label col-sm-2" htmlFor="Address">Address</label>
          <div class="col-sm-6">
          <input type="text" onChange={this.handleChange} className="form-control" id="Address" placeholder="Enter address" />
        </div>
        </div>

        <div className="form-group row">
          <label class="control-label col-sm-2" htmlFor="Phone">Phone</label>
          <div class="col-sm-6">
          <input type="text" onChange={this.handleChange} className="form-control" id="Phone" placeholder="Enter phone" />
        </div>
        </div>

        <div className="form-group row">
          <label class="control-label col-sm-2" htmlFor="GuardianName">Guardian Name</label>
          <div class="col-sm-6">
          <input type="text" onChange={this.handleChange} className="form-control" id="GuardianName" placeholder="Enter guardian name" />
        </div>
        </div>

        <div className="form-group row">
          <label class="control-label col-sm-2" htmlFor="GuardianPhone">Guardian Phone</label>
          <div class="col-sm-6">
          <input type="text" onChange={this.handleChange} className="form-control" id="GuardianPhone" placeholder="Enter guardian phone" />
        </div>
        </div>

        <div className="form-group row">
        <label class="control-label col-sm-2" htmlFor="GuardianPhone"></label>
        <div class="col-sm-6">
          <button onClick={this.onCreatePatient} className="btn btn-primary pull-right">Save</button>
        </div>
        </div>
     </div>
     </div>
      </form>
    );
  }
}

