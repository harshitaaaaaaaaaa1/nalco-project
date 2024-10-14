import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Graph extends Component {
    render() {
        const options = {
            animationEnabled: true,
            title: {
                text: "Expenses: 2024"
            },
            axisX: {
                valueFormatString: "MMM"
            },
            axisY: {
                title: "Sales (in INR)",
                prefix: "₹"
            },
            height: 350,
            data: [{
                yValueFormatString: "$#,###",
                xValueFormatString: "MMMM",
                type: "spline",
                dataPoints: [
                    { x: new Date(2024, 0), y: 25060 },
                    { x: new Date(2024, 1), y: 27980 },
                    { x: new Date(2024, 2), y: 42800 },
                    { x: new Date(2024, 3), y: 32400 },
                    { x: new Date(2024, 4), y: 35260 },
                    { x: new Date(2024, 5), y: 33900 },
                    { x: new Date(2024, 6), y: 40000 },
                    // { x: new Date(2017, 7), y: 52500 },
                    // { x: new Date(2017, 8), y: 32300 },
                    // { x: new Date(2017, 9), y: 42000 },
                    // { x: new Date(2017, 10), y: 37160 },
                    // { x: new Date(2017, 11), y: 38400 }
                ]
            }]
        }
        return (
            <div>
                <CanvasJSChart options={options}
                />
            </div>
        );
    }
}
export default Graph;  