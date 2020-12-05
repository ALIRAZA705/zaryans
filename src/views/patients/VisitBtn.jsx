
import React, { Component } from "react";

class VisitBtn extends Component {
    constructor(props) {
        super(props);
        this.btnClickedHandler = this.btnClickedHandler.bind(this);
    }
    btnClickedHandler() {

        this.props.clicked(this.props.value);
        // var patient_NationalID = this.props.value;
        // console.log(patient_NationalID);
        // this.props.history.push("/meeting/guestMeeting?Consultant=" + patient_NationalID);

    }

    nextPath(path) {
        this.props.history.push("/consultation/consultationqueue");
    }
    render() {
        return <button onClick={this.nextPath} className="btn btn-outline-info pull-right">View Visits</button>;

    }
}

export default VisitBtn;
