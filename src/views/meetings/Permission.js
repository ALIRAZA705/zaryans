import React, { ReactNode, SyntheticEvent, Component} from 'react';
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
import { Link } from 'react-router-dom';



  class Permission extends React.Component {
    render() {
      return (
          <div>
          <Button variant="primary" size="lg">
           <Link to="HostMeeting" style={{color:"white"}}>Start a Meeting</Link>
    </Button>{' '}
          </div>

      );
    }
  }

export default Permission