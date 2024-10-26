import api from "../axios";
import APIURLS from "../apiUrls";
import { AxiosResponse } from "axios";
import { handleApiError } from "@/utils";
import { GetOverviewParams, PeriodTypeParams } from "@/types/server";

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
	periodType: PeriodTypeParams = "YEAR"
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

const getRevenueStats = async (
	periodType: PeriodTypeParams = "MONTH"
): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.get(
			`${APIURLS.GET_REVENUE_STATS}?periodType=${periodType}`
		);
		console.log("[REVENUE STATS RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

export const requestApi = {
	getOverview,
	getRevenueStats,
	getTripsOverview,
	getTripsPerformance,
};
