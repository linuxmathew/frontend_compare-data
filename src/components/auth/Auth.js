import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "locahost:3001",
});

export default AxiosInstance;
