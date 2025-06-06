import api from "../axios";
import APIURLS from "../apiUrls";
import { AxiosResponse } from "axios";
import { handleApiError } from "@/utils";

// WITHDRAWALS & SETTLEMENTS ENDPOINT
const getWithdrawals = async (): Promise<AxiosResponse["data"]> => {
	const payload = {
		status: "ALL",
		periodType: "ALL",
	};
	try {
		const response = await api.post(`${APIURLS.GET_WITHDRAWALS}`, payload);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const getWithdrawalById = async (
	transactionId: string
): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.get(
			`${APIURLS.GET_WITHDRAWAL_DETAILS}/${transactionId}`
		);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

// SETTLEMENTS
const getSettlements = async (): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.get(`${APIURLS.GET_SETTLEMENTS}`);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const getSettlementById = async (
	transactionId: string
): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.get(
			`${APIURLS.GET_SETTLEMENT_DETAILS}/${transactionId}`
		);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

export const transactionApi = {
	getWithdrawals,
	getWithdrawalById,
	getSettlements,
	getSettlementById,
};
