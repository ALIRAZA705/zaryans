
import React, { Component } from "react";

class DocumentBtn extends Component {
    constructor(props) {
        super(props);
        this.btnClickedHandler = this.btnClickedHandler.bind(this);
    }
    btnClickedHandler() {
        this.props.clicked(this.props.value);

    }
    render() {
        return <button onClick={this.btnClickedHandler} className="btn btn-outline-info pull-right">View Document</button>;

    }
}

export default DocumentBtn;
