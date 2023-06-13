import axios from 'axios';


axios.interceptors.response.use(null, error => {
    const expectedErrors = error.response && error.response.status >= 400 && error.response.status <= 500;
    if (!expectedErrors) {
        alert('Unexpected Errors');
    } 

    return Promise.reject(error);
})

function setJwt(jwt) {
    axios.defaults.headers.common['x-auth-token'] = jwt;
}

const obj = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt
}

export default obj