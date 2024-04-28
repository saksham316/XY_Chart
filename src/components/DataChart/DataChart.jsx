// -------------------------------------------------------------Imports-------------------------------------------------------------
import React, { useState } from 'react'
import { useEffect } from 'react'
import { instance } from '../../services/axiosInterceptor'
import { Line } from "react-chartjs-2"
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js"
// ---------------------------------------------------------------------------------------------------------------------------------

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const DataChart = () => {
    // -------------------------------------------------------------States-------------------------------------------------------------
    const [chartData, setChartData] = useState([]);

    const [lineChartData, setLineChartData] = useState({
        labels: [

        ],
        datasets: [

        ]
    })
    // ---------------------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------Hooks-------------------------------------------------------------
    // ---------------------------------------------------------------------------------------------------------------------------------
    // -----------------------------------------------------------Functions-------------------------------------------------------------

    // fetchXData -- function to call the api that fetches the x axis data
    const fetchXData = async () => {
        try {
            let { data } = await instance.get("/gDa8uC/data");
            return data;
        } catch (error) {
            console.error(error.message)
        }

    }

    // fetchYData -- function to call the api that fetches the y axis data
    const fetchYData = async () => {
        try {
            let { data } = await instance.get("/o5zMs5/data");
            return data;
        } catch (error) {
            console.error(error.message)
        }


    }
    // ---------------------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------useEffects-------------------------------------------------------------

    useEffect(() => {
        if (Array.isArray(chartData) && chartData.length > 0) {
            let [xData, yData] = chartData;

            let x = [];
            let y = []

            for (let i = 0; i < 50; i++) {
                x.push(xData[i]?.RandomNumber);
            }

            for (let i = 0; i < 50; i++) {
                y.push(yData[i]?.RandomNumber);
            }

            setLineChartData({
                "labels": x,
                datasets: [{
                    label: "y-axis",
                    data: y,
                    borderColor: "rgb(75,192,192)"
                }]
            })
        }
    }, [chartData])

    useEffect(() => {
        const data = Promise.all([fetchXData(), fetchYData()]).then((data) => setChartData(data)).catch((err) => console.error(err.message))

    }, [])


    // ---------------------------------------------------------------------------------------------------------------------------------
    return chartData.length === 0 ? <h1>Loading...</h1> : (
        <div>
            <Line data={lineChartData} />
        </div>
    )
}

export default DataChart
