import axios from "axios";

const BaseURL = axios.create({ baseURL: "http://127.0.0.1:8000/api/v1" });
export default BaseURL;
