import { AuthHeader, HTTP } from "../http";
import { setCurrentUser, getCurrentUser } from "../../app/store";

export async function DeviceById(id) {
  try {
    const response = await HTTP.get(`devices/${id}`, {headers: AuthHeader() });
    return response.data;
  } catch(error) {
    if (error.response.status === 401) {
      setCurrentUser(null);
    }
  }

  return null;
}

export async function AllDevicesForCurrentUser() {
  const role = getCurrentUser().role.toLowerCase();

  try {
    const response = await HTTP.get(`${role}/devices`, {headers: AuthHeader() });
    return response.data;
  } catch(error) {
    if (error.response.status === 401) {
      setCurrentUser(null);
    }
  }

  return null;
}

export async function Create(device) {
  try {
    const response = await HTTP.post('devices/', device, {headers: AuthHeader() });
    return response.data;
  } catch(error) {
    if (error.response.status === 401) {
      setCurrentUser(null);
    }
  }

  return null;
} 

export async function UpdateDevice(device) {
  try {
    const response = await HTTP.patch(`devices/${device.id}`, device, {headers: AuthHeader() });
    return response.data;
  } catch(error) {
    if (error.response.status === 401) {
      setCurrentUser(null);
    }
  }

  return null;
}

export async function DestroyDeviceById(id) {
  try {
    const response = await HTTP.delete(`devices/${id}`, {headers: AuthHeader() });
    return response.data;
  } catch(error) {
    if (error.response.status === 401) {
      setCurrentUser(null);
    }
  }

  return null;
}
