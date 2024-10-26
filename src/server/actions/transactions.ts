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
		console.log("[WITHDRAWALS RESPONSE]", response);

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
		console.log("[WITHDRAWAL DETAILS (RECEIPT) RESPONSE]", response);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

export const transactionApi = {
	getWithdrawals,
	getWithdrawalById,
};
