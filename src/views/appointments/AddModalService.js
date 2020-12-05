import React, { useState, useEffect, Component } from "react";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import SchedulerService from "./SchedulerService.js";
import CheckBox from "./Checkbox";
import { Calendar } from "react-big-calendar";

const AddEventModal = ({
  show,
  handleClose,
  calendars,
  patientData,
  physicianData,
}) => {
  const [Title, setTitle] = React.useState("");
  const [SummaryNotes, setSummaryNotes] = React.useState("");
  const [Consultant, setConsultant] = React.useState(null);
  const [Patient, setPatient] = React.useState(null);
  const [StartDateTime, setStartDate] = React.useState(new Date(""));
  const [EndDateTime, setEndDate] = React.useState(new Date(""));
  const [meetinglink, setmeetinglink] = React.useState(new Date(""));
  const [Cdata, setCdata] = useState([]);
  const [calendar, setcalendar] = React.useState(null);

  //  console.log(JSON.stringify(patientData)+'<------------------------patientData')
  //  console.log(JSON.stringify(physicianData)+'<------------------------physicianData')
  function handleTitleChange(event) {
    setTitle(event.target.value);
  }
  function handleSummaryNotesChange(event) {
    setSummaryNotes(event.target.value);
  }
  // function handleConsultantChange(event) {
  //   setConsultant(event.target.value);
  // }
  // function handlePatientChange(event) {
  //   setPatient(event.target.value);
  // }
  function handleStartDateChange(event) {
    setStartDate(event.target.value);
    setmeetinglink(event.target.value);
  }
  function handleEndDateChange(event) {
    setEndDate(event.target.value);
  }

  async function createVisit(event) {
    fetch("https://cloudclinicapi.azurewebsites.net/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    })
      .then((response) => response.json())
      .then((status) => console.log(status))
      .catch(() => console.log("Can’t access response. Blocked by browser?"));
  }
  //Calendar List

  const handleSubmit = () => {
    console.log("check");
    // console.log(ISOString(StartDateTime));
    var date1 = new Date(StartDateTime);
    var date2 = new Date(EndDateTime);
    var linkdata = new Date(meetinglink).getTime();
    let event = {
      Title: Title,
      Patient_NationalID: Patient,
      Consultant_NationalID: Consultant,
      SummaryNotes: SummaryNotes,
      StartDateTime: StartDateTime, //StartDateTime.concat("T09:00:00-05:00"),
      EndDateTime: EndDateTime, //EndDateTime.concat("T10:00:00-05:00")
      meetinglink: linkdata,
    };
    console.log(date1.toLocaleString() + "<===patient===>" + Consultant);
    console.log(linkdata.toLocaleString() + "<===Link Data==>" + meetinglink);
    let googleEvent = {
      title: Title,
      calendarId: calendar,
      summary: SummaryNotes,
      end: {
        dateTime: moment.utc(EndDateTime).format(), //'2014-07-28T23:00:00',//end,
        timeZone: "GMT",
      },
      start: {
        dateTime: moment.utc(StartDateTime).format(), //'2014-07-28T18:00:00',//start,
        timeZone: "GMT",
      },
    };
    let ss = new SchedulerService();

    let returnval = ss.AddThisEvent(googleEvent).then(
      function (response) {
        console.log(
          JSON.stringify(response) + "<---------------ADD EVENT response"
        );
        debugger;
        event.Id = response.result.id;
        createVisit(event);
      },

      function (err) {
        console.error("Execute error", err);
      }
    );
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="Title">Title</label>
            <input
              type="text"
              id="title"
              value={Title}
              onChange={handleTitleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Patient">Patient</label>
            <select
              onChange={(val) => setPatient(val.target.value)}
              className="form-control"
            >
              <option value={null}>select a patient</option>
              {patientData &&
                patientData.length > 0 &&
                patientData.map((item) => {
                  // console.log(JSON.stringify(item)+'<--------option')
                  return <option value={item.nationalID}>{item.name}</option>;
                })}
            </select>
            {/* <input
              type="dropdown"
              id="Patient"
              value={Patient}
              onChange={handlePatientChange}
              className="form-control"
            /> */}
          </div>
          <div className="form-group">
            <label htmlFor="Patient">calendars</label>
            <select
              onChange={(val) => setcalendar(val.target.value)}
              className="form-control"
              value={calendar}
            >
              <option value={null}>select a Calendar</option>
              {calendars &&
                calendars.length > 0 &&
                calendars.map((items) => {
                  return <option value={items.value}>{items.name}</option>;
                })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="Consultant">Consultant</label>
            <select
              onChange={(val) => setConsultant(val.target.value)}
              className="form-control"
            >
              <option value={null}>select a consultant</option>
              {physicianData &&
                physicianData.length > 0 &&
                physicianData.map((item) => {
                  // console.log(JSON.stringify(item)+'<--------option')
                  return <option value={item.nationalID}>{item.name}</option>;
                })}
            </select>
            {/* <input
              type="text"
              id="Consultant"
              value={Consultant}
              onChange={handleConsultantChange}
              className="form-control"
            /> */}
          </div>
          <div className="form-group">
            <label htmlFor="SummaryNotes">Summary Notes</label>
            <input
              type="text"
              id="summaryNotes"
              value={SummaryNotes}
              onChange={handleSummaryNotesChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="StartDateTime">Start Date</label>
            <input
              type="datetime-local"
              id="startDateTime"
              value={StartDateTime}
              onChange={handleStartDateChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="EndDateTime">End Date</label>
            <input
              type="datetime-local"
              id="endDateTime"
              value={EndDateTime}
              onChange={handleEndDateChange}
              className="form-control"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AddEventModal;
