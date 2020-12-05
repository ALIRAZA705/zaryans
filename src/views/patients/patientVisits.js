// import React, { useEffect, useState, createRef } from "react";
// import { AgGridReact, AgGridColumn } from "ag-grid-react";
// import "ag-grid-community/dist/styles/ag-grid.css";
// import "ag-grid-community/dist/styles/ag-theme-material.css";
// import {
//   CBadge,
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CDataTable,
//   CRow,
//   CPagination,
// } from "@coreui/react";
// import { Button } from "react-bootstrap";

// export default class Patients extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       columnDefs: [
//         {
//           headerName: "National Id",
//           field: "nationalID",
//           sortable: true,
//           filter: true,
//         },
//         {
//           headerName: "Patient Name",
//           field: "name",
//           sortable: true,
//           filter: true,
//         },
//         {
//           headerName: "Phone Number",
//           field: "phone",
//           sortable: true,
//           filter: true,
//         },
//         {
//           headerName: "Address",
//           field: "address",
//           sortable: true,
//           filter: true,
//         },
//         {
//           headerName: "Date Of Birth",
//           field: "dob",
//           sortable: true,
//           filter: true,
//         },
//         {
//           headerName: "Guradian Name",
//           field: "guardianName",
//           sortable: true,
//           filter: true,
//         },
//         {
//           headerName: "Guardian Phone",
//           field: "guardianPhone",
//           sortable: true,
//           filter: true,
//         },
//         {
//           headerName: "Views",
//           colId: "params",
//           editable: false,
//           minWidth: 150,
//         },
//       ],
//       context: { componentParent: this },
//       frameworkComponents: {
//         ViewButton: ViewButton,
//         redirect: redirect,
//       },
//       defaultColDef: {
//         flex: 1,
//         minWidth: 100,
//       },
//       rowSelection: "single",
//       rowData: [],
//     };
//   }

//   onSelectionChanged = () => {
//     var selectedRows = this.gridApi.getSelectedRows();
//     // this.props.history.push(
//     //   "/EditPatient?.Patient=" + selectedRows[0].nationalID
//     // );
//   };

//   componentDidMount() {
//     fetch("https://cloudclinicapi.azurewebsites.net/api/patient")
//       .then((result) => result.json())
//       .then((rowData) => this.setState({ rowData }));
//   }

//   render() {
//     console.log(this.state.items);
//     const { error, isLoaded, items } = this.state;
//     return (
//       <div
//         style={{ height: "60.00vh", width: "100%" }}
//         className="ag-theme-material"
//       >
//         <h4>Patients</h4>
//         <AgGridReact
//           onGridReady={(params) => (this.gridApi = params.api)}
//           columnDefs={this.state.columnDefs}
//           rowData={this.state.rowData}
//           rowSelection={this.state.rowSelection}
//           onSelectionChanged={this.onSelectionChanged.bind(this)}
//           frameworkComponents={this.state.frameworkComponents}
//         ></AgGridReact>
//       </div>
//     );
//   }
// }

// function ViewButton() {
//   function redirect(e) {
//     e.stopPropagation();
//     console.log("mmm");
//   }
//   return (
//     <Button style={{ width: "100%" }} onClick={redirect}>
//       view
//     </Button>
//   );
// }

// function redirect(props) {
//   function redirect(e) {
//     e.stopPropagation();
//     console.log("mmm");
//   }
//   return (
//     <Button style={{ width: "100%" }} onClick={redirect}>
//       view
//     </Button>
//   );
// }

import React, { useEffect, useState, createRef } from "react";
import MUIDataTable from "mui-datatables";
import { NavLink } from "react-router-dom";
import "./style.css";
import { Button } from "react-bootstrap";

export default class Patients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          label: "National Id",
          name: "patient_NationalID",
        },
        {
          label: "Token I.D",
          name: "id",
        },
        {
          label: "Title",
          name: "title",
        },

        {
          label: "Consultant I.D",
          name: "consultant_NationalID",
        },
        {
          label: "Start Date Time",
          name: "startDateTime",
          options: {
            customBodyRender: (val) => (
              <span>{new Date(val).toLocaleDateString()}</span>
            ),
          },
        },
        {
          label: "End Date Time",
          name: "endDateTime",
          options: {
            customBodyRender: (val) => (
              <span>{new Date(val).toLocaleDateString()}</span>
            ),
          },
        },

        {
          label: "View Documents",
          name: "id",
          options: {
            customBodyRender: (val) => (
              <NavLink
                className="viewButton"
                to={`/LabTest/visitLabTest/${val}`}
              >
                View Documents
              </NavLink>
              // <Button
              //   className="viewButton"
              //   onClick={() => alert("Uploading Image...")}
              // >
              //   View Documents
              // </Button>
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
  componentDidMount() {
    fetch(
      `https://cloudclinicapi.azurewebsites.net/api/patient/patientsVisits/${this.props.match.params.id}`
    )
      .then((result) => result.json())
      .then((rowData) => {
        if (typeof rowData == typeof "abc") {
          alert(rowData);
        } else {
          this.setState({ rowData });
          console.log("id of user",this.props.match.params.id)
        }
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
        <MUIDataTable
          title="Patient Visits"
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
