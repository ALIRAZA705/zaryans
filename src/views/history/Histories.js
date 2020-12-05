// import React, { useEffect, useState, createRef } from 'react'
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-material.css';
// export default class Histories extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       // error: null,
//       // isLoaded: false,
//       // items: []

//       columnDefs: [{
//         headerName: "Patient", field: "patient", sortable: true, filter: true
//       }, {
//         headerName: " Pain Level", field: "painScale", sortable: true, filter: true
//       }, {
//         headerName: "Current Medications", field: "currentMedications", sortable: true, filter: true
//       }, {
//         headerName: " Allergies", field: "allergies", sortable: true, filter: true
//       }, {
//         headerName: "Immunization", field: "immunization", sortable: true, filter: true
//       }]
//     };
//   }
//   onSelectionChanged = () => {
//     var selectedRows = this.gridApi.getSelectedRows();
//     this.props.history.push('/EditHistory?History=' + selectedRows[0].historyID);
//   }
//   componentDidMount() {



//     fetch('https://cloudclinicapi.azurewebsites.net/api/history')
//       .then(result => result.json())
//       .then(rowData => this.setState({ rowData }))

//   }


//   render() {
//     console.log("Items", this.state.items);
//     const { error, isLoaded, items, rowData } = this.state;
//     console.log("Row Data", rowData)
//     return (
//       <div style={{ height: '60.00vh', width: '100%' }} className="ag-theme-material">
//         <h4>Histories</h4>

//         <AgGridReact

//           onGridReady={params => this.gridApi = params.api}
//           columnDefs={this.state.columnDefs}
//           rowData={this.state.rowData}
//           rowSelection={this.state.rowSelection}
//           onSelectionChanged={this.onSelectionChanged.bind(this)}>
//         </AgGridReact>

//       </div>
//     );
//   }
// }
import React, { useEffect, useState, createRef } from "react";
import MUIDataTable from "mui-datatables";
import { NavLink } from "react-router-dom";
import "./style.css";

export default class Histories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          label: "Patient",
          name: "patient",
          sortable: true,
          filter: true,
        },
        {
          label: "Current Medications",
          name: "currentMedications",
          sortable: true,
          filter: true,
        },

        {
          label: "Allergies",
          name: "allergies",
          sortable: true,
          filter: true,
        },
        {
          label: "Immunization",
          name: "immunization",
          sortable: true,
          filter: true,
        },
        {
          label: "Childhood Illness",
          name: "childhoodillness",
          sortable: true,
          filter: true,
        }, {
          label: "Blood Transfusion",
          name: "bloodtransfusion",
          sortable: true,
          filter: true,
        }, {
          label: "Smoking",
          name: "smoking",
          sortable: true,
          filter: true,
        }, {
          label: "Drinking",
          name: "drinking",
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
    fetch("https://cloudclinicapi.azurewebsites.net/api/history")
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
          title="Histories"
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

