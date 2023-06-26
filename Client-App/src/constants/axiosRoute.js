import axios from "axios";
export const url = import.meta.env.VITE_BACKEND_URL;
const axiosWithBaseURL = axios.create({
  baseURL: url,
});

export default axiosWithBaseURL;
