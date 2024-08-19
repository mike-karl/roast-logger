import axios from "axios";
const API_URL = "http://localhost:5000/"
const register =  (first_name, last_name, email, password) => {
    return axios.post(API_URL + "register", {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
    })
}
const login = (email, password) => {
    return axios.post(API_URL + "auth", {
        email: email,
        password: password,
    })
    .then((response) => {
        if (response.data.email) {
            localStorage.setItem("user", JSON.stringify(response.data))
        }
        return response.data
    })
}
const logout = () => {
    localStorage.removeItem("user")
    return axios.post(API_URL + "logout",).then((response) => {
        return response.data
    })
}
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"))
}
const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
}
export default AuthService