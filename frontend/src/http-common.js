import axios from "axios"

const port = "3000";
export const BASE_URL = process.env.REACT_APP_CODESANDBOX === 'true'
    ? `https://vc6ymm-${port}.csb.app/`
    : `http://localhost:${port}/`;

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-type": "application/json",
    }
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-type": "application/json",
},
withCredentials: true
});