import api from "../axios";
import APIURLS from "../apiUrls";
import { AxiosResponse } from "axios";
import { handleApiError } from "@/utils";
import {
	ApproveDriverDocument,
	DriverStandingParams,
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
	periodType,
}: Omit<GetByIdParams, "driverId">): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.get(
			`${APIURLS.GET_RIDER_DETAILS}/${riderId}?periodType=${periodType}`
		);
		console.log("[RIDER BY ID RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

// DRIVERS ENDPOINT
const getDrivers = async (
	standing: DriverStandingParams | undefined = "ALL"
): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.get(
			`${APIURLS.GET_DRIVERS}?standing=${standing}`
		);
		console.log("[DRIVERS RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const getDriverById = async ({
	driverId,
	periodType,
}: Omit<GetByIdParams, "riderId">): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.get(
			`${APIURLS.GET_DRIVER_DETAILS}/${driverId}??periodType=${periodType}`
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
