import axios from "axios";
export default function interceptor(){
    const baseURL = "http://127.0.0.1:8000/api/user";
let headers = {};
if (localStorage.getItem('token')) {
    headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
}
const axiosInstance = axios.create({
    baseURL: baseURL,
    headers,
})
axiosInstance.interceptors.response.use(
    (response) =>
        new Promise((resolve, reject) => {
            resolve(response);
        }), (error) => {
            if (!error.response) {
                return new Promise((resolve, reject) => {
                    reject(error);
                });

            }
            if (error.response.status === 403) {
                localStorage.setItem('token', '');
                window.location = "/"
            } else {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        }
);
}