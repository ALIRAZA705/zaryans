import { Events } from "ag-grid-community";
import React, { Component } from "react";
// import "./App.css";
import CheckBox from "./Checkbox";

class ReactCheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fruites: [
        { id: 1, value: "banana", isChecked: true },
        { id: 2, value: "apple", isChecked: false },
        { id: 3, value: "mango", isChecked: false },
        { id: 4, value: "grap", isChecked: false },
      ],
    };
  }

  handleAllChecked = (event) => {
    let fruites = this.state.fruites;
    fruites.forEach((fruite) => (fruite.isChecked = event.target.checked));

    this.setState({ fruites: fruites });
    console.log("Fruites Checked :", fruites);
  };
  handleSingleChecked = (event) => {
    let fruite = this.state.fruites;
    fruite = fruite.isChecked = event.target.checked;

    this.setState({ fruite: fruite });
    console.log("Fruites Checked :", fruite);
  };

  handleCheckChieldElement = (event) => {
    let fruites = this.state.fruites;
    fruites.forEach((fruite) => {
      if (fruite.value === event.target.value)
        fruite.isChecked = event.target.checked;
      console.log("Fruit is Checked :", fruite);
    });
    this.setState({ fruites: fruites });
  };

  render() {
    return (
      <div className="App">
        <h1> Check and Uncheck All Example </h1>
        <input
          type="checkbox"
          onClick={this.handleAllChecked}
          value="checkedall"
        />
        Check / Uncheck All
        <ul>
          {this.state.fruites.map((fruite) => {
            debugger;
            return (
              <CheckBox
                handleCheckChieldElement={this.handleCheckChieldElement}
                {...fruite}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ReactCheckBox;
