import axios from "axios";

const api = axios.create({
  baseURL: "https://museum-production-fa64.up.railway.app",
});

export default api;