
import React, { Component } from "react";

class EditBtn extends Component {
    constructor(props) {
        super(props);
        this.btnClickedHandler = this.btnClickedHandler.bind(this);
    }
    btnClickedHandler() {
        this.props.clicked(this.props.value);

    }
    render() {
        return <button onClick={this.btnClickedHandler} className="btn btn-outline-warning pull-right">✍</button>;

    }
}

export default EditBtn;
