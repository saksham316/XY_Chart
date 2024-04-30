// -------------------------------------------------------------Imports-------------------------------------------------------------
import React, { useState } from "react";
import { useEffect } from "react";
import { instance } from "../../services/axiosInterceptor";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter,
} from "recharts";
import PageLoader from "../../common/Loaders/PageLoader/PageLoader";
// ---------------------------------------------------------------------------------------------------------------------------------


const DataChart = () => {
  // -------------------------------------------------------------States-------------------------------------------------------------
  const [chartData, setChartData] = useState([]);

  const [combinedData, setCombinedData] = useState([]);

  const [xData, setXData] = useState([])
  const [yData, setYData] = useState([])


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

  // Function to transform data into a suitable format for Recharts
  const transformData = (x, y) => {
    let arr = [];
    for (let i = 0; i < 50; i++) {
      arr.push({
        x: x[i]?.RandomNumber,
        y: y[i]?.RandomNumber,
        labelX: x[i]?.Label,
        labelY: y[i]?.Label,
      })
    }
    return arr
  };

  // ---------------------------------------------------------------------------------------------------------------------------------
  // -------------------------------------------------------------useEffects-------------------------------------------------------------

  useEffect(() => {
    if (Array.isArray(chartData) && chartData.length > 0) {
      let [xData, yData] = chartData;


      const combinedData = transformData(xData, yData);
      setCombinedData(combinedData)
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
        {/* <LineChart width={1500} height={550} data={combinedData}>
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
        </LineChart> */}
        <ScatterChart
          width={1500}
          height={550}
          margin={{
            top: 20, right: 20, bottom: 20, left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="X" tickCount={30} domain={[0,1000]}/>
          <YAxis type="number" dataKey="y" name="Y" tickCount={30}/>
          <Tooltip />
          {combinedData?.map((point, index) => (
            <Scatter key={index} name={`(${point.labelX}, ${point.labelY})`} data={[point]} fill="#8884d8" />
          ))}
        </ScatterChart>
      </div>
    </div>
  );
};

export default DataChart;
