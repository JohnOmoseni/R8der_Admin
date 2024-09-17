import axios from "axios";

const api = axios.create({
	baseURL: "http://tripiee.com",
});

export default api;
