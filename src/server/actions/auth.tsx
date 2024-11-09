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
			"https://tripiee.com/trip/account/auth/signin",
			params
		);

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

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const logout = async (): Promise<AxiosResponse["data"]> => {
	const params = { email: "admin@rider.com" };
	try {
		const response = await api.delete(APIURLS.LOGOUT, { data: params });

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
