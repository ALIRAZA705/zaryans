import React, { lazy, useEffect, useState, createRef } from "react";

import "./styles.css";
import {
    CWidgetDropdown,
    CRow,
    CCol,
    CDropdown,
    CDropdownMenu,
    CDropdownItem,
    CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple'
import MainChartExample from "../charts/MainChartExample.js";
import Button from 'react-bootstrap/Button';
const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));
export default class Receptionists extends React.Component {
    constructor(props) {
        super(props);
        this.gotoPatients = this.gotoPatients.bind(this);
    }


    gotoPatients() {
        let path = 'patients?Patients=';
        this.props.history.push(path);
    }

    render() {

        return (

            <div style={{
                position: "relative", padding: "40px", width: "100%", height: "75vh", overflow: "auto"
            }}>
                <div class="row">
                    <div class="col-sm-5" style={{
                        position: "relative", background: "red", height: "30vh", padding: "20px", border: '1px solid black', borderRadius: '5px!important', textAlign: "center"
                    }}><Button variant="primary">Consultants</Button></div>
                    <div class="col-sm-2"></div>
                    <div class="col-sm-5" style={{ position: "relative", background: "blue", height: "30vh", padding: "20px", border: '1px solid black', borderRadius: '5px!important', textAlign: "center" }}> <Button onClick={this.gotoPatients} variant="danger">Patients</Button></div>
                </div>

                <div class="row" style={{ height: "5vh" }}></div>
                <div class="row">
                    <div class="col-sm-5" style={{ position: "relative", background: "green", height: "30vh", padding: "20px", border: '1px solid black', borderRadius: '5px!important', textAlign: "center" }}><Button variant="warning">Visits</Button></div>
                    <div class="col-sm-2"></div>
                    <div class="col-sm-5" style={{ position: "relative", background: "yellow", height: "30vh", padding: "20px", border: '1px solid black', borderRadius: '5px!important', textAlign: "center" }}> <Button variant="success">Meeting</Button></div>
                </div>
            </div>

        );
    }
}
