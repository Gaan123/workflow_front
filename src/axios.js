import axios from "axios";

const axiosInstance = axios.create({
    
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
    },
    baseURL: 'https://127.0.0.1:8000/api'
});
const authAxios=axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('userToken')}`;
const authheader = { headers: { Authorization: 'Bearer ' + localStorage.getItem('userToken') } };
export { axiosInstance,authAxios,authheader };