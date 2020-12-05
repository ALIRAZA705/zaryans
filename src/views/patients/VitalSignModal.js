import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ApexCharts from 'apexcharts';
import Chart from "react-apexcharts";
import $ from 'jquery';
var dataPoints = [];

var options = {
    theme: "light2",
    title: {
        text: "Live Chart from JSON Data"
    },
    data: [{
        type: "spline",
        dataPoints: dataPoints
    }]
};

$("#chartContainer").CanvasJSChart(options);
updateData();

// Initial Values
var xValue = 0;
var yValue = 10;
var newDataCount = 6;

function addData(data) {
    if (newDataCount != 1) {
        $.each(data, function (key, value) {
            dataPoints.push({ x: value[0], y: parseInt(value[1]) });
            xValue++;
            yValue = parseInt(value[1]);
        });
        newDataCount = 1;
    } else {
        //dataPoints.shift();
        dataPoints.push({ x: data[0][0], y: parseInt(data[0][1]) });
        xValue++;
        yValue = parseInt(data[0][1]);
    }
    $("#chartContainer").CanvasJSChart().render();
    setTimeout(updateData, 1500);
}

function updateData() {
    $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=" + xValue + "&ystart=" + yValue + "&length=" + newDataCount + "type=json", addData);
}

export class VitalSignModal extends Component {
    constructor(props) {
        super(props);


        this.state = {
            options: {
                chart: {
                    id: "basic-line"
                },
                xaxis: {
                    categories: [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 100]
                }
            },
            series: [
                {
                    name: "series-1",
                    data: [3.70913, 4.007597, 4.498711, 5.236739, 5.510786, 5.510786, 5.510786, 5.505359, 5.508072, 5.508072, 5.510786, 3.559897, -0.010853, -3.04165, -4.865012, -5.185185, -4.067291, -1.931895, 0.569801, , 3.70913, 4.007597, 4.498711, 5.236739, 5.510786, 5.510786, 5.510786, 5.505359, 5.508072, 5.508072, 5.510786, 3.559897, -0.010853, -3.04165, -4.865012, -5.185185, -4.067291, -1.931895, 0.569801, , 3.70913, 4.007597, 4.498711, 5.236739, 5.510786, 5.510786, 5.510786, 5.505359, 5.508072, 5.508072, 5.510786, 3.559897, -0.010853, -3.04165, -4.865012, -5.185185, -4.067291]
                }
            ]
        };



    }






    render() {
        return (
            <Modal

                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header style={{
                    background: "#1C2833"
                }} closeButton>
                    <Modal.Title style={{
                        color: "#8BFF00",
                        background: "#1C2833"

                    }} id="contained-modal-title-vcenter">
                        Live ECG
        </Modal.Title>
                </Modal.Header >
                <Modal.Body style={{
                    background: "#1C2833"
                }}>
                    <div style={{
                        position: "relative", background: "#1C2833", padding: "15px", width: "100%", overflow: "auto",
                        height: "auto", border: "10px solid #979A9A", borderradius: "10px"
                    }}
                    // style={{
                    //     background: "#1C2833"

                    //     ,
                    //     padding: "15px",
                    //     width: "100%",
                    //     height: "50vh",
                    //     border: "10px solid #979A9A  ",
                    //     borderRadius: '10px'

                    // }}
                    >
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="line"
                            width="700"

                        />
                    </div>
                </Modal.Body>

            </Modal>
        );
    }
}