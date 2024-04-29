// -------------------------------------------------------------Imports-------------------------------------------------------------
import React, { useState } from "react";
import { useEffect } from "react";
import { instance } from "../../services/axiosInterceptor";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJs,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import PageLoader from "../../common/Loaders/PageLoader/PageLoader";
// ---------------------------------------------------------------------------------------------------------------------------------

// ChartJs.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

const DataChart = () => {
  // -------------------------------------------------------------States-------------------------------------------------------------
  const [chartData, setChartData] = useState([]);

  const [combinedData, setCombinedData] = useState({});

  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [
      // label: "y-axis",
      // data: y,
      // borderColor: "rgb(75,192,192)"
    ],
  });
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
      console.error(error.message);
    }
  };

  // fetchYData -- function to call the api that fetches the y axis data
  const fetchYData = async () => {
    try {
      let { data } = await instance.get("/o5zMs5/data");
      return data;
    } catch (error) {
      console.error(error.message);
    }
  };
  // ---------------------------------------------------------------------------------------------------------------------------------
  // -------------------------------------------------------------useEffects-------------------------------------------------------------

  useEffect(() => {
    if (Array.isArray(chartData) && chartData.length > 0) {
      let [xData, yData] = chartData;

      xData.sort((a, b) => {
        return a.id - b.id;
      });
      yData.sort((a, b) => {
        return a.id - b.id;
      });

      let combinedArray = [];

      for (let i = 0; i < 50; i++) {
        combinedArray.push({
          Label: xData[i]?.id,
          xData: xData[i]?.RandomNumber,
          yData: yData[i]?.RandomNumber,
        });
      }
      setCombinedData(combinedArray);
    }
  }, [chartData]);

  useEffect(() => {
    const data = Promise.all([fetchXData(), fetchYData()])
      .then((data) => setChartData(data))
      .catch((err) => console.error(err.message));
  }, []);

  // ---------------------------------------------------------------------------------------------------------------------------------
  return chartData.length === 0 ? (
    <div className="min-h-[500px] h-[60vh] w-[100%] flex items-center justify-center">
      <PageLoader />
    </div>
  ) : (
    <div className="min-h-[500px]">
      <div className="overflow-x-scroll">
        <LineChart width={1500} height={550} data={combinedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Label" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="xData"
            stroke="#8884d8"
            name="X Data"
          />
          <Line
            type="monotone"
            dataKey="yData"
            stroke="#82ca9d"
            name="Y Data"
          />
        </LineChart>
      </div>
    </div>
  );
};

export default DataChart;
