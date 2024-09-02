import axios from "axios";

const baseUrl = import.meta.env.VITE_API_KEY;

// LOGIN USER
export const loginUser = (userData) => {
    return axios.post(`${baseUrl}/auth/login`, userData, { withCredentials: true });
}

// REGISTER USER
export const registerUser = (userData) => {
    return axios.post(`${baseUrl}/auth/register`, userData, { withCredentials: true });
}

// LOGOUT USER
export const logoutUser = () => {
    return axios.get(`${baseUrl}/auth/logout`, { withCredentials: true });
}

// USER PROFILE
export const userProfile = () => {
    return axios.get(`${baseUrl}/auth/profile`, { withCredentials: true });
}
