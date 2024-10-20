import api from "../axios";
import APIURLS from "../apiUrls";
import { AxiosResponse } from "axios";
import { handleApiError } from "@/utils";
import {
	ApproveDriverDocument,
	GetByIdParams,
	SELECTEDTYPE,
} from "@/types/server";

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

// POSTS REQUESTS

const approveDriverPost = async (
	approveIds: SELECTEDTYPE
): Promise<AxiosResponse["data"]> => {
	const payload = {
		ids: [...approveIds],
	};
	try {
		const response = await api.post(APIURLS.POST_APPROVE_DRIVER, payload);
		console.log("[APPROVE DRIVER RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const rejectDriverPost = async (
	approveIds: SELECTEDTYPE
): Promise<AxiosResponse["data"]> => {
	const payload = {
		ids: [...approveIds],
	};
	try {
		const response = await api.post(APIURLS.POST_REJECT_DRIVER, payload);
		console.log("[REJECT DRIVER RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const approveDriverDocument = async (
	payload: ApproveDriverDocument
): Promise<AxiosResponse["data"]> => {
	const { id, ...body } = payload;

	try {
		const response = await api.put(
			`${APIURLS.PUT_APPROVE_DOCUMENT}/${id}`,
			body
		);
		console.log("[APPROVE DRIVER RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

export const usersApi = {
	getRiders,
	getRiderById,
	getDrivers,
	getDriverById,

	approveDriverPost,
	rejectDriverPost,

	approveDriverDocument,
};
