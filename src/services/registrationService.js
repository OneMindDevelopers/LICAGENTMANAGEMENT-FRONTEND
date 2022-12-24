import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.baseUrl + "registration";

export function register(user) {
  return http.post(apiEndpoint, user);
}
