import axios from "axios";

const BASE_URL = "http://54.180.122.20:3000"
const tokenInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
  }
});

export default tokenInstance;
