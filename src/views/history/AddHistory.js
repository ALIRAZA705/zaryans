import React, { useEffect, useState, createRef } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

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
class AddHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Patient: ' ',
      patientData: null,
      showPS: true,
      showPSD: false,
      showBP: true,
      showBPD: false,
      showCI: true,
      showCID: false,
      showBT: true,
      showBTD: false,
      showAMA: true,
      showAMAD: false,
      showPI: true,
      showPID: false,
      showefm: true,
      showEFMD: false,
      showAFMWD: true,
      showAMFMWDD: false,
      showSmoking: true,
      showSmokingD: false,
      showSTR: true,
      showSTRD: false,
      showD: true,
      showDD: false,
      showR: true,
      showRD: false,
      showDIS: true,
      showDISD: false,
      showFS: true,
      showFSD: false,
      showHI: true,
      showHID: false,
      showM: true,
      showMD: false,
      showEP: true,
      showEPD: false,
      showSD: true,
      showSDD: false,
      showNP: true,
      showNPD: false,
      showTP: true,
      showTPD: false,
      showDP: true,
      showDPD: false,
      showHP: true,
      showHPD: false,
      showLP: true,
      showLPD: false,
      showOHO: true,
      showOHOD: false,
      showSP: true,
      showSPD: false,
      showLivP: true,
      showLivPD: false,
      showUP: true,
      showUPD: false,
      showKD: true,
      showKDD: false,
      showTD: true,
      showTDD: false,
      showD: true,
      showDD: false,
      showMP: true,
      showMPD: false,
      showBoneP: true,
      showBonePD: false,
      showJS: true,
      showJSD: false,
      //API DATA
      historyID: '',
      patient: '',
      adDnADHD: '',
      chronicFatigueSyndrome: '',
      gout: '',
      hospitalization: '',
      surgries: '',
      chiefComplaints: '',
      femaleComplaints: "{\"AgeMensturation\" : \"\true\"}",
      generalComplaints: "{\"ShortnessOfBreath\":\"high\"}",
      painScale: '',
      currentMedications: '',
      allergies: '',
      immunization: '',
      birthproblems: '',
      childhoodillness: '',
      anymoreaccident: '',
      bloodtransfusion: '',
      psychatricillness: '',
      expiredfamilymembers: '',
      anyfamilymemberswithdisease: '',
      smoking: '',
      drinking: '',
      recreational: '',
      ageatmenstruation: '',
      ageofmenopaise: null,
      abnormalperiods: null,
      numberofpregnancies: null,
      abortion: null,
      numberoflivebriths: null,
      anychilddied: null,
      lastmenstrualperiod: null,
      pregnant: null,
      lastpapsmear: null,
      breastlump: null,
      lastmemogram: null,
      hotflashes: null,
      breastfeeding: null,
      uterusbleed: null,
      contraception: null,
      cessarionsection: null,
      disability: null,
      stroke: null,
      headinjury: null,
      migrine: null,
      eyeproblems: null,
      sleepdisturbances: null,
      earproblems: null,
      noseproblems: null,
      throatproblems: null,
      dentalproblems: null,
      heartproblems: null,
      lungproblems: null,
      onhomeoxygen: null,
      swallowingproblems: null,
      liverproblems: null,
      urinaryproblems: null,
      kidneydisease: null,
      thyroiddisease: null,
      diabetes: null,
      muscularproblems: null,
      bonepain: null,
      jointstiffness: null,
      backproblems: null,
      skindisease: null,
      skinrashes: null,
      anemia: null,
      bloodclots: null,
      bleedingproblems: null,
      tumor: null,
      cancer: null,
      radiation: null,
      chemotherapy: null,
      addictious: null,



    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {

    this.setState({ [event.target.id]: event.target.value });
  }

  onCreateHistory = () => {
    console.log(this.state.fever);
    console.log(this.state.weakness);
    console.log(this.state);
    fetch('https://cloudclinicapi.azurewebsites.net/api/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    }).then(response => response.json())
      .then(status => console.log(status))
      .catch(() => console.log("Can’t access response. Blocked by browser?"));
  }
  valuetext(value) {
    return `${value}°C`;
  }

  operationPS() {
    this.setState({
      showPS: true,
      showPSD: !this.state.showPSD,
    });
  }
  operationDetailBP() {
    this.setState({
      showBP: true,
      showBPD: !this.state.showBPD,
    });
  }

  operationDetailAMA() {
    this.setState({
      showAMA: true,
      showAMAD: !this.state.showAMAD,
    });
  }

  operationDetailBT() {
    this.setState({
      showBT: true,
      showBTD: !this.state.showBTD,
    });
  }
  operationDetailCI() {
    this.setState({
      showCI: true,
      showCID: !this.state.showCID,
    });
  }
  operationDetailPI() {
    this.setState({
      showPI: true,
      showPID: !this.state.showPID,
    });
  }
  operationDetailEFM() {
    this.setState({
      showefm: true,
      showEFMD: !this.state.showEFMD,
    });
  }
  operationDetailAFMWD() {
    this.setState({
      showAFMWD: true,
      showAFMWDD: !this.state.showAFMWDD,
    });
  }
  operationDetailD() {
    this.setState({
      showD: true,
      showDD: !this.state.showDD,
    });
  }
  operationDetailR() {
    this.setState({
      showR: true,
      showRD: !this.state.showRD,
    });
  }
  operationDetailS() {
    this.setState({
      showS: true,
      showSD: !this.state.showSD,
    });
  }
  operationDetailS() {
    this.setState({
      showSmoking: true,
      showSmokingD: !this.state.showSmokingD,
    });
  }
  operationDetailSTR() {
    this.setState({
      showSTR: true,
      showSTRD: !this.state.showSTRD,
    });
  }
  operationDetailDIS() {
    this.setState({
      showDIS: true,
      showDISD: !this.state.showDISD,
    });
  }

  operationDetailFS() {
    this.setState({
      showFS: !this.state.showFS,
      showFSD: !this.state.showFSD,
    });
  }

  operationDetailHI() {
    this.setState({
      showHI: !this.state.showHI,
      showHID: !this.state.showHID,
    });
  }

  operationDetailM() {
    this.setState({
      showM: !this.state.showM,
      showMD: !this.state.showMD,
    });
  }



  // setPatient = e => {
  //   this.setState({ patient: e.target.value });
  // };
  componentWillMount = () => {
    fetch("https://cloudclinicapi.azurewebsites.net/api/patient")
      .then((result) => result.json())
      .then((data) => {
        this.setState({ patientData: data })
        console.log(data);
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
      <form>
        <button onClick={() => this.operationDetailFS()} className="btn btn-outline-info pull-right"> ♀</button>
        
        <div className="form-group row">
          <label class="control-label col-sm-2" htmlFor="historyID">History ID</label>
          <div class="col-sm-6">
          <input type="text" onChange={this.handleChange} className="form-control" id="historyID" placeholder="Enter history identification code" />
        </div></div>

        <div className="form-group row">
          <label class="control-label col-sm-2" htmlFor="Patient">Patient</label>
          <div class="col-sm-6">
          <select onChange={(val) => this.setPatient(val.target.value)} className="form-control">
            <option value={null}>select a patient</option>
            {this.state.patientData && this.state.patientData.length > 0 &&
              this.state.patientData.map(item => {
                return (
                  <option value={item.nationalID}>
                    {item.name}
                  </option>
                )
              })}
          </select>
          {/* <input type="text" onChange={this.handleChange} className="form-control" id="nationalID" placeholder="Enter Id" /> */}
        </div></div>
        <div className="form-group row">
          <label class="control-label col-sm-2" htmlFor="allergies">Allergies</label>
          <div class="col-sm-6">
          <input type="text" onChange={this.handleChange} className="form-control" id="allergies" placeholder="Enter allergies details" />
        </div></div>
        <div className="form-group row">
          <label class="control-label col-sm-2" htmlFor="immunization">Immunization</label>
          <div class="col-sm-6">
          <input type="text" onChange={this.handleChange} className="form-control" id="immunization" placeholder="Enter immunization details" />
          </div>
        </div>
        <div className="form-group row">
          <label class="control-label col-sm-2" htmlFor="currentMedications">Current Medications</label>
          <div class="col-sm-6">
          <input type="text" onChange={this.handleChange} className="form-control" id="currentMedications" placeholder="Enter current medications details" />
        </div></div>
        <div className="form-group row">
          <label  class="control-label col-sm-2" htmlFor="hospitalization">Hospitalization</label>
          <div class="col-sm-6">
          <input type="text" onChange={this.handleChange} className="form-control" id="hospitalization" placeholder="Enter hospitalization details" />
        </div></div>


        <h4>Chief Complaints</h4>
        <hr></hr>
        <div className="form-group" class="row">
          <div class="col-sm-3">
            <div>
              <input id="fever" onChange={this.handleChange} type="checkbox"></input>
              <label class="col-sm-8" htmlFor="fever">Fever</label></div>
            <div>
            </div>
          </div>
          <div class="col-sm-3">
            <div>
              <input id="weakness" onChange={this.handleChange} type="checkbox"></input>
              <label class="col-sm-8" htmlFor="weakness">Weakness</label></div>
            <div>
            </div>
          </div>
          <div class="col-sm-3">
            <div>
              <input id="shortnessOfBreath" onChange={this.handleChange} type="checkbox"></input>
              <label class="col-sm-8" htmlFor="shortnessOfBreath">Shortness Of Breath</label></div>
            <div>
            </div>
          </div> <div class="col-sm-3">
            <div>
              <input id="weightLoss" onChange={this.handleChange} type="checkbox"></input>
              <label class="col-sm-8" htmlFor="weightLoss">Weight Loss</label></div>
            <div>
            </div>
          </div> <div class="col-sm-3">
            <div>
              <input id="swollenGlands" onChange={this.handleChange} type="checkbox"></input>
              <label class="col-sm-8" htmlFor="swollenGlands">Swollen Glands</label></div>
            <div>
            </div>
          </div>
          <div class="col-sm-3">
            {this.state.showPS ? (
              <div>

                <input onClick={() => this.operationPS()} type="checkbox" ></input>
                <label class="col-sm-8" >Pain</label></div>
            ) : null}
            {this.state.showPSD ? (

              <div class="row">
                <label htmlFor="painScale" style={{ padding: "10px" }}>Pain Level</label>
                <div class='col-sm-12'>

                  <PrettoSlider onChange={this.handleChange} id="painScale" defaultValue={3} step={1}
                    marks
                    min={1}
                    max={10} valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={5} />

                  {/* <input type="range" id="painScale" name="painScale" min="0" max="10" /> */}
                </div>

              </div>) : null}
          </div>

        </div>
        <h4>General Complaints</h4>
        <hr></hr>

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
                    id="birthproblems"
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
                    id="childhoodillness"
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
                    id="anymoreaccident"
                    placeholder="Enter Details of major accident"
                  />
                </div>

              ) : null}
            </div>
            <div class="col-sm-3">
              {this.state.showBT ? (
                <div>
                  <input onClick={() => this.operationDetailBT()} type="checkbox"></input>
                  <label class="col-sm-8" >Blood Transfusion</label></div>
              ) : null}
              {this.state.showBTD ? (
                <div>
                  <input
                    type="text"
                    onChange={this.handleChange}
                    className="form-control"
                    id="bloodtransfusion"
                    placeholder="Enter details of blood transfusion"
                  />
                </div>

              ) : null}
            </div>
          </div>
          <div class="row">
            <div class="col-sm-3">
              {this.state.showPI ? (
                <div>
                  <input onClick={() => this.operationDetailPI()} type="checkbox" ></input>
                  <label class="col-sm-8">Psychatric Illness</label></div>
              ) : null}
              {this.state.showPID ? (
                <div>
                  <input
                    type="text"
                    onChange={this.handleChange}
                    className="form-control"
                    id="psychatricillness"
                    placeholder="Enter Psychatric Illness"
                  />
                </div>

              ) : null}
            </div>
            <div class="col-sm-3">         {this.state.showefm ? (
              <div>
                <input onClick={() => this.operationDetailEFM()} type="checkbox" ></input>
                <label class="col-sm-8" >Expired Family Members </label></div>
            ) : null}
              {this.state.showEFMD ? (
                <div>
                  <input
                    type="text"
                    onChange={this.handleChange}
                    className="form-control"
                    id="expiredfamilymembers"
                    placeholder="Enter Expired Family Members Details"
                  />
                </div>

              ) : null}
            </div>
            <div class="col-sm-3">
              {this.state.showAFMWD ? (
                <div>
                  <input onClick={() => this.operationDetailAFMWD()} type="checkbox" ></input>
                  <label class="col-sm-8" >Any Family member with disease</label></div>
              ) : null}
              {this.state.showAMFMWDD ? (
                <div>
                  <input
                    type="text"
                    onChange={this.handleChange}
                    className="form-control"
                    id="anymfamilymemberwithdisease"
                    placeholder="Enter Details eof any member with disease"
                  />
                </div>

              ) : null}
            </div>
            <div class="col-sm-3">
              {this.state.showSmoking ? (
                <div>
                  <input onClick={() => this.operationDetailS()} type="checkbox"></input>
                  <label class="col-sm-8" >Smoking</label></div>
              ) : null}
              {this.state.showSmokingD ? (
                <div>
                  <input
                    type="text"
                    onChange={this.handleChange}
                    className="form-control"
                    id="smoking"
                    placeholder="Enter details of smoking"
                  />
                </div>

              ) : null}
            </div>
          </div>
          <div class="row">
            <div class="col-sm-3">
              {this.state.showD ? (
                <div>
                  <input onClick={() => this.operationDetailD()} type="checkbox" ></input>
                  <label class="col-sm-8">Drinking</label></div>
              ) : null}
              {this.state.showDD ? (
                <div>
                  <input
                    type="text"
                    onChange={this.handleChange}
                    className="form-control"
                    id="drinking"
                    placeholder="Enter Drinking details"
                  />
                </div>

              ) : null}
            </div>
            <div class="col-sm-3">         {this.state.showR ? (
              <div>
                <input onClick={() => this.operationDetailR()} type="checkbox" ></input>
                <label class="col-sm-8" >Recreational </label></div>
            ) : null}
              {this.state.showRD ? (
                <div>
                  <input
                    type="text"
                    onChange={this.handleChange}
                    className="form-control"
                    id="recreational"
                    placeholder="Enter Recreational Details"
                  />
                </div>

              ) : null}
            </div>
            <div class="col-sm-3">
              {this.state.showDIS ? (
                <div>
                  <input onClick={() => this.operationDetailDIS()} type="checkbox" ></input>
                  <label class="col-sm-8" >Any Disability</label></div>
              ) : null}
              {this.state.showDISD ? (
                <div>
                  <input
                    type="text"
                    onChange={this.handleChange}
                    className="form-control"
                    id="disability"
                    placeholder="Enter Details Disability"
                  />
                </div>

              ) : null}
            </div>
            <div class="col-sm-3">
              {this.state.showSTR ? (
                <div>
                  <input onClick={() => this.operationDetailSTR()} type="checkbox"></input>
                  <label class="col-sm-8" >Stroke</label></div>
              ) : null}
              {this.state.showSTRD ? (
                <div>
                  <input
                    type="text"
                    onChange={this.handleChange}
                    className="form-control"
                    id="stroke"
                    placeholder="Enter details of stroke"
                  />
                </div>

              ) : null}
            </div>
          </div>
        </div>
        {this.state.showFS ? (
          <div></div>
        ) : null}
        {this.state.showFSD ? (
          <div>

            <label>Female Complaints--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</label>
            <div className="form-group" class="row">
              <div class="col-sm-3">
                <div>
                  <input id="agetamensturation" onChange={this.handleChange} type="checkbox"></input>
                  <label class="col-sm-8" htmlFor="agetamensturation">Breast Feeding</label></div>
                <div>
                </div>
              </div>
              <div class="col-sm-3">
                <div>
                  <input id="ageofmenopaise" onChange={this.handleChange} type="checkbox"></input>
                  <label class="col-sm-8" htmlFor="ageofmenopaise">Uterus Bleed</label></div>
                <div>
                </div>
              </div>
              <div class="col-sm-3">
                <div>
                  <input id="abortion" onChange={this.handleChange} type="checkbox"></input>
                  <label class="col-sm-8" htmlFor="abortion">Abortion</label></div>
                <div>
                </div>
              </div> <div class="col-sm-3">
                <div>
                  <input id="pregnant" onChange={this.handleChange} type="checkbox"></input>
                  <label class="col-sm-8" htmlFor="pregnant">Pregnant</label></div>
              </div>
            </div>
            <div className="form-group" class="row">
              <div class="col-sm-3">
                <div>
                  <input id="numberoflivebirths" onChange={this.handleChange} type="checkbox"></input>
                  <label class="col-sm-8" htmlFor="numberoflivebirths">Live Births</label></div>
                <div>
                </div>
              </div>
              <div class="col-sm-3">
                <div>
                  <input id="cessarionsection" onChange={this.handleChange} type="checkbox"></input>
                  <label class="col-sm-8" htmlFor="cessarionsection">Cessarion section</label></div>
                <div>
                </div>
              </div>
              <div class="col-sm-3">
                <div>
                  <input id="contraception" onChange={this.handleChange} type="checkbox"></input>
                  <label class="col-sm-8" htmlFor="contraception">Contraception</label></div>
                <div>
                </div>
              </div> <div class="col-sm-3">
                <div>
                  <input id="anychilddied" onChange={this.handleChange} type="checkbox"></input>
                  <label class="col-sm-8" htmlFor="anychilddied">Any Child Died</label></div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="form-group">
          <button onClick={this.onCreateHistory} className="btn btn-primary pull-right">Save</button>
        </div>


      </form>
    );
  }
}
export default AddHistory;
