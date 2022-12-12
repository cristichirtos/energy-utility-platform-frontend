import axios from "axios";
import { getCurrentUser } from "../app/store";

export const BASE_URL = "https://energy-utility-plaform.herokuapp.com";
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
  const user = getCurrentUser();

  if (user && user.access_token) {
    return { 'ACCESS_TOKEN': user.access_token };
  } else {
    return {};
  }
}
