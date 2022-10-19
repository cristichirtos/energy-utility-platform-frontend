import { BASE_URL, HTTP } from "../http";
import store from "../../app/store";
import { signIn, signOut } from "../../actions/auth";

export async function AuthLogin(data) {
  const response = await HTTP.post("/login", data);
  if (response.data.access_token) {
    // response.data.role = response.data.role.substring(
    //   1,
    //   response.data.role.length - 1
    // );
    store.dispatch(signIn(response.data));
  }
  return response.data.role;
}

export function AuthLogout() {
  store.dispatch(signOut());
}

export async function AuthRegister(data) {
  const response = await HTTP.post(BASE_URL + "/users", data);
  return response.data
}
