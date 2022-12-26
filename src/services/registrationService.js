import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.baseUrl;

export function register(user) {
  return http.post(apiEndpoint + "registration", user);
}

export function forgotPassword(user) {
  return http.post(apiEndpoint + "forgotPassword", user);
}
