import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://company-data.onrender.com",
});

export default AxiosInstance;
