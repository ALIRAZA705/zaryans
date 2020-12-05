import React, { useEffect, useState, createRef } from "react";
import { AgGridReact } from "ag-grid-react";
import $ from "jquery";

import "./styles.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import "./styles.css";
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { VitalSignModal } from './VitalSignModal';
import { relativeTimeRounding } from "moment";


export default class EditVitalSign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addModalShow: false,
            vitalSignID: '',
            bpm: '',
            patient_NationalID: '',
            dateTime1: '',
            no: '',
            ecg: '',
            hr: '',
            qrs: '',
            qt: '',
            qtc: '',
            nibP1: '',
            nibP2: '',
            manual1: '',
            manual2: '',
            mmHG1: '',
            mmHG2: '',
            bpm: '',
            weight: '',
            height: '',
            spO2: '',
            pr: '',
            resP1: '',
            resP2: '',
            temp: '',
            sys: '',
            dia: '',
            ma: '',
            dateTime2: '',


            showMe: true,
            showECG: false,

            rowSelection: "single",
            rowData: [],




        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {

        const target = event.target;
        const value = target.value;
        const id = target.id;

        this.setState({
            [id]: value
        });
    }

    componentDidMount() {


        const queryString = require('query-string');
        var parsed = queryString.parse(this.props.location.search);
        console.log(this.state);
        fetch("https://cloudclinicapi.azurewebsites.net/api/vitalsign/" + parsed.VitalSign)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        vitalSignID: result.vitalSignID,
                        bpm: result.bpm,
                        patient_NationalID: result.patient_NationalID,
                        dateTime1: result.dateTime1,
                        no: result.no,
                        ecg: result.ecg,
                        hr: result.hr,
                        qrs: result.qrs,
                        qt: result.qt,
                        qtc: result.qtc,
                        nibP1: result.nibP1,
                        nibP2: result.nibP2,
                        manual1: result.manual1,
                        manual2: result.manual2,
                        mmHG1: result.mmHG1,
                        mmHG2: result.mmHG2,
                        bpm: result.bpm,
                        weight: result.weight,
                        height: result.height,
                        spO2: result.spO2,
                        pr: result.pr,
                        resP1: result.resP1,
                        resP2: result.resP2,
                        temp: result.temp,
                        sys: result.sys,
                        dia: result.dia,
                        ma: result.ma,
                        dateTime2: result.dateTime2,

                        //     nationalID: result.nationalID,
                        //     name: result.name,
                        //     address: result.address,
                        //    dob: new Date(result.dob).toLocaleDateString('en-US'),
                        //    gender: result.gender,
                        //    phone: result.phone,
                        //    guardianName: result.guardianName,
                        //    guardianPhone: result.guardianPhone,
                        isDeleted: false
                    });

                },
                (error) => {
                    this.setState({

                    });
                }
            )
    }
    handleSubmit(event) {

        fetch('https://cloudclinicapi.azurewebsites.net/api/vitalsign/12345678', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        }).then(response => response.json())
            .then(status => console.log(status))
            .catch(() => console.log("Can’t access response. Blocked by browser?"));
    }


    onDeleteVitalSign = () => {

        this.setState({
            IsDeleted: true
        });
    }

    operation() {
        this.setState({
            showMe: !this.state.showMe,
            showECG: !this.state.showECG,
        });
    }


    render() {
        let addModalClose = () => this.setState({ addModalShow: false });
        console.log("ECG", this.state.ecg);

        console.log(this.state.items);
        console.log(this.state.vitalSignID);
        return (
            <div style={{
                position: "relative", background: "#1C2833", padding: "15px", width: "45%", overflow: "auto",
                height: "47vh", borderradius: "15px", border: "10px solid #979A9A  ",
                borderRadius: '10px'
            }}>
                <table style={{
                    width: "100%", cellspacing: "0"
                }}>
                    <tbody>
                        <tr>
                            <td className="lblLI">
                                No.
            </td>
                            <td className="lblSw">
                                10
            </td>
                            <td className="lblLI">
                                ADU:
            </td>
                            <td className="lblSw">
                                123
            </td>
                            <td className="lblLI">
                                Gender:
            </td>
                            <td className="lblSw">
                                Male
            </td>

                            <td>
                                &nbsp;
            </td>
                            <td>
                                &nbsp;</td>
                            <td>
                                &nbsp;</td>
                            <td colSpan={3} className="lblSw">
                                2020-10-24T17:09:00
            </td>
                            <td><Button>✍</Button></td>
                        </tr>
                        <tr>
                            <td className="lblM">ECG:</td>   <td>
                                &nbsp;
            </td>
                            <td className="lblM">
                                &nbsp;
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td></td>
                            <td className="lblMic">

                            </td>

                            <td><tr>
                                <td className="lblM">
                                    Weight KG
            </td>
                            </tr>
                                <tr>
                                    <td className="lblM">
                                        {this.state.weight}
                                    </td>
                                </tr>
                            </td>
                            <td></td>
                            <td><tr>
                                <td className="lblM">
                                    Height M
            </td>
                            </tr>
                                <tr>
                                    <td className="lblM">
                                        {this.state.height}
                                    </td>
                                </tr>
                            </td>
                            <td colSpan={2}>
                                &nbsp;
            </td>
                        </tr>

                        <tr>
                            <td>
                                &nbsp;
            </td>
                            <td className="lblM">
                                HR
            </td>
                            <td></td>
                            <td className="lblM">
                                QRS
            </td>  <td>
                                &nbsp;
            </td>


                            <td> <ButtonToolbar>
                                <Button onClick={() => this.setState({ addModalShow: true })}>▶️
                                    </Button>
                                <VitalSignModal
                                    show={this.state.addModalShow}
                                    onHide={addModalClose} />
                            </ButtonToolbar></td>
                            <td rowSpan={2}>
                                <tr>
                                    <td className="lblMic">bpm</td>
                                </tr>
                                <tr>
                                    <td className="lblLg" >75</td>
                                &nbsp;
                                </tr>
                            </td>
                            <td>
                                &nbsp;
            </td>

                            <td colSpan={3}>
                                &nbsp;
            </td>
                        </tr>
                        <tr>
                            <td>
                                &nbsp;
            </td>
                            <td className="lblM">
                                12.2
            </td>
                            <td>

                            </td>
                            <td className="lblM">
                                12.1
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td className="lblM">
                                SP02
            </td>
                            <td rowSpan={3} className="lblLg2">
                                94
                                &nbsp;
            </td>
                            <td className="lblM">
                                PR
            </td>
                            <td rowSpan={3} className="lblLg2">

                                34
            </td>
                        </tr>
                        <tr>
                            <td>
                                &nbsp;
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td></td>
                            <td className="lblS">
                                100
            </td>
                            <td className="lblS">
                                150
            </td>
                        </tr>
                        <tr>
                            <td>
                                &nbsp;
            </td>
                            <td className="lblM">
                                QT
            </td>
                            <td></td>

                            <td className="lblM">
                                QTC
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td className="lblS">
                                90
            </td>
                            <td className="lblS">
                                50
            </td>
                        </tr>
                        <tr>
                            <td>
                                &nbsp;
            </td>
                            <td className="lblM">
                                11.1
            </td>
                            <td>

                            </td>
                            <td className="lblM">
                                12.3
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td>
                                &nbsp;</td>
                            <td>
                                &nbsp;
            </td>

                            <td colSpan={3}>
                                &nbsp;
            </td>
                        </tr>
                        <tr>
                            <td colSpan={6} className="lblM" style={{ textAlign: "center" }}>
                                Regular ECG Rhythm
            </td>

                            <td className="lblLgl" rowSpan={2}>
                                <tr>RESP</tr>
                                <tr>30</tr>
                                <tr>8</tr>
                            </td>
                            <td rowSpan={2} className="lblLg">
                                43
            </td>
                            <td>
                                <tr>
                                    <td className="lblS" style={{ textAlign: "center" }}>
                                        &nbsp; Temp °C</td></tr>
                                <tr>
                                    <td rowSpan={2} className="lblLg2" style={{ textAlign: "center" }}>
                                        67
            </td>
                                </tr>
                            </td>
                            <td colSpan={3}>
                                &nbsp;
            </td>
                        </tr>
                        <tr>

                            <td>
                                &nbsp;
            </td>
                            <td colSpan={3}>
                                &nbsp;
            </td>
                        </tr>
                        <tr>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                        </tr>
                        <tr>
                            <td className="lblM">
                                NIBP
            </td>
                            <td colSpan={3} className="lblM" style={{ textAlign: "center" }}>
                                MANUAL
            </td>
                            <td className="lblS">
                                0.00
            </td>
                            <td className="lblM">
                                mmHG
            </td>
                            <td>
                                &nbsp;
            </td>

                            <td className="lblM">

                            </td>
                            <td className="lblM">
                                SYS
            </td>
                            <td className="lblM">
                                DIA
            </td>
                            <td className="lblM">
                                MAP
            </td>

                        </tr>
                        <tr>
                            <td>
                                <tr>
                                    <td className="lblS">
                                        NS
            </td></tr>
                                <tr>
                                    <td className="lblS">
                                        160
            </td></tr><tr>
                                    <td className="lblS">
                                        93
            </td></tr>

                            </td>
                            <td colSpan={3} rowSpan={2} className="lblLg2" style={{ textAlign: "center" }}>
                                120/100
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td><tr><td className="lblM">
                                Time
            </td>
                            </tr>
                                <tr>            <td className="lblS">
                                    2020-10-24T17:09:00
            </td>
                                </tr>
                            </td>
                            <td className="lblS">
                                &nbsp;
            </td>

                            <td className="lblM">

                            </td>

                            <td className="lblS">
                                120
            </td>
                            <td className="lblS">
                                100
            </td>
                            <td className="lblS">
                                10
            </td>

                        </tr>
                        <tr>

                            <td>
                                &nbsp;
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td colSpan={3}>
                                &nbsp;
            </td>
                        </tr>
                        <tr>

                            <td>
                                &nbsp;
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td>
                                &nbsp;
            </td>
                            <td colSpan={3}>
                                &nbsp;
            </td>
                        </tr>
                    </tbody>
                </table>
            </div >
        );
    }
}
