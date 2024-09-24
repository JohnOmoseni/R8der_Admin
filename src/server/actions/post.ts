import api from "../axios";
import APIURLS from "../apiUrls";
import { AxiosResponse } from "axios";
import { handleApiError } from "@/utils";
import { SELECTEDTYPE, AddStaffParams } from "@/types/server";

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

const addStaffPost = async (
	data: AddStaffParams
): Promise<AxiosResponse["data"]> => {
	const payload = {
		fullName: data?.fullName,
		email: data?.email,
		roleStatus: data?.roleStatus,
	};
	try {
		const response = await api.post(APIURLS.POST_ADD_STAFF, payload);
		console.log("[ADD STAFF RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const activateStaff = async (
	selectedIds: string[]
): Promise<AxiosResponse["data"]> => {
	const payload = {
		ids: selectedIds,
	};
	try {
		const response = await api.put(APIURLS.PUT_ACTIVATE_STAFF, payload);
		console.log("[ACTIVATE STAFF RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const deactivateStaff = async (
	selectedIds: string[]
): Promise<AxiosResponse["data"]> => {
	const payload = {
		ids: selectedIds,
	};
	try {
		const response = await api.put(APIURLS.PUT_DEACTIVATE_STAFF, payload);
		console.log("[DEACTIVATE STAFF RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

export const postApi = {
	approveDriverPost,
	rejectDriverPost,

	addStaffPost,
	activateStaff,
	deactivateStaff,
};
