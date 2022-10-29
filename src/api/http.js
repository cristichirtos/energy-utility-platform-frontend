import axios from "axios";
import store from "../app/store";
export const BASE_URL = "http://localhost:3000";
export const HTTP = axios.create({
  baseURL: BASE_URL,
});

export function encodeParams(p) {
  const queryParamsObject = {};
  for (const key of Object.keys(p)) {
    const filterItem = p[key];
    queryParamsObject[key] = filterItem.toString();
  }
  return queryParamsObject;
}

export function AuthHeader() {
  const user = store.getState().currentUser;

  if (user && user.access_token) {
    return { ACCESS_TOKEN: user.access_token };
  } else {
    return {};
  }
}
