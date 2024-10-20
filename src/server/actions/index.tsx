import api from "../axios";
import APIURLS from "../apiUrls";
import { AxiosResponse } from "axios";
import { handleApiError } from "@/utils";
import { GetByIdParams, GetOverviewParams, SettingsType } from "@/types/server";

const getOverview = async (
	params?: GetOverviewParams
): Promise<AxiosResponse["data"]> => {
	const payload = {
		startDate: params?.startDate,
		endDate: params?.endDate,
	};
	try {
		const response = await api.post(APIURLS.GET_SUMMARY, payload);
		console.log("[SUMMARY RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

// RIDERS ENDPOINTS
const getRiders = async (): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.get(APIURLS.GET_RIDERS);
		console.log("[RIDERS RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const getRiderById = async ({
	riderId,
	page = 0,
	size = 10,
}: Omit<GetByIdParams, "driverId">): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.get(
			`${APIURLS.GET_RIDER_DETAILS}/${riderId}?page=${page}&size=${size}`
		);
		console.log("[RIDER BY ID RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

// DRIVERS ENDPOINT
const getDrivers = async (): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.get(APIURLS.GET_DRIVERS);
		console.log("[DRIVERS RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const getDriverById = async ({
	driverId,
	page = 0,
	size = 10,
}: Omit<GetByIdParams, "riderId">): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.get(
			`${APIURLS.GET_DRIVER_DETAILS}/${driverId}?page=${page}&size=${size}`
		);
		console.log("[DRIVER BY ID RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

// TRIPS ENDPOINT
const getTripsOverview = async (
	params: GetOverviewParams
): Promise<AxiosResponse["data"]> => {
	const payload = {
		startDate: params.startDate,
		endDate: params?.endDate,
	};
	try {
		const response = await api.post(`${APIURLS.GET_TRIP}`, payload);
		console.log("[TRIPS OVERVIEW RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const getAllTrips = async (): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.get(`${APIURLS.GET_ALL_TRIPS}`);
		console.log("[ALL TRIPS RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

// WITHDRAWALS ENDPOINT
const getWithdrawals = async (): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.get(`${APIURLS.GET_WITHDRAWALS}`);
		console.log("[WITHDRAWALS RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

// STAFF ENDPOINT
const getAllRoles = async (): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.get(`${APIURLS.GET_ALL_ROLES}`);
		console.log("[ALL ROLES RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const getAllEmployee = async (): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.get(`${APIURLS.GET_STAFFS_ADMINS}`);
		console.log("[ALL STAFFS RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const getAllAdmins = async (): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.get(`${APIURLS.GET_ALL_ADMINS}`);
		console.log("[ALL ADMINS RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const getStaff = async (): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.get(`${APIURLS.GET_STAFF_DETAILS}`);
		console.log("[STAFF DETAILS RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

// SETTINGS ENDPOINTS
const getSettingsList = async (): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.get(`${APIURLS.GET_SETTINGS}`);
		console.log("[SETTINGS LIST RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const getSettingByType = async ({
	settingType,
}: {
	settingType: SettingsType;
}): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.get(`${APIURLS.GET_SETTINGS}/${settingType}`);
		console.log("[SETTING TYPE RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const getAllCouponCodes = async (): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.get(`${APIURLS.GET_COUPON_CODES}`);
		console.log("[COUPON CODES RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const getAllCouponCodesById = async ({
	id,
	value,
}: {
	id: "target" | "code";
	value: string;
}): Promise<AxiosResponse["data"]> => {
	const url =
		id === "target" ? APIURLS.GET_COUPON_BYTARGET : APIURLS.GET_COUPON_BYCODE;
	try {
		const response = await api.get(`${url}/${value}`);
		console.log(`[COUPON CODES BY ${id}]`, response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

export const requestApi = {
	getOverview,
	getRiders,
	getRiderById,
	getDrivers,
	getDriverById,
	getTripsOverview,
	getAllTrips,
	getAllRoles,
	getAllEmployee,
	getAllAdmins,
	getStaff,
	getWithdrawals,

	getSettingsList,
	getSettingByType,
	getAllCouponCodes,
	getAllCouponCodesById,
};
