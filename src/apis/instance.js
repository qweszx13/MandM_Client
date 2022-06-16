import axios from "axios";

const BASE_URL = "http://54.180.122.20:3000"
const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: false
});

export default instance;