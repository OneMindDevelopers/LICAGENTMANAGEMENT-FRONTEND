import http from './httpService';

const apiEndpoint = "http://localhost:5200/api/genres";

export function getGenres() {
    return http.get(apiEndpoint);
}