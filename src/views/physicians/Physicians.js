// 

import React, { useEffect, useState, createRef } from "react";
import MUIDataTable from "mui-datatables";
import { NavLink } from "react-router-dom";
import "./style.css";

export default class Physicians extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          label: "National Id",
          name: "nationalID",
          sortable: true,
          filter: true,
          options: {
            customBodyRender: (val) => (
              <NavLink className="NavLink" to={`/EditPhysician?Physician=${val}`}>
                {val}
              </NavLink>
            ),
          },
        },
        {
          label: "HealthCareLicenseID",
          name: "healthCareLicenseID",
          sortable: true,
          filter: true,
        },
        {
          label: "HealthCareLicenseValidDate",
          name: "healthCareLicenseValidDate",
          sortable: true,
          filter: true,
        },
        {
          label: "Patient Name",
          name: "name",
          sortable: true,
          filter: true,
        },
        {
          label: "Phone Number",
          name: "phone",
          sortable: true,
          filter: true,
        },
        {
          label: "Address",
          name: "address",
          sortable: true,
          filter: true,
        },
        {
          label: "Date Of Birth",
          name: "dob",
          sortable: true,
          filter: true,
        },
        {
          label: "Speciality",
          name: "speciality",
          sortable: true,
          filter: true,
        },
        {
          label: "Discriminator",
          name: "discriminator",
          sortable: true,
          filter: true,
        },
        // {
        //   label: "Views",
        //   name: "nationalID",
        //   options: {
        //     customBodyRender: (val) => (
        //       <NavLink
        //         className="viewButton"
        //         to={`/patient/patientsVisits/${val}`}
        //       >
        //         View Visits
        //       </NavLink>
        //     ),
        //   },
        // },
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
    fetch("https://cloudclinicapi.azurewebsites.net/api/physician")
      .then((result) => result.json())
      .then((rowData) => this.setState({ rowData }));
  }

  onSelectionChanged = () => {
    var selectedRows = this.gridApi.getSelectedRows();
    this.props.history.push(
      "/EditPhysician?.Physician=" + selectedRows[0].nationalID
    );
  };

  render() {
    return (
      <div className="tableWrapper">
        <MUIDataTable
          title="Physicians List"
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