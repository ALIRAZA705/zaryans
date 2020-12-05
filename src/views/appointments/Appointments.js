import React, { ReactNode, SyntheticEvent, Component } from "react";
import moment, { min } from "moment";
import ReactDOM from "react-dom";
//import Modal from 'react-modal';
//import events from "./events";
import { Button } from "react-bootstrap";
import { ButtonToolbar } from "react-bootstrap";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
//import "./modal.css";
import CheckBox from "./Checkbox";
import ModalService from "./AddModalService.js";
import Scheduler from "./Scheduler.js";

//var appElement = document.getElementById('root');

//Modal.setAppElement(appElement);
//import moment from "moment";
/* global gapi */

//Calendar.momentLocalizer(moment);
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);
//const DragAndDropCalendar = withDragAndDrop(BigCalendar);
//const [modal, setModal] = useState(false);

//const MODAL_A = 'modal_a';
//const MODAL_B = 'modal_b';

class Appointments extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deps: [], addModalShow: false, isOpen: false };
    this.isAuthorized = false;
    this.googleAuth = null;
    this.currentApiRequest = null;

    this.state = {
      fruites: [],
      events: [],
      editEvent: {
        Title: "",
        StartDate: "",
        EndDate: "",
        patientData: null,
        physicianData: null,
      },
    };
    // Calender Start

    // this.state = { show: false };

    // const CLIENT_ID =
    //   "231690544330-7dj8gbv0bl8jmvvqunbkmlrbu1nrr61r.apps.googleusercontent.com";
    // const API_KEY = "AIzaSyBHluY_6MKx6kN7o3NXrf02ovvH2WVa5B8";
    // const DISCOVERY_DOCS = [
    //   "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
    // ];
    // const SCOPES = "https://www.googleapis.com/auth/calendar.events";
    // Calender
    this.moveEvent = this.moveEvent.bind(this);
    this.handleModalChangeTitle = this.handleModalChangeTitle.bind(this);
  }
  componentWillMount = () => {
    fetch("https://cloudclinicapi.azurewebsites.net/api/patient")
      .then((result) => result.json())
      .then((data) => {
        this.setState({ patientData: data });
      });
    fetch("https://cloudclinicapi.azurewebsites.net/api/physician")
      .then((result) => result.json())
      .then((data) => {
        // console.log(data)
        this.setState({ ...this.state, physicianData: data });
      });
  };
  moveEvent({ event, start, end }) {
    const { events } = this.state;

    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    this.setState({ ...this.state, events: nextEvents });
  }
  handleChange(event) {
    const target = event.target;
    const id = target.id;
    const value = target.value;
    this.setState((state) => {
      return {
        ...state,
        editEvent: state.editEvent.map((item, i) => {
          if (i == id) {
            return value;
          } else {
            return item;
          }
        }),
      };
    });
  }
  handleModalChangeTitle(event) {
    // this.setState((state) => {
    //   return{
    //     ...state,
    //     editEvent:{
    //       ...state.editEvent,
    //       Title : event.target.value
    //     }
    //   }
    // });
  }
  resizeEvent = (resizeType, { event, start, end }) => {
    const { events } = this.state;

    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    this.setState({
      ...this.state,
      events: nextEvents,
    });
  };
  onEventResize = (data) => {
    const { start, end } = data;

    this.setState((state) => {
      let event = this.state.events.find((e) => e.id === data.event.id);
      event.start = start;
      event.end = end;
      return { ...state, events: state.events };
    });
  };

  //onEventDrop = (data) => {
  //  debugger;
  //  const { start, end } = data;

  //  this.setState((state) => {
  //    let event = this.state.events.find((e) => e.id === data.event.id);
  //    event.start = start;
  //    event.end = end;
  //    return { events: state.events };
  //  });
  //  console.log(data);
  //};
  // componentDidMount() {
  //   let that = this;
  //   gapi.auth2.init({
  //     client_id:
  //       "513939899772-8jr9d7g3p1h08amp1tsul1ukli0dc6u7.apps.googleusercontent.com",
  //   });
  //   gapi.auth2
  //     .getAuthInstance()
  //     .signIn({
  //       scope:
  //         "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events",
  //     })
  //     .then(
  //       function () {
  //         gapi.client.setApiKey("AIzaSyDCbC9imbID1aoJ2p3g1GaKHUzqmRIrRbk");
  //         gapi.client
  //           .load(
  //             "https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest"
  //           )
  //           .then(
  //             function () {
  //               return gapi.client.calendar.calendarList
  //                 .list({
  //                   maxResults: 100,
  //                   minAccessRole: "reader",
  //                   showDeleted: true,
  //                   showHidden: false,
  //                 })
  //                 .then(
  //                   function (response) {
  //                     // Handle the results here (response.result has the parsed body).
  //                     debugger;
  //                     console.log("Response", response);

  //                     let teamsFromApi = response.result.items.map((fruite) => {
  //                       return {
  //                         id: fruite.id,
  //                         value: fruite.summary,
  //                         isChecked: fruite.selected,
  //                       };
  //                     });
  //                     that.setState({ fruites: teamsFromApi });

  //                     return gapi.client.calendar.events
  //                       .list({
  //                         calendarId: "cloudcalendarreceptionist@gmail.com",
  //                       })
  //                       .then(
  //                         function (response) {
  //                           // Handle the results here (response.result has the parsed body).
  //                           console.log("Response", response);

  //                           let thisEvents = response.result.items.map(
  //                             (thisEvent) => {
  //                               return {
  //                                 id: thisEvent.id,
  //                                 start: thisEvent.start.dateTime,
  //                                 end: thisEvent.end.dateTime,
  //                                 title: thisEvent.summary,
  //                               };
  //                             }
  //                           );
  //                           that.setState({ events: thisEvents });
  //                         },
  //                         function (err) {
  //                           console.error("Execute error", err);
  //                         }
  //                       );
  //                   },
  //                   function (err) {
  //                     console.error("Execute error", err);
  //                   }
  //                 );

  //               console.log("GAPI client loaded for API");
  //             },
  //             function (err) {
  //               console.error("Error loading GAPI client for API", err);
  //             }
  //           );
  //       },
  //       function (err) {
  //         console.error("Error signing in", err);
  //       }
  //     );
  // }

  updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      this.isAuthorized = true;
      if (this.currentApiRequest) {
        this.sendAuthorizedApiRequest(this.currentApiRequest);
      }
    } else {
      this.isAuthorized = false;
    }
  };

  sendAuthorizedApiRequest = (requestDetails) => {
    this.currentApiRequest = requestDetails;
    if (this.isAuthorized) {
      // Make API request
      // gapi.client.request(requestDetails)

      // Reset currentApiRequest variable.
      this.currentApiRequest = {};
    } else {
      this.googleAuth.signIn();
    }
  };

  handleAuthClick = (event) => {
    gapi.auth2.getAuthInstance().signIn();
    //this.handleClientLoad();
  };

  addEvent = ({ event, start, end, allDay }) => {
    this.setState((state) => {
      return {
        ...state,
        editEvent: {
          ...state.editEvent,
          title: "",
          start: moment().toDate(),
          end: moment().toDate(),
        },
      };
    });
    this.openModal();

    //this.setState({events.push(newEvent);});
  };

  handleAllChecked = (event) => {
    let fruites = this.state.fruites;
    fruites.forEach((fruite) => (fruite.isChecked = event.target.checked));
    this.setState({ ...this.state, fruites: fruites });
  };

  handleCheckChieldElement = (event) => {
    let fruites = this.state.fruites;
    fruites.forEach((fruite) => {
      if (fruite.value === event.target.value) {
        fruite.isChecked = event.target.checked;
        debugger;
        console.log("Fruit is Checked :", fruite);
        this.setState({ ...this.state, fruites: fruites });
        //
        let event = this.state.events.find((e) => e.id === fruite.id);
        //duplicate code: Faran
        let thisEvents;
        let that = this;
        return gapi.client.calendar.events
          .list({
            calendarId: fruite.id,
          })
          .then(
            function (response) {
              // Handle the results here (response.result has the parsed body).
              console.log("Response", response);

              thisEvents = response.result.items.map((thisEvent) => {
                debugger;
                return {
                  id: thisEvent.id,
                  start: thisEvent.start.dateTime,
                  end: thisEvent.end.dateTime,
                  title: thisEvent.summary,
                  calendarId: thisEvent.organizer.email,
                };
              });
              if (!fruite.isChecked) {
                let calendarEvents = thisEvents;
                let indexesToRemove = calendarEvents.indexOf(fruite);
                thisEvents = that.state.events.filter(function (event) {
                  return event.calendarId !== fruite.id;
                });
                that.setState({ ...this.state, events: thisEvents });
                thisEvents.indexOf();
                var array = [...this.state.people]; // make a separate copy of the array
                var { index, e } = array.indexOf(e.target.value);
              } else {
                that.setState({
                  ...this.state,
                  events: that.state.events.concat(thisEvents),
                });
              }
            },
            function (err) {
              console.error("Execute error", err);
            }
          );
      }
    });
  };

  createEvent() {
    let that = this;
    function create() {
      window.gapi.client
        .init({
          apiKey: "AIzaSyCvQ7tdb7HHn-ZnkepkCAHmnOCjxprjKUo",
        })
        .then(function () {
          return window.gapi.client.request({
            path:
              "https://www.googleapis.com/calendar/v3/calendars/cloudcalendarreceptionist@gmail.com/events",
            body: {
              summary: "Sample event",
              location: "Winnipeg, Manitoba, Canada",
              description: "Its a sample event.",
              start: {
                dateTime: "2020-08-10T09:00:00-07:00",
                timeZone: "America/Los_Angeles",
              },
            },
            method: "POST",
          });
        })
        .then(
          (response) => {
            let events = response.result.items;
          },
          function (reason) {
            console.log(reason);
          }
        );
    }
    //window.gapi.load("client", create);
    window.gapi.client
      .init({
        apiKey: "AIzaSyCvQ7tdb7HHn-ZnkepkCAHmnOCjxprjKUo",
      })
      .then(function () {
        gapi.client.load("calendar", "v3", function () {
          const request = gapi.client.calendar.events
            .insert({
              calendarId: "cloudcalendarreceptionist@gmail.com",
              resource: {
                summary: "Faran Test Event",
                location: "Test Location",
                description: "Test appointment",
                start: {
                  dateTime: "2020-08-09T09:00:00-07:00",
                  timeZone: "America/Los_Angeles",
                },
                end: {
                  dateTime: "2020-08-09T17:00:00-07:00",
                  timeZone: "America/Los_Angeles",
                },
                reminders: {
                  useDefault: false,
                },
              },
            })
            .then(
              (response) => {
                console.log("Response is :", response);
              },
              function (reason) {
                console.log(reason);
              }
            );
          request.execute(function (event) {
            this.appendPre("Event created: " + event.htmlLink);
          });
        });
      });
  }
  //openModal = () => {
  //  this.setState({ modalIsOpen: true });
  //}

  //closeModal = () => {
  //  this.setState({ modalIsOpen: false });
  //}

  //handleModalCloseRequest = () => {
  //  // opportunity to validate something and keep the modal open even if it
  //  // requested to be closed
  //  this.setState({ modalIsOpen: false });
  //}

  //handleSaveClicked = (e) => {
  //  alert('Save button was clicked');
  //}

  render() {
    const { isOpen } = this.state;
    const { deps } = this.state;
    let addModalClose = () =>
      this.setState({ ...this.state, addModalShow: false });
    return (
      <form>
        <div>
          {
            //  console.log(JSON.stringify(this.state.patientData)+'<------------------------patientDatain main')}
            //  {console.log(JSON.stringify(this.state.physicianData)+'<------------------------physicianDatain main')
          }
          <Scheduler
            patientData={this.state.patientData}
            physicianData={this.state.physicianData}
          />
          {/* <ModalService patientData = {this.state.patientData} physicianData = {this.state.physicianData} /> */}

          <ButtonToolbar>
            {/* <Button
              variant="primary"
              onClick={() =>
                this.setState({ ...this.state, addModalShow: true })
              }
            >
              Add Appointment
            </Button> */}

            {/* <AddAppointmentModal
            show={this.state.addModalShow}
            onHide={addModalClose}
            /> */}
          </ButtonToolbar>

        </div>
      </form>
    );
  }
}

export default Appointments;
