import React, { useEffect, useState, createRef } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CPagination
} from '@coreui/react';

export default class VitalSigns extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [{
                headerName: "National Id", field: "patient_NationalID", sortable: true, filter: true
            }, {
                headerName: "VitalSign Id", field: "vitalSignID", sortable: true, filter: true
            }],
            defaultColDef: {
                flex: 1,
                minWidth: 100,
            },
            rowSelection: 'single',
            rowData: [],

        };
    }

    onSelectionChanged = () => {
        var selectedRows = this.gridApi.getSelectedRows();
        this.props.history.push('/EditVitalSign?VitalSign=' + selectedRows[0].vitalSignID);
    }

    componentDidMount() {
        fetch('https://cloudclinicapi.azurewebsites.net/api/vitalsign')
            .then(result => result.json())
            .then(rowData => this.setState({ rowData }))
    }

    render() {
        console.log("Items", this.state.items);


        const { error, isLoaded, items, rowData } = this.state;
        console.log("Row Data", rowData)
        return (
            <div style={{ height: '60.00vh', width: '100%' }} className="ag-theme-material">
                <h4>VitalSigns</h4>

                <AgGridReact

                    onGridReady={params => this.gridApi = params.api}
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}
                    rowSelection={this.state.rowSelection}
                    onSelectionChanged={this.onSelectionChanged.bind(this)}>
                </AgGridReact>

            </div>
        );
    }
}