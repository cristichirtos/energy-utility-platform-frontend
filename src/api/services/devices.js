import { AuthHeader, HTTP } from "../http";
import { getCurrentUser } from "../../app/store";

export async function AllDevicesForCurrentUser() {
  const role = getCurrentUser().role.toLowerCase();
  const response = await HTTP.get(`${role}/devices`,
  {headers: AuthHeader() });

  return response.data;
}
