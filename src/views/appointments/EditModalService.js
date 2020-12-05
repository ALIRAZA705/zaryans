import React, { useState, useEffect } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import SchedulerService from "./SchedulerService.js";

const EditEventModal = ({ show, handleClose, thisSummaryNotes, thisStartDateTime, thisEndDateTime, thisEventId, thisTitle }) => {
  const [EventId, setEventId] = React.useState(EventId);
  useEffect(() => { setEventId(thisEventId) }, [thisEventId])

  const [Patient, setPatient] = React.useState("");
  //useEffect(() => { setPatient(thisTitle) }, [thisTitle])
  const [Consultant, setConsultant] = React.useState("");
  //useEffect(() => { setTitle(thisTitle) }, [thisTitle])

  const [Title, setTitle] = React.useState(thisTitle);
  useEffect(() => { setTitle(thisTitle) }, [thisTitle])

  const [Summarynotes, setSummarynotes] = React.useState(thisSummaryNotes);
  useEffect(() => { setSummarynotes(thisSummaryNotes) }, [thisSummaryNotes])

  //const [eventSpecialist, setEventSpecialist] = React.useState("");
  const [StartDateTime, setStartDate] = React.useState(thisStartDateTime);
  useEffect(() => { setStartDate(thisStartDateTime) }, [thisStartDateTime])

  const [EndDateTime, setEndDate] = React.useState(thisEndDateTime);
  useEffect(() => { setEndDate(thisEndDateTime) }, [thisEndDateTime])



  function handleTitleChange(event) {
    setTitle(event.target.value);
  }
  function handleConsultantChange(event) {
    setConsultant(event.target.value);
  }
  function handlePatientChange(event) {
    setPatient(event.target.value);
  }
  function handleSummaryNotesChange(event) {
    setSummarynotes(event.target.value);
  }
  function handleStartDateChange(event) {
    setStartDate(event.target.value);
  }
  function handleEndDateChange(event) {
    setEndDate(event.target.value);
  }

  const handleDelete = () => {

    let googleEvent = {
      "summary": Title,
      "description": Summarynotes,
      "start": { "dateTime": new Date(StartDateTime) },
      "end": { "dateTime": new Date(EndDateTime) },
      "Id": EventId
      //"Consultant": { "NationalID": Consultant },
      //"Patient": { "NationalID": Patient }
    }
    let event = {
      "Id": EventId,
      "Title": Title,
      "SummaryNotes": Summarynotes,
      "StartDateTime": new Date(StartDateTime),//StartDateTime.concat("T09:00:00-05:00"),
      "EndDateTime": new Date(EndDateTime),//EndDateTime.concat("T10:00:00-05:00")
      "Consultant": Consultant,
      "Patient": Patient,
      "IsDeleted": true
      //"start": {
      //  "dateTime": StartDate.concat("T09:00:00-05:00")
      //},
      //"end": {
      //  "dateTime": EndDate.concat("T10:00:00-05:00")
      //}
    }
    let ss = new SchedulerService();
    let returnval = ss.DeleteThisEvent(googleEvent).
      then(
        function (response) {
          debugger;
          event.Id = googleEvent.Id;
          updateVisit(event);
        },
        function (err) { console.error("Execute error", err); });
    //let ss = new SchedulerService();
    //let returnval = ss.AddThisEvent(event);
    handleClose();
    // window.location.reload();

  }

  const handleSubmit = () => {
    //let event = {
    //  "summary": eventTitle,
    //  "start": {
    //    "dateTime": eventStartDate.concat("T09:00:00-05:00")
    //  },
    //  "end": {
    //    "dateTime": eventEndDate.concat("T10:00:00-05:00")
    //  }
    //}
    let googleEvent = {
      "summary": Title,
      "description": Summarynotes,
      "start": { "dateTime": new Date(StartDateTime) },
      "end": { "dateTime": new Date(EndDateTime) },
      "Id": EventId
      //"Consultant": { "NationalID": Consultant },
      //"Patient": { "NationalID": Patient }
    }
    let event = {
      "Id": EventId,
      "Title": Title,
      "SummaryNotes": Summarynotes,
      "StartDateTime": new Date(StartDateTime),//StartDateTime.concat("T09:00:00-05:00"),
      "EndDateTime": new Date(EndDateTime),//EndDateTime.concat("T10:00:00-05:00")
      "Consultant": Consultant,
      "Patient": Patient
      //"start": {
      //  "dateTime": StartDate.concat("T09:00:00-05:00")
      //},
      //"end": {
      //  "dateTime": EndDate.concat("T10:00:00-05:00")
      //}
    }
    let ss = new SchedulerService();
    let returnval = ss.UpdateThisEvent(googleEvent).
      then(
        function (response) {
          event.Id = response.result.id;
          updateVisit(event);
        },
        function (err) { console.error("Execute error", err); });
    //let ss = new SchedulerService();
    //let returnval = ss.AddThisEvent(event);
    handleClose();
    // window.location.reload();

  }

  function updateVisit(event) {
    fetch('https://cloudclinicapi.azurewebsites.net/api/visit/' + event.Id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    }).then(response => response.json())
      .then(status => console.log(status))
      .catch(() => console.log("Can’t access response. Blocked by browser?"));
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="Title">Title</label>
            <input type="text" id="Title" value={Title} onChange={handleTitleChange} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="Patient">Patient</label>
            <input type="text" id="Patient" value={Patient} onChange={handlePatientChange} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="Consultant">Consultant</label>
            <input type="text" id="Consultant" value={Consultant} onChange={handleConsultantChange} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="SummaryNotes">Summary Notes</label>
            <input type="text" id="SummaryNotes" value={Summarynotes} onChange={handleSummaryNotesChange} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="StartDateTime">Start Date</label>
            <input type="text" id="StartDateTime" value={StartDateTime} onChange={handleStartDateChange} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="EndDateTime">End Date</label>
            <input type="text" id="EndDateTime" value={EndDateTime} onChange={handleEndDateChange} className="form-control" />
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete Appointment
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default EditEventModal
