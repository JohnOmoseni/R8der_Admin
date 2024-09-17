import api from "../axios";
import APIURLS from "../apiUrls";
import { AxiosResponse } from "axios";
import { handleApiError } from "@/utils";
import { ACTIONTYPE_DRIVER } from "@/types/server";

const approveDriverPost = async (
	approveIds: ACTIONTYPE_DRIVER
): Promise<AxiosResponse["data"]> => {
	const payload = {
		id: [...approveIds],
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
	approveIds: ACTIONTYPE_DRIVER
): Promise<AxiosResponse["data"]> => {
	const payload = {
		id: [...approveIds],
	};
	try {
		const response = await api.post(APIURLS.POST_REJECT_DRIVER, payload);
		console.log("[REJECT DRIVER RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

export const postApi = {
	approveDriverPost,
	rejectDriverPost,
};
