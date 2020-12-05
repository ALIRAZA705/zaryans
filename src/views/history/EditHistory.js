import React, { useEffect, useState, createRef } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
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
const PrettoSlider = withStyles({
  root: {
    color: '#264F7D',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);
class EditHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      HistoryID: '',
      ADDnADHD: '',
      ChronicFatigueSyndrome: '',
      Gout: '',
      IsDeleted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //   handleChange(e) {
  //   //e.persist();

  //   this.setState(({ patient: { [e.target.id]: e.target.value }}))
  // }

  handleChange(event) {

    const target = event.target;
    const value = target.value;
    const id = target.id;

    this.setState({
      [id]: value
    });
  }

  // handleChange(event) {
  //     
  //     this.setState(patient:{[event.target.id]: event.target.value});
  //   }

  componentDidMount() {

    console.log(this.state);
    fetch("https://cloudclinicapi.azurewebsites.net/api/history/1")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            HistoryID: result.HistoryID,
            ADDnADHD: result.ADDnADHD,
            ChronicFatigueSyndrome: result.ChronicFatigueSyndrome,
            Gout: result.Gout,
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

    fetch('https://cloudclinicapi.azurewebsites.net/api/history/1', {
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
  onDeleteHistory = () => {

    this.setState({
      IsDeleted: true
    });
  }

  render() {

    const classes = {
      root: {
        color: "#264F7D",
        height: 8,
      },
      thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
          boxShadow: 'inherit',
        },
      },
      active: {},
      valueLabel: {
        left: 'calc(-50% + 4px)',
      },
      track: {
        height: 8,
        borderRadius: 4,
      },
      rail: {
        height: 8,
        borderRadius: 4,
      },
    };
    return (
      <form onSubmit={this.handleSubmit}>
        {/* <div className="form-group">
      <label htmlFor="HistoryID">History ID</label>
      <input type="text" value={this.state.HistoryID} onChange={this.handleChange} className="form-control" id="HistoryID" placeholder="Enter national identification code"/>
    </div>
    <div className="form-group">
      <label htmlFor="Patient_NationalID">History ID</label>
      <input type="text" value={this.state.Patient_NationalID} onChange={this.handleChange} className="form-control" id="Patient_NationalID" placeholder="Enter national identification code"/>
    </div>
      <div className="form-group">
                  <label htmlFor="ADDnADHD">ADD/ADHD</label>
                  <select value={this.state.ADDnADHD} className="form-control" id="ADDnADHD" onChange={this.handleChange}>
                    <option value="False">No</option>
                    <option value="True">Yes</option>
                    <option value="NA">Not Applicable</option>
                  </select>
              </div>
              <div className="form-group">
                  <label htmlFor="ChronicFatigueSyndrome">ChronicFatigueSyndrome</label>
                  <select value={this.state.ChronicFatigueSyndrome} className="form-control" id="ChronicFatigueSyndrome" onChange={this.handleChange}>
                    <option value="False">No</option>
                    <option value="True">Yes</option>
                    <option value="NA">Not Applicable</option>
                  </select>
              </div>
              <div className="form-group">
                  <label htmlFor="Gout">Gout</label>
                  <select value={this.state.Gout} className="form-control" id="Gout" onChange={this.handleChange}>
                    <option value="False">No</option>
                    <option value="True">Yes</option>
                    <option value="NA">Not Applicable</option>
                  </select>
              </div>
               <div className="form-group">
                <input type="submit" value="Update" className="btn btn-primary pull-right"/>
                <input type="submit" onClick={this.onDeleteHistory} value="Delete" className="btn btn-primary btn-danger pull-right"/>
              </div>  */}
        <div style={{ fontSize: "15px", fontWeight: "bold", background: "white", padding: "15px" }}>
          <div class="row">
            <div class="col-sm-10"></div>
            <div class="col-sm-2">
              <button className="btn pull-left" onClick={() => this.operation()}>🚺</button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="HistoryID">History ID</label>
            <input
              type="text"
              onChange={this.handleChange}
              className="form-control"
              id="HistoryID"
              placeholder="Enter History identification code"
            />
          </div>
          <dv className="form-group">
            <label htmlFor="Patient_NationalID">National ID</label>
            <input
              type="text"
              onChange={this.handleChange}
              className="form-control"
              id="Patient_NationalID"
              placeholder="Enter national identification code"
            />
          </dv>

          <label htmlFor="CheifComplaint">Cheif Complaint</label>
          <div class="row">
            <div class="col-sm-3">

              <div>
                <input onChange={this.handleChange} type="checkbox"></input>
                <label class="col-sm-8" for="vehicle1">Fever</label></div>


              <div>

              </div>


            </div>
            <div class="col-sm-3">
              <div>
                <input onChange={this.handleChange} type="checkbox" ></input>
                <label class="col-sm-8" for="vehicle1">Shortness of Breath</label></div>


              <div>

              </div>


            </div>
            <div class="col-sm-3">

              <div>
                <input onChange={this.handleChange} type="checkbox" ></input>
                <label class="col-sm-8" for="vehicle1">Weakness</label></div>


              <div>

              </div>


            </div>
            <div class="col-sm-3">

              <div>
                <input onChange={this.handleChange} type="checkbox" ></input>
                <label class="col-sm-8" for="vehicle1">Weight Loss</label></div>

              <div>

              </div>

            </div>
          </div>

          <div className={classes.margin} />


          <div class="row">
            <div class="col-sm-3">

              {this.state.showPS ? (
                <div>

                  <input onClick={() => this.operationPS()} type="checkbox" ></input>
                  <label class="col-sm-8" for="vehicle1">Pain</label></div>
              ) : null}
              {this.state.showPSD ? (

                <div class="row">
                  <label style={{ padding: "10px" }}>Pain Level</label>
                  <div class='col-sm-12'>
                    {/* <label htmlFor="CurrentMedications">Pain Scale</label> */}
                    <PrettoSlider onChange={this.handleChange} id="Pain" defaultValue={3} step={1}
                      marks
                      min={1}
                      max={10} valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={5} />


                  </div>

                </div>) : null}


              <div>

              </div>


            </div>
            <div class="col-sm-3">
              {this.state.showAO ? (
                <div >
                  <input onClick={() => this.operationDetailAO()} type="checkbox"></input>
                  <label class="col-sm-8" >Any Other</label></div>
              ) : null}
              {this.state.showAOD ? (
                <div>
                  <input
                    type="text"
                    onChange={this.handleChange}
                    className="form-control"
                    id="Patient_NationalID"
                    placeholder="Enter any other details"
                  />
                </div>

              ) : null}




            </div>
            <div class="col-sm-3">





            </div>
            <div class="col-sm-3">





            </div>
          </div>




          <div className="form-group">
            <label htmlFor="CurrentMedications">Current Medications</label>
            <input
              type="text"
              onChange={this.handleChange}
              className="form-control"
              id="CurrentMedications"
              placeholder="Enter Current Medications"
            />
          </div>
          <div className="form-group">
            <label htmlFor="CurrentMedications">Allergies</label>
            <input
              type="text"
              onChange={this.handleChange}
              className="form-control"
              id="CurrentMedications"
              placeholder="Enter Current Allergies"
            />
          </div>
          <div className="form-group">
            <label htmlFor="CurrentMedications">Immunization</label>
            <input
              type="text"
              onChange={this.handleChange}
              className="form-control"
              id="CurrentMedications"
              placeholder="Enter Immunizations"
            />
          </div>
          <div className="form-group">
            <label htmlFor="CurrentMedications">Hospitalization</label>
            <input
              type="text"
              onChange={this.handleChange}
              className="form-control"
              id="CurrentMedications"
              placeholder="Enter Hospitalizations"
            />
          </div>
          <div className="form-group">
            <label htmlFor="CurrentMedications">Surgries</label>
            <input
              type="text"
              onChange={this.handleChange}
              className="form-control"
              id="CurrentMedications"
              placeholder="Enter Surgries"
            />
          </div>
          <div className="form-group">
            <label htmlFor="CurrentMedications">Expired Family member</label>
            <input
              type="text"
              onChange={this.handleChange}
              className="form-control"
              id="CurrentMedications"
              placeholder="Enter Expired family member"
            />
          </div>
          <div className="form-group">
            <label htmlFor="CurrentMedications">Cause of death</label>
            <input
              type="text"
              onChange={this.handleChange}
              className="form-control"
              id="CurrentMedications"
              placeholder="Enter Cause of death"
            />
          </div>
          <div className="form-group">
            <label htmlFor="CurrentMedications">
              Family member with disease
            </label>
            <input
              type="text"
              onChange={this.handleChange}
              className="form-control"
              id="CurrentMedications"
              placeholder="Enter family member with disease"
            />
          </div>
          <div className="form-group">
            <label htmlFor="CurrentMedications">Disease</label>
            <input
              type="text"
              onChange={this.handleChange}
              className="form-control"
              id="CurrentMedications"
              placeholder="Enter disease"
            />
          </div>

          <div className="form-group">
            <div class="row">
              <div class="col-sm-3">
                {this.state.showBP ? (
                  <div>
                    <input onClick={() => this.operationDetailBP()} type="checkbox" ></input>
                    <label class="col-sm-8">Birth Problems</label></div>
                ) : null}
                {this.state.showBPD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="Patient_NationalID"
                      placeholder="Enter Birth Problems"
                    />
                  </div>

                ) : null}
              </div>
              <div class="col-sm-3">         {this.state.showCI ? (
                <div>
                  <input onClick={() => this.operationDetailCI()} type="checkbox" ></input>
                  <label class="col-sm-8" >Childhood Illness </label></div>
              ) : null}
                {this.state.showCID ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="Patient_NationalID"
                      placeholder="Enter Childhood Illness Details"
                    />
                  </div>

                ) : null}
              </div>
              <div class="col-sm-3">
                {this.state.showAMA ? (
                  <div>
                    <input onClick={() => this.operationDetailAMA()} type="checkbox" ></input>
                    <label class="col-sm-8" >Any Major Accident</label></div>
                ) : null}
                {this.state.showAMAD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="Patient_NationalID"
                      placeholder="Enter Details of major accident"
                    />
                  </div>

                ) : null}
              </div>
              <div class="col-sm-3">
                {this.state.showBT ? (
                  <div>
                    <input onClick={() => this.operationDetailBT()} type="checkbox"></input>
                    <label class="col-sm-8" for="vehicle1">Blood Transfusion</label></div>
                ) : null}
                {this.state.showBTD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="Patient_NationalID"
                      placeholder="Enter details of blood transfusion"
                    />
                  </div>

                ) : null}
              </div>
            </div>


            <div class="row">
              <div class="col-sm-3">
                {this.state.showBP ? (
                  <div>
                    <input onClick={() => this.operationDetailDIS()} type="checkbox" ></input>
                    <label class="col-sm-8" for="vehicle1">Disability</label></div>
                ) : null}
                {this.state.showDISD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="Patient_NationalID"
                      placeholder="Enter Disability details"
                    />
                  </div>

                ) : null}
              </div>
              <div class="col-sm-3">         {this.state.showBP ? (
                <div>
                  <input onClick={() => this.operationDetailSTK()} type="checkbox" ></input>
                  <label class="col-sm-8" for="vehicle1">Stroke</label></div>
              ) : null}
                {this.state.showSTKD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="Patient_NationalID"
                      placeholder="Enter Stroke Details"
                    />
                  </div>

                ) : null}
              </div>
              <div class="col-sm-3">
                {this.state.showBP ? (
                  <div>
                    <input onClick={() => this.operationDetailSIZ()} type="checkbox" ></input>
                    <label class="col-sm-8" for="vehicle1">Seizure</label></div>
                ) : null}
                {this.state.showSIZD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="Patient_NationalID"
                      placeholder="Enter Details of Seizure"
                    />
                  </div>

                ) : null}
              </div>
              <div class="col-sm-3">
                {this.state.showBP ? (
                  <div>
                    <input onClick={() => this.operationDetailHI()} type="checkbox" ></input>
                    <label class="col-sm-8" for="vehicle1">Head Injury</label></div>
                ) : null}
                {this.state.showHID ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="Patient_NationalID"
                      placeholder="Enter details of Head Injury"
                    />
                  </div>

                ) : null}
              </div>
            </div>
            <div class="row">
              <div class="col-sm-3">
                {this.state.showBP ? (
                  <div>
                    <input onClick={() => this.operationDetailHA()} type="checkbox"></input>
                    <label class="col-sm-8" >Headaches</label></div>
                ) : null}
                {this.state.showHAD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="Patient_NationalID"
                      placeholder="Enter Headaches details"
                    />
                  </div>

                ) : null}
              </div>
              <div class="col-sm-3">         {this.state.showBP ? (
                <div>
                  <input onClick={() => this.operationDetailEyeP()} type="checkbox"></input>
                  <label class="col-sm-8" for="vehicle1">Eye Problems</label></div>
              ) : null}
                {this.state.showEyePD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="EyeProblems"
                      placeholder="Enter Eye Problems Details"
                    />
                  </div>

                ) : null}
              </div>
              <div class="col-sm-3">
                {this.state.showBP ? (
                  <div>
                    <input onClick={() => this.operationDetailSD()} type="checkbox" ></input>
                    <label class="col-sm-8" for="vehicle1">Sleep Disturbances</label></div>
                ) : null}
                {this.state.showSDD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="SleepDisturbances"
                      placeholder="Enter Details Sleep Disturbances"
                    />
                  </div>

                ) : null}
              </div>
              <div class="col-sm-3">
                {this.state.showBP ? (
                  <div>
                    <input onClick={() => this.operationDetailEarP()} type="checkbox" ></input>
                    <label class="col-sm-8" for="vehicle1">Ear Problems</label></div>
                ) : null}
                {this.state.showEarPD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="EarProblems"
                      placeholder="Enter Details of Ear Problems"
                    />
                  </div>

                ) : null}
              </div>
            </div>
            <div class="row">
              <div class="col-sm-3">
                {this.state.showBP ? (
                  <div>
                    <input onClick={() => this.operationDetailNP()} type="checkbox" ></input>
                    <label class="col-sm-8" for="vehicle1">Nose Problems</label></div>
                ) : null}
                {this.state.showNPD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="NoseProblems"
                      placeholder="Enter Nose Problems details"
                    />
                  </div>

                ) : null}
              </div>
              <div class="col-sm-3">         {this.state.showBP ? (
                <div>
                  <input onClick={() => this.operationDetailTP()} type="checkbox" ></input>
                  <label class="col-sm-8" for="vehicle1">Throat Problems</label></div>
              ) : null}
                {this.state.showTPD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="ThroatProblems"
                      placeholder="Enter Throat Problem Details"
                    />
                  </div>

                ) : null}
              </div>
              <div class="col-sm-3">
                {this.state.showBP ? (
                  <div>
                    <input onClick={() => this.operationDetailDOP()} type="checkbox" ></input>
                    <label class="col-sm-8" for="vehicle1">Dental/Oral Problems</label></div>
                ) : null}
                {this.state.showDOPD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="Dental_OralProblems"
                      placeholder="Enter Details of Dental/Oral Problems"
                    />
                  </div>

                ) : null}
              </div>
              <div class="col-sm-3">
                {this.state.showBP ? (
                  <div>
                    <input onClick={() => this.operationDetailHP()} type="checkbox" ></input>
                    <label class="col-sm-8" for="vehicle1">Heart Problems</label></div>
                ) : null}
                {this.state.showHPD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="HeartProblems"
                      placeholder="Enter details of Heart Problems"
                    />
                  </div>

                ) : null}
              </div>
            </div> <div class="row">
              <div class="col-sm-3">
                {this.state.showBP ? (
                  <div>
                    <input onClick={() => this.operationDetailLungP()} type="checkbox" ></input>
                    <label class="col-sm-8" >Lung Problems</label></div>
                ) : null}
                {this.state.showLungPD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="LungProblems"
                      placeholder="Enter Lung Problems details"
                    />
                  </div>

                ) : null}
              </div>
              <div class="col-sm-3">         {this.state.showBP ? (
                <div>
                  <input onClick={() => this.operationDetailOHOP()} type="checkbox" ></input>
                  <label class="col-sm-8" >On Home Oxygen Problems </label></div>
              ) : null}
                {this.state.showOHOPD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="OnHomeOxygenProblems"
                      placeholder="Enter On Home Oxygen Problems  Details"
                    />
                  </div>

                ) : null}
              </div>
              <div class="col-sm-3">
                {this.state.showBP ? (
                  <div>
                    <input onClick={() => this.operationDetailSP()} type="checkbox"></input>
                    <label class="col-sm-8" >Swalloing Problems</label></div>
                ) : null}
                {this.state.showSPD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="SwalloingProblems"
                      placeholder="Enter Details of Swalloing Problems"
                    />
                  </div>

                ) : null}
              </div>
              <div class="col-sm-3">
                {this.state.showBP ? (
                  <div>
                    <input onClick={() => this.operationDetailLivP()} type="checkbox" ></input>
                    <label class="col-sm-8" >Liver Problems</label></div>
                ) : null}
                {this.state.showLivPD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="LiverProblems"
                      placeholder="Enter details of Liver Problems"
                    />
                  </div>

                ) : null}
              </div>
            </div> <div class="row">
              <div class="col-sm-3">
                {this.state.showBP ? (
                  <div>
                    <input onClick={() => this.operationDetailSIP()} type="checkbox" ></input>
                    <label class="col-sm-8">Stomach & Intestine Problems</label></div>
                ) : null}
                {this.state.showSIPD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="Stomach_IntestineProblems"
                      placeholder="Enter Stomach & Intestine Problem details"
                    />
                  </div>

                ) : null}
              </div>
              <div class="col-sm-3">         {this.state.showBP ? (
                <div>
                  <input onClick={() => this.operationDetailUP()} type="checkbox" ></input>
                  <label class="col-sm-8" >Urinary Problems </label></div>
              ) : null}
                {this.state.showUPD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="UrinaryProblems"
                      placeholder="Enter Urinary Problem Details"
                    />
                  </div>

                ) : null}
              </div>
              <div class="col-sm-3">
                {this.state.showBP ? (
                  <div>
                    <input onClick={() => this.operationDetailKDD()} type="checkbox" ></input>
                    <label class="col-sm-8">Kidney Disease/Dialysis</label></div>
                ) : null}
                {this.state.showKDDD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="KidneyDisease_Dialysis"
                      placeholder="Enter Details of Kidney Disease/Dialysis"
                    />
                  </div>

                ) : null}
              </div>
              <div class="col-sm-3">
                {this.state.showBP ? (
                  <div>
                    <input onClick={() => this.operationDetailTD()} type="checkbox" ></input>
                    <label class="col-sm-8" >Thyroid Disease</label></div>
                ) : null}
                {this.state.showTDD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="Thyroid Disease"
                      placeholder="Enter details of Thyroid Disease"
                    />
                  </div>

                ) : null}
              </div>
            </div> <div class="row">
              <div class="col-sm-3">
                {this.state.showBP ? (
                  <div>
                    <input onClick={() => this.operationDetailD()} type="checkbox" ></input>
                    <label class="col-sm-8" >Diabetes</label></div>
                ) : null}
                {this.state.showDD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="Diabetes"
                      placeholder="Enter Diabetes details"
                    />
                  </div>

                ) : null}
              </div>
              <div class="col-sm-3">         {this.state.showBP ? (
                <div>
                  <input onClick={() => this.operationDetailMP()} type="checkbox" ></input>
                  <label class="col-sm-8" >Muscular Problems </label></div>
              ) : null}
                {this.state.showMPD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="MuscularProblems"
                      placeholder="Enter Muscular Problem Details"
                    />
                  </div>

                ) : null}
              </div>
              <div class="col-sm-3">
                {this.state.showBP ? (
                  <div>
                    <input onClick={() => this.operationDetailBPD()} type="checkbox"></input>
                    <label class="col-sm-8">Bone Pain/Disease</label></div>
                ) : null}
                {this.state.showBonePDD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="BonePain_Disease"
                      placeholder="Enter Details of Bone Pain/Disease"
                    />
                  </div>

                ) : null}
              </div>
              <div class="col-sm-3">
                {this.state.showBP ? (
                  <div>
                    <input onClick={() => this.operationDetailJSS()} type="checkbox"></input>
                    <label class="col-sm-8" >Joint Stiffness/Swelling</label></div>
                ) : null}
                {this.state.showJSSD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="JointStiffness_Swelling"
                      placeholder="Enter details of Joint Stiffness/Swelling"
                    />
                  </div>

                ) : null}
              </div>
            </div> <div class="row">
              <div class="col-sm-3">
                {this.state.showBP ? (
                  <div>
                    <input onClick={() => this.operationDetailBNP()} type="checkbox"></input>
                    <label class="col-sm-8">Back/Neck Problems</label></div>
                ) : null}
                {this.state.showBNPD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="Back_NeckProblems"
                      placeholder="Enter Back/Neck Problems details"
                    />
                  </div>

                ) : null}
              </div>
              <div class="col-sm-3">         {this.state.showBP ? (
                <div>
                  <input onClick={() => this.operationDetailSkinD()} type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
                  <label class="col-sm-8" >Skin Disease </label></div>
              ) : null}
                {this.state.showSkinDD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="Patient_NationalID"
                      placeholder="Enter Skin Disease Details"
                    />
                  </div>

                ) : null}
              </div>
              <div class="col-sm-3">
                {this.state.showBP ? (
                  <div>
                    <input onClick={() => this.operationDetailSR()} type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
                    <label class="col-sm-8" >Skin Rash</label></div>
                ) : null}
                {this.state.showSRD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="Patient_NationalID"
                      placeholder="Enter Details of Skin Rash"
                    />
                  </div>

                ) : null}
              </div>
              <div class="col-sm-3">
                {this.state.showBP ? (
                  <div>
                    <input onClick={() => this.operationDetailAn()} type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
                    <label class="col-sm-8">Anemia</label></div>
                ) : null}
                {this.state.showAnD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="Anemia"
                      placeholder="Enter Details of Anemia"
                    />
                  </div>

                ) : null}
              </div>
            </div> <div class="row">
              <div class="col-sm-3">
                {this.state.showBP ? (
                  <div>
                    <input onClick={() => this.operationDetailBCLL()} type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
                    <label class="col-sm-8">Blood Clots Legs/Lungs</label></div>
                ) : null}
                {this.state.showBCLLD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="Patient_NationalID"
                      placeholder="Enter Blood Clots details"
                    />
                  </div>

                ) : null}
              </div>
              <div class="col-sm-3">         {this.state.showBP ? (
                <div>
                  <input onClick={() => this.operationDetailBeeP()} type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
                  <label class="col-sm-8">Bleeding Problems </label></div>
              ) : null}
                {this.state.showBeePD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="Patient_NationalID"
                      placeholder="Enter Bleeding Problem Details"
                    />
                  </div>

                ) : null}
              </div>
              <div class="col-sm-3">
                {this.state.showBP ? (
                  <div>
                    <input onClick={() => this.operationDetailT()} type="checkbox" ></input>
                    <label class="col-sm-8" >Tumor</label></div>
                ) : null}
                {this.state.showTumorD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="Patient_NationalID"
                      placeholder="Enter Details of Tumor"
                    />
                  </div>

                ) : null}
              </div>
              <div class="col-sm-3">
                {this.state.showBP ? (
                  <div>
                    <input onClick={() => this.operationDetailC()} type="checkbox"></input>
                    <label class="col-sm-8" >Cancer</label></div>
                ) : null}
                {this.state.showCD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="Patient_NationalID"
                      placeholder="Enter details of Cancer"
                    />
                  </div>

                ) : null}
              </div>
            </div>
            <div class="row">
              <div class="col-sm-3">
                {this.state.showBP ? (
                  <div>
                    <input onClick={() => this.operationDetailR()} type="checkbox" ></input>
                    <label class="col-sm-8" for="vehicle1">Radiation</label></div>
                ) : null}
                {this.state.showRD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="Patient_NationalID"
                      placeholder="Enter Radiation details"
                    />
                  </div>

                ) : null}
              </div>
              <div class="col-sm-3">         {this.state.showBP ? (
                <div>
                  <input onClick={() => this.operationDetailCT()} type="checkbox"></input>
                  <label class="col-sm-8" for="vehicle1">Chemotherapy</label></div>
              ) : null}
                {this.state.showCTD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="Patient_NationalID"
                      placeholder="Enter Chemotherapy Details"
                    />
                  </div>

                ) : null}
              </div>
              <div class="col-sm-3">
                {this.state.showBP ? (
                  <div>
                    <input onClick={() => this.operationDetailM()} type="checkbox" ></input>
                    <label class="col-sm-8" for="vehicle1">Miscellaneous</label></div>
                ) : null}
                {this.state.showMD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="Patient_NationalID"
                      placeholder="Enter Details Miscellaneous"
                    />
                  </div>

                ) : null}
              </div>
              <div class="col-sm-3">
                {this.state.showBP ? (
                  <div>
                    <input onClick={() => this.operationDetailPD()} type="checkbox"></input>
                    <label class="col-sm-8" for="vehicle1">Physicatric Disease</label></div>
                ) : null}
                {this.state.showPDD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="Patient_NationalID"
                      placeholder="Enter Details of Physicatric Disease"
                    />
                  </div>

                ) : null}
              </div>
            </div>
            <div class="row">
              <div class="col-sm-3">
                {this.state.showBP ? (
                  <div>
                    <input onClick={() => this.operationDetailA()} type="checkbox" ></input>
                    <label class="col-sm-8" for="vehicle1">Addictions</label></div>
                ) : null}
                {this.state.showAD ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      id="Patient_NationalID"
                      placeholder="Enter Addictions details"
                    />
                  </div>

                ) : null}
              </div>
              <div class="col-sm-3">
              </div>
              <div class="col-sm-3">

              </div>
              <div class="col-sm-3">

              </div>
            </div>
            <div class="form-group">
              <div>
                <div >
                  {this.state.showMale ? (
                    <div></div>) : null}
                  {this.state.showFemale ? (
                    <div style={{ background: "#FFC0CB" }}>
                      <div className="form-group">
                        <label htmlFor="CurrentMedications">
                          Age at mensturation
            </label>
                        <input
                          type="text"
                          onChange={this.handleChange}
                          className="form-control"
                          id="CurrentMedications"
                          placeholder="Enter  Age at mensturation"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="CurrentMedications">Abnormal Periods</label>
                        <input
                          type="text"
                          onChange={this.handleChange}
                          className="form-control"
                          id="CurrentMedications"
                          placeholder="Enter Abnormal Periods"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="CurrentMedications">
                          Number of Pregnancies
            </label>
                        <input
                          type="text"
                          onChange={this.handleChange}
                          className="form-control"
                          id="CurrentMedications"
                          placeholder="Enter Number of Pregnancies"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="CurrentMedications">Abortion or Miscariage</label>
                        <input
                          type="text"
                          onChange={this.handleChange}
                          className="form-control"
                          id="CurrentMedications"
                          placeholder="Enter any Abortion or Miscariage"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="CurrentMedications">Number of live births</label>
                        <input
                          type="text"
                          onChange={this.handleChange}
                          className="form-control"
                          id="CurrentMedications"
                          placeholder="Enter Number of live births"
                        />
                      </div>  <div className="form-group">
                        <label htmlFor="CurrentMedications">Any child died</label>
                        <input
                          type="text"
                          onChange={this.handleChange}
                          className="form-control"
                          id="CurrentMedications"
                          placeholder="Enter any any child died"
                        />
                      </div>  <div className="form-group">
                        <label htmlFor="CurrentMedications">Last menstural period</label>
                        <input
                          type="text"
                          onChange={this.handleChange}
                          className="form-control"
                          id="CurrentMedications"
                          placeholder="Enter Last menstural period"
                        />
                      </div>  <div className="form-group">
                        <label htmlFor="CurrentMedications">Abortion or Miscariage</label>
                        <input
                          type="text"
                          onChange={this.handleChange}
                          className="form-control"
                          id="CurrentMedications"
                          placeholder="Enter any Abortion or Miscariage"
                        />
                      </div>  <div className="form-group">
                        <label htmlFor="CurrentMedications">Pregnant</label>
                        <input
                          type="text"
                          onChange={this.handleChange}
                          className="form-control"
                          id="Pregnant"
                          placeholder="are you pregnant?"
                        />
                      </div>  <div className="form-group">
                        <label htmlFor="CurrentMedications">Last Pap Smear</label>
                        <input
                          type="text"
                          onChange={this.handleChange}
                          className="form-control"
                          id="LastPapSmear"
                          placeholder="Enter Last Pap Smear"
                        />
                      </div>  <div className="form-group">
                        <label htmlFor="CurrentMedications">Breast Lump</label>
                        <input
                          type="text"
                          onChange={this.handleChange}
                          className="form-control"
                          id="breastLump"
                          placeholder="Have any Breast Lump?"
                        />
                      </div>  <div className="form-group">
                        <label htmlFor="CurrentMedications">Mamogram</label>
                        <input
                          type="text"
                          onChange={this.handleChange}
                          className="form-control"
                          id="Mamogram"
                          placeholder="Last Mamogram"
                        />
                      </div>  <div className="form-group">
                        <label htmlFor="CurrentMedications">Hot Flashes</label>
                        <input
                          type="text"
                          onChange={this.handleChange}
                          className="form-control"
                          id="HotFlashes"
                          placeholder="Any Hot Flashes"
                        />
                      </div>  <div className="form-group">
                        <label htmlFor="CurrentMedications">Breast Feeding</label>
                        <input
                          type="text"
                          onChange={this.handleChange}
                          className="form-control"
                          id="BreastFeeding"
                          placeholder="Are you Brreast Feeding?"
                        />
                      </div>  <div className="form-group">
                        <label htmlFor="CurrentMedications">Discharge/Uterine Bleed</label>
                        <input
                          type="text"
                          onChange={this.handleChange}
                          className="form-control"
                          id="CurrentMedications"
                          placeholder="ever had?"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="CurrentMedications">Contraception</label>
                        <input
                          type="text"
                          onChange={this.handleChange}
                          className="form-control"
                          id="CurrentMedications"
                          placeholder="Ever had contraceptives?"
                        />
                      </div>  <div className="form-group">
                        <label htmlFor="CurrentMedications">Cessarian Section</label>
                        <input
                          type="text"
                          onChange={this.handleChange}
                          className="form-control"
                          id="CurrentMedications"
                          placeholder="Ever had cessarian section?"
                        />
                      </div>
                    </div>
                  ) : null}


                </div>
                <div>
                  <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
                  <label class="col-sm-8" for="vehicle1">To the best of my Knowledge above information is correct</label></div>

                <div>

                </div>
                <div>
                  <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
                  <label class="col-sm-8" for="vehicle1">I give permission to Cloud Clinic staff to treat/examine me</label></div>

                <div>

                </div>
              </div>
              <button
                onClick={this.onCreateHistory}
                className="btn btn-primary pull-right"
              >
                Save
            </button>

            </div>
          </div>



        </div>
      </form>
    );
  }
}
export default EditHistory;
// ReactDOM.render(
//   <AddPatient />,
//   document.getElementById('root')
// );
