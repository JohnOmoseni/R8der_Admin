import api from "../axios";
import APIURLS from "../apiUrls";
import { AxiosResponse } from "axios";
import { handleApiError } from "@/utils";
import { GetByIdParams, GetOverviewParams } from "@/types/server";

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

const getTrips = async (
	params: GetOverviewParams
): Promise<AxiosResponse["data"]> => {
	const payload = {
		startDate: params.startDate,
		endDate: params?.endDate,
	};
	try {
		const response = await api.post(`${APIURLS.GET_TRIP}`, payload);

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
	getTrips,
};
