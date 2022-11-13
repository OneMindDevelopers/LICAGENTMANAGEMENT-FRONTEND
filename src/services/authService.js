import http from './httpService';
import jwtDecode from 'jwt-decode';
import config from '../config.json';
const apiEndpoint = config.baseUrl + 'login';

const apiKey = "token";

export async function login(email, password) {
    const { data: jwt } = await http.post(apiEndpoint, {
        email, password
    })
    localStorage.setItem(apiKey, jwt);
}

http.setJwt(getJwtToken());

export function logout() {
    localStorage.removeItem(apiKey);
}

export function loginWithJwt(jwt) {
    localStorage.setItem(apiKey, jwt);
}

export function getCurrentUser() {
    try {
        const token = localStorage.getItem(apiKey);
        return jwtDecode(token);
    } catch (ex) {
        return null;
    }
}

export function getJwtToken() {
    return localStorage.getItem(apiKey);
}

const obj = {
    login,
    logout,
    getCurrentUser,
    loginWithJwt,
    getJwtToken
}

export default obj;