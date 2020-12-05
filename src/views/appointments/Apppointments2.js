import React, {ReactNode, SyntheticEvent} from 'react';
import moment from "moment";
/* global gapi */ 

  export default class Appointments extends React.Component {
      constructor(props) {
        super(props);

      const CLIENT_ID = "231690544330-7dj8gbv0bl8jmvvqunbkmlrbu1nrr61r.apps.googleusercontent.com";
      const API_KEY = 'AIzaSyBHluY_6MKx6kN7o3NXrf02ovvH2WVa5B8';
      const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
      const SCOPES = "https://www.googleapis.com/auth/calendar.events";
  }
      
componentDidMount = () => {
	this.handleAuthClick();
};

handleAuthClick = (event) => {
  debugger;
  gapi.auth2.getAuthInstance().signIn();
  this.handleClientLoad();
}

 handleClientLoad() {
  gapi.client.setApiKey(this.API_KEY);
  window.setTimeout(this.checkAuth,1);
  this.checkAuth();
}

 checkAuth() {
  gapi.auth.authorize({client_id: this.CLIENT_ID, scope: this.SCOPES, immediate: true},
      this.handleAuthResult);
}

createEvent() {
		let that = this;
		function create() {
    	debugger;
      window.gapi.client
        .init({
          apiKey: 'AIzaSyBHluY_6MKx6kN7o3NXrf02ovvH2WVa5B8'
        })
        .then(function() {
          return window.gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/cloudcalendarreceptionist@gmail.com/events`,
              body: {
		  summary: 'Sample event',
		  location: 'Winnipeg, Manitoba, Canada',
		  description: 'Its a sample event.',
		  start: {
		    dateTime: '2020-08-10T09:00:00-07:00',
		    timeZone: 'America/Los_Angeles'
		  }
	}, 
	method: 'POST'
          });
        })
        .then(
          response => {
          	debugger;
            let events = response.result.items; 
          },
          function(reason) {
          	debugger;
            console.log(reason);
          }
        );
        	debugger;
        }
        //window.gapi.load("client", create);
        debugger;

gapi.client.load('calendar', 'v3', function() {
   
  const request = gapi.client.calendar.events.insert({
	  'calendarId': 'cloudcalendarreceptionist@gmail.com',
	  'resource': {
		  'summary': 'Faran Test Event',
		  'location': 'Test Location',
		  'description': 'Test appointment',
		  'start': {
		    'dateTime': '2020-08-09T09:00:00-07:00',
		    'timeZone': 'America/Los_Angeles'
		  },
		  'end': {
		    'dateTime': '2020-08-09T17:00:00-07:00',
		    'timeZone': 'America/Los_Angeles'
		  },
		  'reminders': {
		    'useDefault': false
		  }
		}
  }).then(
          response => {
          	debugger;
            console.log(response);
          },
          function(reason) {
          	debugger;
            console.log(reason);
          }
        );
  request.execute(function(event) {
    this.appendPre('Event created: ' + event.htmlLink);
  });
    });  
      render(){
        return (
        	<form>
        	<div className="form-group">
        	
	          <input type="button" value="Add Event" onClick={this.createEvent} className="btn btn-primary pull-right"/>
	        </div> 
             {/* <iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FWinnipeg&amp;src=bW9oYW1tYWRmYXJhbnNoYWJiaXJAZ21haWwuY29t&amp;src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;src=ZW4uY2FuYWRpYW4jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&amp;src=c3FtMnVkaTFhZGY2ZHM3Z2o5aDgxdHVldDhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%23039BE5&amp;color=%2333B679&amp;color=%230B8043&amp;color=%237CB342" width="1024" height="768" frameborder="0" scrolling="no"></iframe> */}
             <iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Asia%2FKarachi&amp;src=Y2xvdWRjYWxlbmRhcnJlY2VwdGlvbmlzdEBnbWFpbC5jb20&amp;src=Y2xvdWRjbGluaWNjYXJkaW9sb2dpc3RzQGdtYWlsLmNvbQ&amp;src=Y2xvdWRjbGluaWNwaHlzaWNpYW5zQGdtYWlsLmNvbQ&amp;color=%23039BE5&amp;color=%23009688&amp;color=%23EF6C00" style="border:solid 1px #777" width="800" height="600" frameborder="0" scrolling="no"></iframe>
          	</form>
          );
      }
  }
}