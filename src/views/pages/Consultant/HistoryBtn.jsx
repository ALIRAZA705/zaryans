
import React, { Component } from "react";

class HistoryBtn extends Component {
    constructor(props) {
        super(props);
        this.btnClickedHandler = this.btnClickedHandler.bind(this);
    }
    btnClickedHandler() {
        this.props.clicked(this.props.value);

    }
    render() {
        return <button onClick={this.btnClickedHandler} className="btn btn-outline-info pull-right">View History</button>;

    }
}

export default HistoryBtn;
