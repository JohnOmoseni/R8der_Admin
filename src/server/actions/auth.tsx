import api from "../axios";
import APIURLS from "../apiUrls";
import axios, { AxiosResponse } from "axios";
import { handleApiError } from "@/utils";

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

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const verifyOtp = async (params: {
	otp: string;
	email: string;
}): Promise<AxiosResponse["data"]> => {
	const payload = {
		otp: String(params.otp),
		email: params.email,
	};

	try {
		const response = await api.post(APIURLS.VERIFY_OTP, payload);
		console.log("VERIFY OTP RESPONSE", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const resendOtp = async (params: {
	email: string;
}): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.post(APIURLS.RESEND_OTP, params);
		console.log("RESEND OTP RESPONSE", response);

		return response.data;
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
	verifyOtp,
	resendOtp,
	refreshAccessToken,
};
