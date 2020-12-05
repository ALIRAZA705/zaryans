import React, { useEffect, useState, createRef } from 'react';
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

export default class AddPhysician extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nationalID: ' ',
      healthCareLicenseID: '',
      name: '',
      dob: '',
      gender: '',
      address: '',
      phone: '',
      healthCareLicenseValidDate: ' ',
      speciality: ' ',
      discriminator: ' '
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {

    this.setState({ [event.target.id]: event.target.value });
  }

  onCreatePhysician = () => {

    console.log(this.state);
    fetch('https://cloudclinicapi.azurewebsites.net/api/physician', {
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
        <h4>Add Physician</h4>
    </div>
</div>
<hr></hr>
<div className="form-horizontal">
<div class="form-body">
        <div className="form-group row">
          <label class="control-label col-sm-2" htmlFor="nationalID">National ID</label>
          <div class="col-sm-6">
          <input type="text" onChange={this.handleChange} className="form-control" id="nationalID" placeholder="Enter national identification code" />
        </div>
        </div>

        <div className="form-group row">
          <label class="control-label col-sm-2" htmlFor="healthCareLicenseID"> HealthCareLicense ID</label>
          <div class="col-sm-6">
          <input type="text" onChange={this.handleChange} className="form-control" id="healthCareLicenseID" placeholder="Enter Health Care License code" />
        </div>
        </div>
        <div className="form-group row">
          <label class="control-label col-sm-2" htmlFor="gender">Gender</label>
          <div class="col-sm-6">
          <select value={this.state.Gender} className="form-control" id="gender" onChange={this.handleChange}>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Undisclosed">Prefer not to disclose</option>
          </select>
        </div>
        </div>
        <div className="form-group row">
          <label class="control-label col-sm-2" htmlFor="name">Physician Name</label>
          <div class="col-sm-6">
          <input type="text" onChange={this.handleChange} className="form-control" id="name" placeholder="Enter physician name" />
        </div>
        </div>
        <div className="form-group row">
          <label class="control-label col-sm-2" htmlFor="dob">Date of Birth</label>
          <div class="col-sm-6">
          <input type="Date" onChange={this.handleChange} className="form-control" id="dob" placeholder="Enter date of birth" />
        </div>
        </div>
        <div className="form-group row">
          <label class="control-label col-sm-2" htmlFor="healthCareLicenseValidDate">Health Care License Valid Date</label>
          <div class="col-sm-6">
          <input type="Date" onChange={this.handleChange} className="form-control" id="healthCareLicenseValidDate" placeholder="Enter Health Care License Validity Date" />
        </div>
        </div>
        <div className="form-group row">
          <label class="control-label col-sm-2" htmlFor="address">Address</label>
          <div class="col-sm-6">
          <input type="text" onChange={this.handleChange} className="form-control" id="address" placeholder="Enter address" />
        </div>
        </div>
        <div className="form-group row">
          <label class="control-label col-sm-2" htmlFor="phone">Phone</label>
          <div class="col-sm-6">
          <input type="text" onChange={this.handleChange} className="form-control" id="phone" placeholder="Enter phone" />
        </div>
        </div>
        <div className="form-group row">
          <label class="control-label col-sm-2" htmlFor="speciality">Speciality</label>
          <div class="col-sm-6">
          <select value={this.state.Speciality} className="form-control" id="speciality" onChange={this.handleChange}>
            <option value="CARDIOLOGIST">CARDIOLOGIST</option>
            <option value="FAMILY PHYSICIAN">FAMILY PHYSICIAN</option>
            <option value="PEDIATRICIAN">PEDIATRICIAN</option>
            <option value="PSYCHIATRIST">PSYCHIATRIST</option>
            <option value="FAMILY PHYSICIAN">FAMILY PHYSICIAN</option>
            <option value="GYNECOLOGIST">GYNECOLOGIST</option>
            <option value="SURGEON">SURGEON</option>
            <option value="PATHOLOGIST">PATHOLOGIST</option>
            <option value="NEUROLOGIST">NEUROLOGIST</option>
            <option value="UROLOGIST">UROLOGIST</option>
            <option value="DERMATOLOGIST">DERMATOLOGIST</option>
            <option value="RADIOLOGIST">RADIOLOGIST</option>
          </select>
          </div>
        </div>
        <div className="form-group row">
          <label class="control-label col-sm-2" htmlFor="discriminator">Discriminator</label>
          <div class="col-sm-6">
          <input type="text" onChange={this.handleChange} className="form-control" id="discriminator" placeholder="Enter Discriminator" />
          </div>
        </div>

        <div className="form-group row">
        <label class="control-label col-sm-2" htmlFor="discriminator"></label>
          <div class="col-sm-6">
          <button onClick={this.onCreatePhysician} className="btn btn-primary pull-right">Save</button>
          </div>
        </div>
        </div>
        </div>
      </form>
      
    );
  }
}
