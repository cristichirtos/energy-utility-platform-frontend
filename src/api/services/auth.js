import { BASE_URL, HTTP, AuthHeader } from "../http";
import { setCurrentUser } from "../../app/store";

export async function AuthLogin(data) {
  try {
    const response = await HTTP.post("/login", data);
    setCurrentUser(response.data);

    return response.data.role;
  } catch(error) {
    if (error.response.status === 401) {
      setCurrentUser(null);
    }
  }

  return null;
}

export async function AuthLogout() {
  try {
    await HTTP.delete("/logout", {headers: AuthHeader() })
      .then(() => setCurrentUser(null));
    return true;
  } catch(error) {
    if (error.response.status === 401) {
      setCurrentUser(null);
    }
  }

  return false;
}

export async function AuthRegister(data) {
  try {
    const response = await HTTP.post(BASE_URL + "/users", data);
    setCurrentUser(response.data);

    return response.data;
  } catch(error) {
    if (error.response.status === 401) {
      setCurrentUser(null);
    }
  }

  return null;
}
