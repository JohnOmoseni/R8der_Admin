import api from "../axios";
import APIURLS from "../apiUrls";
import { AxiosResponse } from "axios";
import { handleApiError } from "@/utils";
import {
	SELECTEDTYPE,
	AddStaffParams,
	UpdatePasswordParams,
	CouponResponseType,
	CouponTargetParmas,
	UpdateRoleParams,
} from "@/types/server";
import { SettingsDataType } from "@/types";

const approveDriverPost = async (
	approveIds: SELECTEDTYPE
): Promise<AxiosResponse["data"]> => {
	const payload = {
		ids: [...approveIds],
	};
	try {
		const response = await api.post(APIURLS.POST_APPROVE_DRIVER, payload);

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

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

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

// UPDATE SETTING
const updateSetting = async (
	data: SettingsDataType
): Promise<AxiosResponse["data"]> => {
	const payload = [
		{
			settingsType: "BASIC_TRIP_FEE",
			commissionType: "FLAT",
			value: data.basicTripFee,
		},
		{
			settingsType: "LUXURY_TRIP_FEE",
			commissionType: "FLAT",
			value: data.luxuryTripFee,
		},

		{
			settingsType: "DRIVER_COMM_FEE",
			commissionType: data.driverCommissionType,
			value: data.driverCommissionAmount,
		},
	];

	try {
		const response = await api.put(`${APIURLS.PUT_UPDATE_SETTINGS}`, payload);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const updatePassword = async (
	data: UpdatePasswordParams
): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.patch(`${APIURLS.PATCH_UPDATE_SETTINGS}`, data);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

// COUPONS & DISCOUNTS --- CREATE A NEW DISCOUNT
const createCoupon = async (
	data: CouponResponseType
): Promise<AxiosResponse["data"]> => {
	const payload = {
		...data,
		expiryDate: data.expiryDate,
	};
	try {
		const response = await api.post(APIURLS.POST_CREATE_COUPON, payload);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const updateDiscount = async (
	data: CouponResponseType
): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.put(
			`${APIURLS.PUT_UPDATE_COUPON}/${data?.target}`,
			data
		);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const deactivateCouponById = async (
	id: CouponTargetParmas
): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.put(`${APIURLS.PUT_DEACTIVATE_COUPON}/${id}`);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const deleteCouponById = async (id: string): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.delete(`${APIURLS.DELETE_COUPON}/${id}`);

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

export const postApi = {
	approveDriverPost,
	rejectDriverPost,

	addStaffPost,
	activateStaff,
	deactivateStaff,
	updateRole,

	updateSetting,
	updatePassword,

	createCoupon,
	updateDiscount,
	deactivateCouponById,
	deleteCouponById,
};
