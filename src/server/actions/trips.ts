import api from "../axios";
import APIURLS from "../apiUrls";
import { AxiosResponse } from "axios";
import { handleApiError } from "@/utils";
import { GetOverviewParams, PeriodTypeParams } from "@/types/server";

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

const getTripsPerformance = async (
	periodType: PeriodTypeParams
): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.get(
			`${APIURLS.GET_TRIP_PERFORMANCE}/${periodType}`
		);
		console.log("[TRIPS PERFORMANCE RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const getAllTrips = async (): Promise<AxiosResponse["data"]> => {
	const payload = {
		status: "ALL",
		periodType: "ALLTIME",
	};
	try {
		const response = await api.post(`${APIURLS.GET_ALL_TRIPS}`, payload);
		console.log("[ALL TRIPS RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const getTripById = async (tripId: string): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.get(`${APIURLS.GET_TRIP_DETAILS}/${tripId}`);
		console.log("[TRIP DETAILS (RECEIPT) RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

export const tripsApi = {
	getTripsOverview,
	getTripsPerformance,
	getAllTrips,
	getTripById,
};
