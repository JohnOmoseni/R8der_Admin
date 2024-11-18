import api from "../axios";
import APIURLS from "../apiUrls";
import { AxiosResponse } from "axios";
import { handleApiError } from "@/utils";

// TRIPS ENDPOINT

const getAllTrips = async (): Promise<AxiosResponse["data"]> => {
	const payload = {
		status: "ALL",
		periodType: "ALL",
	};
	try {
		const response = await api.post(`${APIURLS.GET_ALL_TRIPS}`, payload);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const getTripById = async (tripId: string): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.get(`${APIURLS.GET_TRIP_DETAILS}/${tripId}`);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

export const tripsApi = {
	getAllTrips,
	getTripById,
};
