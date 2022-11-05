import { BASE_URL, HTTP } from "../http";
import { setCurrentUser } from "../../app/store";

export async function AuthLogin(data) {
  const response = await HTTP.post("/login", data);
  if (response.data.access_token) {
    setCurrentUser(response.data)
  }

  return response.data.role;
}

export function AuthLogout() {
  setCurrentUser(null);
}

export async function AuthRegister(data) {
  const response = await HTTP.post(BASE_URL + "/users", data);
  return response.data
}
