import React from 'react'
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { DeviceById } from "../../api/services/devices";
import Chart from "react-apexcharts";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const ClientDevice = () => {
  const location = useLocation();
  const [device, setDevice] = useState({});
  const [chartData, setChartData] = useState([]);
  const [date, setDate] = useState(new Date());

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
      const entries = deviceData.energy_consumption_entries.filter(entry => entry.timestamp.slice(0, 10) == date.toISOString().slice(0, 10))
      setChartData(entries.map(entry => entry.value));
    }
    fetchData();
  }, [location.state.deviceId]);

  function filterEntries(date) {
    const entries = device.energy_consumption_entries.filter(entry => entry.timestamp.slice(0, 10) == date.toISOString().slice(0, 10))
    setChartData(entries.map(entry => entry.value));
    setDate(date);
  }

  return (
    <div>
      {`Select a date to display the consumption chart for device with description "${device.description}"`}
      <DatePicker selected={date} onChange={(date) => filterEntries(date) } />
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="line"
        width='70%'
      />
    </div>
  )
}

export default ClientDevice
