import React, { useEffect, useState, createRef } from "react";
import MUIDataTable from "mui-datatables";
import { Link, NavLink } from "react-router-dom";
import "./style.css";
import { Button } from "react-bootstrap";
import { ServerImagePath } from "../../utils/constants";
export default class ViewPatientsDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          label: "Image Name",
          name: "imageName",
        },
        {
          label: "Image Path",
          name: "imagePath",
        },

        {
          label: "Patient I.D",
          name: "patientId",
        },

        {
          label: "Image",
          name: "imageName",
          options: {
            customBodyRender: (val) => (
              <img
                src={ServerImagePath + "/" + val}
                alt=""
                style={{ width: "100px" }}
                onClick={() => window.open(ServerImagePath + "/" + val)}
              />
            ),
          },
        },
      ],
      rowSelection: "single",
      rowData: [],
    };
  }
  options = {
    filterType: "checkbox",
    responsive: "vertical",
  };
  
  handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response;
  }
  componentDidMount() {
    fetch(
      `https://cloudclinicapi.azurewebsites.net/api/LabTest/visitLabTest/${this.props.match.params.id}`
    )
      .then(this.handleErrors)
      .then((result) => result.json())
      .then((rowData) => {
        if (typeof rowData == typeof "abc") {
          alert(rowData);
        } else {
          this.setState({ rowData });
        }
        console.log("url for patient doc",this.props.match.params.id)
      });
  }
componentDidUpdate(){
  fetch(
    `https://cloudclinicapi.azurewebsites.net/api/LabTest/visitLabTest/${this.props.match.params.id}`
  )
    .then(this.handleErrors)
    .then((result) => result.json())
    .then((rowData) => {
      if (typeof rowData == typeof "abc") {
        alert(rowData);
      } else {
        this.setState({ rowData });
      }
      console.log("url for patient doc",this.props.match.params.id)
    });
}
  onSelectionChanged = () => {
    var selectedRows = this.gridApi.getSelectedRows();
    this.props.history.push(
      "/EditPatient?.Patient=" + selectedRows[0].nationalID
    );
  };

  render() {
    return (
      <div className="tableWrapper">
        <div>
          {/* <Link to='/Fileuploading' className="btn btn-primary mb-3">
            Add Document
          </Link> */}
          <NavLink
                className="viewButton"
                to={`/Fileuploading/${this.props.match.params.id}`} 
                //  11,6
              >
                             {/* { this.visitfun(val)} */}
                            
                           
                             Add Document
              </NavLink>
          <MUIDataTable
            title="Patient Visits"
            columns={this.state.columns}
            data={this.state.rowData}
            options={this.options}
            onSelectionChanged={this.onSelectionChanged}
            rowSelection={this.rowSelection}
          />
        </div>
      </div>
    );
  }
}
