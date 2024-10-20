import api from "../axios";
import APIURLS from "../apiUrls";
import { AxiosResponse } from "axios";
import { handleApiError } from "@/utils";
import {
	SettingsType,
	UpdatePasswordParams,
	CouponResponseType,
	CouponTargetParmas,
} from "@/types/server";
import { SettingsDataType } from "@/types";

// SETTINGS ENDPOINTS
const getSettingsList = async (): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.get(`${APIURLS.GET_SETTINGS}`);
		console.log("[SETTINGS LIST RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const getSettingByType = async ({
	settingType,
}: {
	settingType: SettingsType;
}): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.get(`${APIURLS.GET_SETTINGS}/${settingType}`);
		console.log("[SETTING TYPE RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const getAllCouponCodes = async (): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.get(`${APIURLS.GET_COUPON_CODES}`);
		console.log("[COUPON CODES RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const getAllCouponCodesById = async ({
	id,
	value,
}: {
	id: "target" | "code";
	value: string;
}): Promise<AxiosResponse["data"]> => {
	const url =
		id === "target" ? APIURLS.GET_COUPON_BYTARGET : APIURLS.GET_COUPON_BYCODE;
	try {
		const response = await api.get(`${url}/${value}`);
		console.log(`[COUPON CODES BY ${id}]`, response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

// POSTS REQUESTS

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
		console.log("[UPDATE SETTING RESPONSE]", response);

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
		console.log("[UPDATE PASSWORD RESPONSE]", response);

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
		console.log("[CREATE COUPON RESPONSE]", response);

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
		console.log("[UPDATED DISCOUNT RESPONSE]", response);

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
		console.log("[DEACTIVATED COUPON RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const deleteCouponById = async (id: string): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.delete(`${APIURLS.DELETE_COUPON}/${id}`);
		console.log("[DLETED COUPON RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

export const settingsApi = {
	getSettingsList,
	getSettingByType,
	getAllCouponCodes,
	getAllCouponCodesById,

	updateSetting,
	updatePassword,

	createCoupon,
	updateDiscount,
	deactivateCouponById,
	deleteCouponById,
};
