import { transactionApi } from "@/server/actions/transactions";
import { WithdrawalType } from "@/types/server";
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
}: {
	transactionId: string;
}) => {
	return useQuery({
		queryKey: ["getWithdrawalById", transactionId],
		queryFn: () => transactionApi.getWithdrawalById(transactionId),

		select: (data) => {
			const response = data.data;
			// WITHDRAWAL RECEIPT

			return response;
		},
		enabled: !!transactionId,
	});
};
