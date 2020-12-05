import React, { useEffect, useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Dropdown } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import SchedulerService from "./SchedulerService.js";
import CheckBox from "./Checkbox";
import { uuid } from "uuidv4";
import {
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";

const AddEventModal = ({ show, handleClose, calendars }) => {
  const [formData, setFormData] = useState({
    Id: uuid(),
    Title: "",
    SummaryNotes: "",
    Consultant_NationalID: "",
    Patient: "",
    StartDateTime: "2020-08-25T09:00:00-05:00",
    EndDateTime: "2020-08-25T10:00:00-05:00",
    meetinglink: "2020-08-25T10:00:00-05:00",
  });
  const [ConsultantName, setConsultantName] = useState("");
  const [Cdata, setCdata] = useState([]);
  // const [meetlink, setmeetlink] = React.useState(new Date("").getTime());

  const {
    Id,
    Title,
    SummaryNotes,
    Consultant_NationalID,
    Patient,
    StartDateTime,
    EndDateTime,
    meetinglink,
  } = formData;
  console.log("Form Data", formData);

  useEffect(function effectFunction() {
    fetch("https://cloudclinicapi.azurewebsites.net/api/physician")
      .then((result) => result.json())
      .then((data) => {
        setCdata(data);
      });
  }, []);

  function createVisit(e) {
    fetch("https://cloudclinicapi.azurewebsites.net/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e),
    })
      .then((response) => response.json())
      .then((status) => console.log(status))
      .catch(() => console.log("Can’t access response. Blocked by browser?"));
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    createVisit("Create Visit Form Data", formData);
    // let event = {
    //   Title: Title,
    //   SummaryNotes: SummaryNotes,
    //   StartDateTime: StartDateTime, //StartDateTime.concat("T09:00:00-05:00"),
    //   EndDateTime: EndDateTime, //EndDateTime.concat("T10:00:00-05:00")
    //"Consultant": {
    //  "NationalID": Consultant,
    //  "HealthCareLicenseID": "6542-123",
    //  "HealthCareLicenseValidDate": new Date("8/24/2020 12:00:00 AM"),
    //  "Name": "Consultant",
    //  "DOB": new Date("8/24/2020 12:00:00 AM"),
    //  "Address": "1 Donald Street",
    //  "Phone": "7864243",
    //  "Gender": "M",
    //  "IsDeleted": false,
    //  "Speciality": "Cardiologist",
    //  "Discriminator": "Consultant"
    //},
    //"Patient": {
    //  "NationalID": Patient,
    //  "Name": "Consultant",
    //  "DOB": new Date("8/24/2020 12:00:00 AM"),
    //  "Address": "1 Donald Street",
    //  "Phone": "7864243",
    //  "Gender": "M",
    //  "GuardianName": "",
    //  "GuardianPhone": "",
    //  "IsDeleted": false
    //}
    // };

    // let googleEvent = {
    //   title: Title,
    //   summary: SummaryNotes,
    //   start: { dateTime: "2020-08-25T09:00:00-05:00" },
    //   end: { dateTime: "2020-08-25T09:00:00-05:00" },
    //   //"Consultant": { "NationalID": Consultant },
    //   //"Patient": { "NationalID": Patient }
    // };
    // let ss = new SchedulerService();
    // debugger;
    // let returnval = ss.AddThisEvent(googleEvent).then(
    //   function (response) {
    //     debugger;
    //     event.Id = response.result.id;
    //     createVisit(event);
    //   },
    //   function (err) {
    //     console.error("Execute error", err);
    //   }
    // );
    //alert("returnval " + returnval);

    //let ss = new SchedulerService();
    //let returnval = ss.AddThisEvent(event);
    handleClose();
    //window.location.reload();
  };

  //const handleCheckChildElement = (event) => {

  //  calendars.forEach(calendar => {
  //    if (calendar.value === event.target.value) {
  //      calendar.isChecked = event.target.checked;
  //    }
  //  });
  //}

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <>
      <style type="text/css">
        {`
    .btn-flat {
      background-color: white;
      color: #3c4b64;
    }
    `}
      </style>
      <Button
        className="form-control"
        variant="flat"
        size="space"
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {children}
        &#x25bc;
      </Button>
    </>
  ));

  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul
            className="list-unstyled"
            style={{ minWidth: "33em", textAlign: "left", paddingLeft: "2em" }}
          >
            {children.map((child) => {
              return (
                <>
                  <a
                    href="#top"
                    style={{
                      color: "#736767",
                      borderBottom: "1px solid darkgrey",
                      minWidth: "33em !important",
                    }}
                    id="ConsultantId"
                    name="ConsultantId"
                    value={child.props.eventKey}
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(child.props.eventKey);
                      setFormData({
                        ...formData,
                        Consultant_NationalID: child.props.eventKey,
                      });
                      setConsultantName(child.props.children);
                    }}
                  >
                    {child.props.children}
                  </a>
                  <br />
                </>
              );
            })}
          </ul>
        </div>
      );
    }
  );

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
              id="Title"
              name="Title"
              value={Title}
              onChange={onChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Patient">Patient</label>
            <input
              type="text"
              id="Patient"
              name="Patient"
              value={Patient}
              onChange={onChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Patient">Calendar</label>
            <input
              type="text"
              id="Patient"
              name="Patient"
              value={Patient}
              onChange={onChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="Patient">Consultant</label>
            <Dropdown>
              <Dropdown.Toggle
                as={CustomToggle}
                id="dropdown-custom-components"
              >
                {!ConsultantName ? "Select a Consultant" : ConsultantName}
                {/* Select a Consultant */}
              </Dropdown.Toggle>

              <Dropdown.Menu as={CustomMenu}>
                {Cdata.map((item) => {
                  return (
                    <Dropdown.Item
                      eventKey={item.NationalID}
                      key={item.NationalID}
                      className="form-control"
                    >
                      {item.Name}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="form-group">
            <label htmlFor="SummaryNotes">Summary Notes</label>
            <input
              type="text"
              id="SummaryNotes"
              name="SummaryNotes"
              value={SummaryNotes}
              onChange={onChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="StartDateTime">Start Date</label>
            <input
              type="text"
              id="StartDateTime"
              name="StartDateTime"
              value={(StartDateTime, meetinglink)}
              onChange={onChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="EndDateTime">End Date</label>
            <input
              type="text"
              id="EndDateTime"
              name="EndDateTime"
              value={EndDateTime}
              onChange={onChange}
              className="form-control"
              required
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
