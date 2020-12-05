import React, { useEffect, useState, createRef } from "react";
import MUIDataTable from "mui-datatables";
import { NavLink } from "react-router-dom";
import "./style.css";

export default class Consultant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          label: "Visit ID",
          name: "id",
          sortable: true,
          filter: true,
        },
        {
          label: "Meeting",
          name: "id",
          sortable: true,
          filter: true,
          options: {
            customBodyRender: (val) => (
              <NavLink className="viewButton" to={`/meeting/guestMeeting?Consultant=${val}`}>
                Join Meeting
              </NavLink>
            ),
          },
        },

        // {
        //   label: "Views",
        //   name: "id",
        //   options: {
        //     customBodyRender: (val) => (
        //       <NavLink
        //         className="viewButton"
        //         to={`/patient/patientsVisits/${val}`}
        //       >
        //         View History
        //       </NavLink>
        //     ),
        //   },
        // },
        // {
        //   label: "Views",
        //   name: "id",
        //   options: {
        //     customBodyRender: (val) => (
        //       <NavLink
        //         className="viewButton"
        //         to={`/patient/patientsVisits/${val}`}
        //       >
        //         View Lab Tests
        //       </NavLink>
        //     ),
        //   },
        // },
        {
          label: "Title",
          name: "title",
          sortable: true,
          filter: true,
        }, {
          label: "Summary Notes",
          name: "summaryNotes",
          sortable: true,
          filter: true,
        }, {
          label: "Start Date",
          name: "startDateTime",
          sortable: true,
          filter: true,
        }, {
          label: "End Date",
          name: "endDateTime",
          sortable: true,
          filter: true,
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
  componentDidMount() {
    fetch("https://cloudclinicapi.azurewebsites.net/api/visit")
      .then((result) => result.json())
      .then((rowData) => this.setState({ rowData }));
  }

  onSelectionChanged = () => {
    var selectedRows = this.gridApi.getSelectedRows();
    // this.props.history.push(
    //   "/EditPatient?.Patient=" + selectedRows[0].nationalID
    // );
  };

  render() {
    return (
      <div className="tableWrapper">
        <MUIDataTable
          title="Consultant Visits"
          columns={this.state.columns}
          data={this.state.rowData}
          options={this.options}
          onSelectionChanged={this.onSelectionChanged}
          rowSelection={this.rowSelection}
        />
      </div>
    );
  }
}

