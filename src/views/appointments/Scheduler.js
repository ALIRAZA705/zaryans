import React, { Component } from "react";
//import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import moment from "moment";
import ReactDOM from "react-dom";
//import Modal from 'react-modal';
import { Calendar, momentLocalizer } from "react-big-calendar";
//import Scheduler1 from '../../big-calendar.js';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import SchedulerService from "./SchedulerService.js";
import CheckBox from "./Checkbox";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
//import "./modal.css";
/* global gapi */
import AddEventModal from "./AddModalService.js";
import EditEventModal from "./EditModalService.js";
import { BsChevronDown } from "react-icons/bs";
import { Link } from "react-router-dom";
import { CalendarContainer } from "react-datepicker";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

class Scheduler extends React.Component {
  constructor(props) {
    super(props);

    this.SchedulerService = new SchedulerService();
    //this.ModalService = new ModalService();
    this.isAuthorized = false;
    this.googleAuth = null;
    this.currentApiRequest = null;
    this.state = {
      calendars: [],
      events: [],
      originalEventsData: [],
      calendarEvent: {
        Id: "",
        Title: "",
        SummaryNotes: "",
        StartDate: "",
        EndDate: "",
      },
      //,
      //editEvent: {
      //  id: '',
      //  summary: '',
      //  start: '',
      //  end: ''
      //},
      show: false,
      showEdit: false,
    };

    this.moveEvent = this.moveEvent.bind(this);
    this.addEvent = this.addEvent.bind(this);
  }
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  showEditModal = () => {
    this.setState({ showEdit: true });
  };

  hideEditModal = () => {
    this.setState({ showEdit: false });
  };
  moveEvent({ event, start, end }) {
    const { events } = this.state;

    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    this.setState({
      events: nextEvents,
    });
  }

  onEventResize = (data) => {
    const { start, end } = data;

    this.setState((state) => {
      let event = this.state.events.find((e) => e.id === data.event.id);
      event.start = start;
      event.end = end;
      this.UpdateVisitDuplicateCode(event.id, event.start, event.end);
      return { events: state.events };
    });
  };
  onEventClick = (data) => {
    //debugger;
    this.setState((state) => {
      state.calendarEvent.Id = data.id;
      state.calendarEvent.Title = data.title;
      state.calendarEvent.SummaryNotes = data.description;
      state.calendarEvent.StartDateTime = data.start;
      state.calendarEvent.EndDateTime = data.end;
    });
    this.showEditModal();
    //ModalService.openModal();
  };

  onEventDrop = (data) => {
    //debugger;
    const { start, end } = data;

    this.setState((state) => {
      let event = this.state.events.find((e) => e.id === data.event.id);
      event.start = new Date(start);
      event.end = new Date(end);
      this.UpdateVisitDuplicateCode(event.id, event.start, event.end);
      return { events: state.events };
    });
    console.log(data);
  };

  UpdateVisitDuplicateCode = (id, start, end) => {
    let that = this;
    let googleEvent = {
      start: { dateTime: new Date(start) },
      end: { dateTime: new Date(end) },
      Id: id,
    };
    let event = {
      Id: id,
      StartDateTime: new Date(start),
      EndDateTime: new Date(end),
    };

    let ss = new SchedulerService();
    let returnval = ss.UpdateThisEvent(googleEvent).then(
      function (response) {
        event.Id = response.result.id;
        that.updateVisitServiceDuplicateCode(event);
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
  };

  updateVisitServiceDuplicateCode = (event) => {
    fetch("https://cloudclinicapi.azurewebsites.net/api/visit/" + event.Id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    })
      .then((response) => response.json())
      .then((status) =>
        console.log(JSON.stringify(status) + "<----------status")
      )
      .catch(() => console.log("Can’t access response. Blocked by browser?"));
  };

  //openModal = () => {
  //  this.setState({ modalIsOpen: true });
  //}

  //closeModal = () => {
  //  this.setState({ modalIsOpen: false });
  //}

  handleModalCloseRequest = () => {
    // opportunity to validate something and keep the modal open even if it
    // requested to be closed
    this.setState({ modalIsOpen: false });
  };

  handleSaveClicked = (e) => {
    alert("Save button was clicked");
  };

  async componentDidMount() {
    let that = this;

    that.SchedulerService.GetAuthenticatedSchedulerInstance().then(function () {
      that.SchedulerService.LoadScheduler().then(function () {
        that.SchedulerService.LoadCalendarList().then(async function (
          response
        ) {
          console.log("MAIN RESPONSE", response);
          let calendarList = response.result.items.map((calendar) => {
            return {
              id: calendar.id,
              value: calendar.id,
              name: calendar.summary,
              header: calendar.description,
              isChecked: calendar.selected,
              backgroundColor: calendar.backgroundColor,
              colorId: calendar.colorId,
            };
          });

          that.setState({ calendars: calendarList });
          if ((calendarList.isChecked = true)) {
            await Promise.all(
              calendarList.map(async (x, index) => {
                if (!x.id) {
                  return;
                }
                const response = await that.SchedulerService.LoadEventList(
                  x.id
                );

                console.log("-----response----", response);
                // console.log("Calendar Inner Item", x.backgroundColor);
                let thisEvents = response.result.items.map((thisEvent) => {
                  return {
                    id: thisEvent.id,
                    start: new Date(thisEvent.start.dateTime),
                    end: new Date(thisEvent.end.dateTime),
                    title: thisEvent.summary,
                    calendarId: thisEvent.organizer?.email || "",
                    colorId: x.colorId,
                    backgroundColor: x.backgroundColor,
                  };
                });

                if ((response.isChecked = true)) {
                } else {
                  console.log("Else Response", response);
                }

                that.setState({
                  events: [...that.state.events, ...thisEvents],

                  originalEventsData: [...that.state.events, ...thisEvents],
                });
                console.log("This Events", thisEvents);
              })
            );
          } else {
            console.log("Else Calender is Called");
          }

          // await Promise.all(
          //   calendarList.map(async (x, index) => {
          //     if (!x.id) {
          //       return;
          //     }
          //     const response = await that.SchedulerService.LoadEventList(x.id);
          //     // console.log("-----response----", response);
          //     // console.log("Response Called", response);
          //     let thisEvents = response.result.items.map((thisEvent) => {
          //       return {
          //         id: thisEvent.id,
          //         start: new Date(thisEvent.start.dateTime),
          //         end: new Date(thisEvent.end.dateTime),
          //         title: thisEvent.summary,
          //       };
          //     });
          //     that.setState({ events: [...that.state.events, ...thisEvents] });

          //     if ((response.isChecked = true)) {
          //     } else {
          //       console.log("Else Response", response);
          //     }

          //     that.setState({ events: [...that.state.events, ...thisEvents] });
          //   })
          // );

          // that.SchedulerService.LoadEventList().then(function (response) {
          //   debugger;
          //   let thisEvents = response.result.items.map((thisEvent) => {
          //     return {
          //       id: thisEvent.id,
          //       start: new Date(thisEvent.start.dateTime),
          //       end: new Date(thisEvent.end.dateTime),
          //       title: thisEvent.summary,
          //     };
          //   });
          //   that.setState({ events: thisEvents });
          // });
        });
      });
    });
  }

  addEvent = ({ event, start, end, allDay }) => {
    let that = this;
    // this.setState((state) => {
    //   state.editEvent.title = "";
    //   state.editEvent.StartDate = moment().toDate();
    //   state.editEvent.EndDate = moment().toDate();
    // });
    this.showModal();
    // this.setState({ openThisModal: true });
    // this.setModalShow(true);
    // this.openModal();
  };

  // handleAllChecked = (event) => {
  //   let fruites = this.state.fruites;
  //   fruites.forEach((fruite) => (fruite.isChecked = event.target.checked));
  //   this.setState({ fruites: fruites });
  // };
  eventStyleGetter = (event, start, end, isSelected) => {
    // console.log("Event Style", event);
    var backgroundColor = "#" + event.hexColor;
    var style = {
      backgroundColor: event.backgroundColor,
      borderRadius: "0px",
      opacity: 0.8,
      color: "black",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  };

  handleCheckChildElement = (event) => {
    // let calendars = [...this.state.calendars];

    // let selectedCalendar = calendars.find(x=> x.id == event.target.value);
    // selectedCalendar.isChecked = event.target.value;
    // let index = calendars.findIndex(selectedCalendar);
    // calendars[index] = selectedCalendar;
    // this.setState({calendars});

    // calendar = {
    //   isChecked: true,
    //   id: "cloudfare@gmail.com",
    //   value="cloudflare@gmail.com"
    // }
    debugger;

    let calendars = this.state.calendars.map((calendar) => {
      if (calendar.id == event.target.value) {
        return {
          ...calendar,
          isChecked: event.target.checked,
          // For Checkbox Background Color
          backgroundColor: this.eventStyleGetter,
        };
      } else {
        return calendar;
      }
    });
    let events = [];
    if (!event.target.checked) {
      events = this.state.events.filter(
        (x) => x.calendarId != event.target.value
      );
    } else {
      let matchedEvents = this.state.originalEventsData.filter(
        (x) => x.calendarId == event.target.value
      );
      events = [...this.state.events, ...matchedEvents];
      this.setState({ events });
    }

    // calendars.forEach(x=>{
    //   if (condition) {

    //   }
    // })

    // console.log("CALENDARS", calendars);
    this.setState({ calendars, events });

    // calendars.forEach((calendar) => {
    //   if (calendar.value === event.target.value) {
    //     calendar.isChecked = event.target.checked;

    //     this.setState({ calendars: calendar });
    //     //duplicate code: Faran
    //     let thisEvents;
    //     let that = this;
    //     return gapi.client.calendar.events
    //       .list({
    //         calendarId: calendar.id,
    //       })
    //       .then(
    //         function (response) {
    //           thisEvents = response.result.items.map((thisEvent) => {
    //             return {
    //               id: thisEvent.id,
    //               start: thisEvent.start.dateTime,
    //               end: thisEvent.end.dateTime,
    //               title: thisEvent.summary,
    //               calendarId: thisEvent.organizer.email,
    //             };
    //           });
    //           if (!calendar.isChecked) {
    //             let calendarEvents = thisEvents;
    //             thisEvents = that.state.events.filter(function (event) {
    //               return event.calendarId !== calendar.id;
    //             });
    //             that.setState({ events: thisEvents });
    //           } else {
    //             that.setState({ events: that.state.events.concat(thisEvents) });
    //           }
    //         },
    //         function (err) {
    //           console.error("Execute error", err);
    //         }
    //       );
    //   }
    // });
  };

  //createEvent() {
  //  let that = this;
  //  function create() {

  //    window.gapi.client
  //      .init({
  //        apiKey: 'AIzaSyBHluY_6MKx6kN7o3NXrf02ovvH2WVa5B8'
  //      })
  //      .then(function () {
  //        return window.gapi.client.request({
  //          path: `https://www.googleapis.com/calendar/v3/calendars/cloudcalendarreceptionist@gmail.com/events`,
  //          body: {
  //            summary: 'Sample event',
  //            location: 'Winnipeg, Manitoba, Canada',
  //            description: 'Its a sample event.',
  //            start: {
  //              dateTime: '2020-08-10T09:00:00-07:00',
  //              timeZone: 'America/Los_Angeles'
  //            }
  //          },
  //          method: 'POST'
  //        });
  //      })
  //      .then(
  //        response => {

  //          let events = response.result.items;
  //        },
  //        function (reason) {

  //          console.log(reason);
  //        }
  //      );

  //  }
  //  //window.gapi.load("client", create);
  //  //
  //  //window.gapi.client
  //  //  .init({
  //  //    apiKey: 'AIzaSyBHluY_6MKx6kN7o3NXrf02ovvH2WVa5B8'
  //  //  })
  //  //  .then(function () {
  //  //    gapi.client.load('calendar', 'v3', function () {

  //  //      const request = gapi.client.calendar.events.insert({
  //  //        'calendarId': 'mohammadfaranshabbir.com',
  //  //        'resource': {
  //  //          'summary': 'Faran Test Event',
  //  //          'location': 'Test Location',
  //  //          'description': 'Test appointment',
  //  //          'start': {
  //  //            'dateTime': '2020-08-09T09:00:00-07:00',
  //  //            'timeZone': 'America/Los_Angeles'
  //  //          },
  //  //          'end': {
  //  //            'dateTime': '2020-08-09T17:00:00-07:00',
  //  //            'timeZone': 'America/Los_Angeles'
  //  //          },
  //  //          'reminders': {
  //  //            'useDefault': false
  //  //          }
  //  //        }
  //  //      }).then(
  //  //        response => {
  //  //
  //  //          console.log(response);
  //  //        },
  //  //        function (reason) {
  //  //
  //  //          console.log(reason);
  //  //        }
  //  //      );
  //  //      request.execute(function (event) {
  //  //        this.appendPre('Event created: ' + event.htmlLink);
  //  //      });
  //  //    });
  //  //  });

  //}

  render() {
    return (
      <div>
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              <Accordion.Toggle
                as={Link}
                variant="link"
                eventKey="0"
                style={{ width: "0px" }}
              >
                <span
                  style={{
                    backgroundColor: "#fff",
                    color: "blue",
                    fontSize: "15px",
                  }}
                >
                  <BsChevronDown />
                </span>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <div className="col-5">
                  <ul className="list-group">
                    {this.state.calendars.map((calendar) => {
                      if (!calendar.isChecked && !calendar.value) {
                        return;
                      }

                      return (
                        <CheckBox
                          className="form-check-input"
                          handleCheckChildElement={this.handleCheckChildElement}
                          {...calendar}
                        />
                      );
                    })}
                  </ul>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        <AddEventModal
          show={this.state.show}
          handleClose={this.hideModal}
          eventTitle={this.state.calendarEvent.Title}
          patientData={this.props.patientData}
          physicianData={this.props.physicianData}
          eventStartDate={this.state.calendarEvent.StartDate}
          eventEndDate={this.state.calendarEvent.EndDate}
          calendars={this.state.calendars}
        />
        <EditEventModal
          show={this.state.showEdit}
          handleClose={this.hideEditModal}
          thisSummaryNotes={this.state.calendarEvent.SummaryNotes}
          thisStartDateTime={this.state.calendarEvent.StartDateTime}
          thisEndDateTime={this.state.calendarEvent.EndDateTime}
          thisEventId={this.state.calendarEvent.Id}
          thisTitle={this.state.calendarEvent.Title}
        />
        <DnDCalendar
          selectable
          toolbar
          defaultDate={moment().toDate()}
          defaultView="month"
          events={this.state.events}
          localizer={localizer}
          onEventDrop={this.onEventDrop}
          onEventResize={this.onEventResize}
          onSelectSlot={this.addEvent}
          resizable
          style={{ height: "100vh", backgroundColor: "#ffffff" }}
          onSelectEvent={this.onEventClick}
          eventPropGetter={this.eventStyleGetter}
        />
      </div>
    );
  }
}
export default Scheduler;
