import React from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./modal.css";
/* global gapi */

//const localizer = momentLocalizer(moment);
//const DnDCalendar = withDragAndDrop(Calendar);
export default class SchedulerService {
  GetAuthenticatedSchedulerInstance = () => {
    gapi.auth2.init({
      client_id:
        // "231690544330-7dj8gbv0bl8jmvvqunbkmlrbu1nrr61r.apps.googleusercontent.com",
        // "740644695092-q6fl4gv4u768674k1hphjksb6fb2vv19.apps.googleusercontent.com",
        //"513939899772-8jr9d7g3p1h08amp1tsul1ukli0dc6u7.apps.googleusercontent.com",
        "890899311319-s0mtaq8trm4gcvs8p2gok6dmnjp0c01p.apps.googleusercontent.com",
        
    });
    return gapi.auth2.getAuthInstance().signIn({
      scope:
        "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events",
    });
  };
  LoadScheduler = () => {
    // gapi.client.setApiKey("AIzaSyBPcaCbDhJpCBWd-bt_m9NwRk-yWDXBAXQ");
    gapi.client.setApiKey("AIzaSyCvQ7tdb7HHn-ZnkepkCAHmnOCjxprjKUo");
    
    return gapi.client.load(
      "https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest"
    );
  };

  LoadCalendarList = () => {
    return gapi.client.calendar.calendarList.list({
      maxResults: 100,
      minAccessRole: "reader",
      showDeleted: false,
      showHidden: false,
    });
  };

  LoadEventList = (calendarId) => {
    console.log("Calenedar I.d :", calendarId);
    return gapi.client.calendar.events.list({
      // calendarId: "cloudcalendarreceptionist@gmail.com",
      calendarId,
    });
  };

  AddThisEvent = (event) => {
    console.log("Events Are :", event);
    return gapi.client.calendar.events.insert({
      calendarId: event.calendarId,

      resource: event,
    });
  };
  UpdateThisEvent = (event) => {
    return gapi.client.calendar.events.update({
      eventId: event.Id,
      calendarId: "cloudcalendarreceptionist@gmail.com",

      resource: event,
    });
  };
  DeleteThisEvent = (event) => {
    debugger;
    return gapi.client.calendar.events.delete({
      eventId: event.Id,
      calendarId: "cloudcalendarreceptionist@gmail.com",
    });
  };

  AddEvent = (event) => {
    let that = this;
    that.GetAuthenticatedSchedulerInstance().then(function () {
      that.LoadScheduler().then(function () {
        that.AddThisEvent(event);
      });
    });
  };
}

//class SchedulerService extends React.Component {
//  constructor(props) {
//    super(props);
//  }

//  componentDidMount = () => {
//    let that = this;
//    gapi.auth2.init({ client_id: "231690544330-7dj8gbv0bl8jmvvqunbkmlrbu1nrr61r.apps.googleusercontent.com" });
//    gapi.auth2.getAuthInstance().signIn({ scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events" })
//      .then(function () {
//        gapi.client.setApiKey("AIzaSyBHluY_6MKx6kN7o3NXrf02ovvH2WVa5B8");
//        gapi.client.load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest")
//          .then(function () {
//            return gapi.client.calendar.calendarList.list({
//              "maxResults": 100,
//              "minAccessRole": "writer",
//              "showDeleted": true,
//              "showHidden": false
//            })
//              .then(function (response) {

//                let teamsFromApi = response.result.items.map(fruite => {
//                  return { id: fruite.id, value: fruite.summary, isChecked: fruite.selected }
//                });
//                that.setState({ fruites: teamsFromApi });

//                return gapi.client.calendar.events.list({
//                  "calendarId": "cloudcalendarreceptionist@gmail.com"
//                })
//                  .then(function (response) {
//                    let thisEvents = response.result.items.map(thisEvent => {
//                      return { id: thisEvent.id, start: thisEvent.start.dateTime, end: thisEvent.end.dateTime, title: thisEvent.summary }
//                    });
//                    that.setState({ events: thisEvents });
//                  },
//                    function (err) { console.error("Execute error", err); });
//              },
//                function (err) { console.error("Execute error", err); });
//            console.log("GAPI client loaded for API");
//          },
//            function (err) { console.error("Error loading GAPI client for API", err); });
//      },
//        function (err) { console.error("Error signing in", err); });

//  }

//  handleCheckChieldElement = (event) => {
//
//    let fruites = this.state.fruites;
//    fruites.forEach(fruite => {
//      if (fruite.value === event.target.value) {
//        fruite.isChecked = event.target.checked;
//

//        this.setState({ fruites: fruites });
//        //duplicate code: Faran
//        let thisEvents;
//        let that = this;
//        return gapi.client.calendar.events.list({
//          "calendarId": fruite.id
//        })
//          .then(function (response) {
//            thisEvents = response.result.items.map(thisEvent => {
//              return { id: thisEvent.id, start: thisEvent.start.dateTime, end: thisEvent.end.dateTime, title: thisEvent.summary, calendarId: thisEvent.organizer.email }
//            });
//            if (!fruite.isChecked) {
//              let calendarEvents = thisEvents;
//              thisEvents = that.state.events.filter(function (event) {
//                return event.calendarId !== fruite.id;
//              });
//              that.setState({ events: thisEvents });
//            }
//            else {
//
//              that.setState({ events: that.state.events.concat(thisEvents) });

//            }

//          },
//            function (err) { console.error("Execute error", err); });

//      }
//    });
//  }

//  createEvent() {
//    let that = this;
//    function create() {
//
//      window.gapi.client
//        .init({
//          apiKey: 'AIzaSyBHluY_6MKx6kN7o3NXrf02ovvH2WVa5B8'
//        })
//        .then(function () {
//          return window.gapi.client.request({
//            path: `https://www.googleapis.com/calendar/v3/calendars/cloudcalendarreceptionist@gmail.com/events`,
//            body: {
//              summary: 'Sample event',
//              location: 'Winnipeg, Manitoba, Canada',
//              description: 'Its a sample event.',
//              start: {
//                dateTime: '2020-08-10T09:00:00-07:00',
//                timeZone: 'America/Los_Angeles'
//              }
//            },
//            method: 'POST'
//          });
//        })
//        .then(
//          response => {
//
//            let events = response.result.items;
//          },
//          function (reason) {
//
//            console.log(reason);
//          }
//        );
//
//    }

//  }

//  render() {
//    return (
//      <form>
//        <div>
//          <input type="button" value="Add Event" onClick={this.createEvent} className="btn btn-primary pull-right" />
//          <ul className="list-group">
//            {
//              this.state.fruites.map((fruite) => {
//                return (<CheckBox handleCheckChieldElement={this.handleCheckChieldElement}  {...fruite} />)
//              })
//            }
//          </ul>
//          <DnDCalendar
//            selectable
//            toolbar
//            defaultDate={moment().toDate()}
//            defaultView="month"
//            events={this.state.events}
//            localizer={localizer}
//            onEventDrop={this.onEventDrop}
//            onEventResize={this.onEventResize}
//            onSelectSlot={this.addEvent}
//            resizable
//            style={{ height: "100vh" }}
//            onSelectEvent={this.onEventClick}
//          />
//          <button type="button" className="btn btn-primary" onClick={this.openModal}>Open Modal</button>
//        </div>
//      </form>
//    );
//  }
//}
//export default SchedulerService
