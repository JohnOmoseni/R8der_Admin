import api from "../axios";
import APIURLS from "../apiUrls";
import { AxiosResponse } from "axios";
import { handleApiError } from "@/utils";
import { AddStaffParams, UpdateRoleParams } from "@/types/server";

// STAFF ENDPOINT
const getAllRoles = async (): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.get(`${APIURLS.GET_ALL_ROLES}`);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const getAllEmployee = async (): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.get(`${APIURLS.GET_STAFFS_ADMINS}`);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const getAllAdmins = async (): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.get(`${APIURLS.GET_ALL_ADMINS}`);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const getStaff = async (): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.get(`${APIURLS.GET_STAFF_DETAILS}`);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

// POSTS REQUESTS
const addStaffPost = async (
	data: AddStaffParams
): Promise<AxiosResponse["data"]> => {
	const payload = {
		firstName: data?.firstName,
		lastName: data?.lastName,
		email: data?.email,
		roleName: data?.roleStatus === "ADMIN" ? "admin-user" : "staff-user",
	};
	try {
		const response = await api.post(APIURLS.POST_ADD_STAFF, payload);

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

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

// DELETE STAFF
const deleteStaff = async (
	selectedIds: string[]
): Promise<AxiosResponse["data"]> => {
	const payload = {
		ids: selectedIds,
	};
	try {
		const response = await api.delete(`${APIURLS.DELETE_STAFF}`, {
			data: payload,
		});

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

// UPDATE ROLE
const updateRole = async (
	data: UpdateRoleParams
): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.put(`${APIURLS.PUT_UPDATE_ROLE}`, data);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

export const staffApi = {
	getAllRoles,
	getAllEmployee,
	getAllAdmins,
	getStaff,

	addStaffPost,
	activateStaff,
	deactivateStaff,

	updateRole,

	deleteStaff,
};
