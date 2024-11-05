import { transactionApi } from "@/server/actions/transactions";
import { SettlementType, WithdrawalType } from "@/types/server";
import { useQuery } from "@tanstack/react-query";

// WITHDRAWALS ----------------------------------------------------------------
// GET ALL WITHDRAWALS

export const useGetWithdrawals = () => {
	return useQuery({
		queryKey: ["getWithdrawals"],
		queryFn: () => transactionApi.getWithdrawals(),

		select: (data) => {
			const response = data.data;

			const withdrawals: WithdrawalType[] = response;
			return withdrawals;
		},
	});
};

export const useGetWithdrawalById = ({
	transactionId,
	enabled,
}: {
	transactionId: string;
	enabled?: boolean;
}) => {
	return useQuery({
		queryKey: ["getWithdrawalById", transactionId],
		queryFn: () => transactionApi.getWithdrawalById(transactionId),

		select: (data) => {
			const response = data.data;
			// WITHDRAWAL RECEIPT

			return response;
		},
		enabled: !!transactionId && enabled,
	});
};

// SETTLEMENTS ----------------------------------------------------------------
// GET ALL SETTLEMENTS
export const useGetSettlements = () => {
	return useQuery({
		queryKey: ["getSettlements"],
		queryFn: () => transactionApi.getSettlements(),

		select: (data) => {
			const response = data.data;

			const settlements: SettlementType[] = response;
			return settlements;
		},
	});
};

export const useGetSettlementById = ({
	transactionId,
	enabled,
}: {
	transactionId: string;
	enabled?: boolean;
}) => {
	return useQuery({
		queryKey: ["getSettlementById", transactionId],
		queryFn: () => transactionApi.getSettlementById(transactionId),

		select: (data) => {
			const response: SettlementType = data.data;
			// SETTLEMENT RECEIPT

			return response;
		},
		enabled: !!transactionId && enabled,
	});
};
