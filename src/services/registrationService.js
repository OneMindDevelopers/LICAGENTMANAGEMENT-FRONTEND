import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.baseUrl;
const agentEndpoint = config.agentUrl;

export function register(user) {
  return http.post(apiEndpoint + "registration", user);
}

export function agentRegistration(user) {
  return http.post(agentEndpoint + "registration", user);
}

export function getAgentRegistration(user) {
  return http.get(agentEndpoint + "getAgents");
}

export function forgotPassword(user) {
  return http.post(apiEndpoint + "forgotPassword", user);
}

export function getUsers() {
  return http.get(apiEndpoint + "getUsers");
}
