import React from 'react'
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DeviceById } from "../../api/services/devices";
import EditDevice from '../../components/admin/EditDevice';

const Device = () => {
  const location = useLocation();
  const [device, setDevice] = useState({});

  useEffect(() => {
    async function fetchData() {
      setDevice(await DeviceById(location.state.deviceId));
    }
    fetchData();
  }, [location.state.deviceId]);

  return (
    <div>
      <EditDevice device={device}></EditDevice>
    </div>
  )
}

export default Device
