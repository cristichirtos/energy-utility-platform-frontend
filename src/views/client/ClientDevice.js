import React from 'react'
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DeviceById } from "../../api/services/devices";
import Chart from "react-apexcharts";

const ClientDevice = () => {
  const location = useLocation();
  const [device, setDevice] = useState({});
  const [chartData, setChartData] = useState([]);
  const chartOptions = {
    chart: {
      id: "energy-consumption-chart"
    },
    xaxis: {
      categories: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00',
      '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00',
      '23:00']
    }
  }
  const chartSeries = [
    { name: 'consumption', data: chartData }
  ]

  useEffect(() => {
    async function fetchData() {
      const deviceData = await DeviceById(location.state.deviceId);
      setDevice(deviceData);
      setChartData(deviceData.energy_consumption_entries.map(entry => entry.value));
    }
    fetchData();
  }, [location.state.deviceId]);

  return (
    <div>
      {`Device with description "${device.description}" consumption chart:`}
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="line"
        width='80%'
      />
    </div>
  )
}

export default ClientDevice
