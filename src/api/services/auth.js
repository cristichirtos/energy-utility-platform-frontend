import { BASE_URL, HTTP } from "../http";
import store from "../../app/store";
import axios from "axios"
import { signIn, signOut } from "../../actions/auth";

export async function AuthLogin(data) {
  // First trial
  axios.create({headers: {"Access-Control-Allow-Origin": "*"}}).post("http://localhost:3000/login");
  // Second trial
  //axios.post("http://localhost:3000/login");
  
  // This is the call that will be done, once axios works properly
  // const response = await HTTP.post("/login", data: data);
  // if (response.data.access_token) {
  //   // response.data.role = response.data.role.substring(
  //   //   1,
  //   //   response.data.role.length - 1
  //   // );
  //   store.dispatch(signIn(response.data));
  // }
  // return response.data.role;
}

export function AuthLogout() {
  store.dispatch(signOut());
}

export async function AuthRegister(data) {
  const response = await HTTP.post(BASE_URL + "/users", data);
  return response.data
}
