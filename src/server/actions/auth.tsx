import APIURLS from "../apiUrls";
import axios, { AxiosResponse } from "axios";
import { handleApiError } from "@/utils";
import api from "../axios";

const login = async (params: {
	email: string;
	password: string;
}): Promise<AxiosResponse["data"]> => {
	try {
		const response = await axios.post(
			"http://tripiee.com/trip/account/auth/signin",
			params
		);
		console.log("LOGIN RESPONSE", response);

		return response.data.data;
	} catch (error) {
		handleApiError(error);
	}
};

const logout = async (): Promise<AxiosResponse["data"]> => {
	const params = { email: "admin@rider.com" };
	try {
		const response = await api.delete(APIURLS.LOGOUT, { data: params });
		console.log("LOGOUT RESPONSE", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const refreshAccessToken = async (params?: {
	refresh_token: string;
}): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.post(APIURLS.REFRESH_TOKEN, params);
		console.log("REFRESH TOKEN RESPONSE", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

export const authApi = {
	login,
	logout,
	refreshAccessToken,
};
