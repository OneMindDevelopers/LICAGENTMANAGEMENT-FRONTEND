import http from './httpService';
const apiEndpoint = 'http://localhost:5200/api/users';

export function register(user) {
    return http.post(apiEndpoint,user);
}