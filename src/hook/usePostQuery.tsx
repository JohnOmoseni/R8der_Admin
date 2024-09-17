import { postApi } from "@/server/actions/post";
import { ACTIONTYPE_DRIVER } from "@/types/server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// DRIVER - APPROVE DRIVER
export const useApproveDriver = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (approveIds: ACTIONTYPE_DRIVER) =>
			postApi.approveDriverPost(approveIds),
		onError: (error) => console.error("Approve Driver Error", error),
		onSuccess: (values) => {
			// queryClient.invalidateQueries(["getDrivers"]);
		},
	});
};

// DRIVER - REJCECT DRIVER
export const useRejectDriver = () => {
	return useMutation({
		mutationFn: (approveIds: ACTIONTYPE_DRIVER) =>
			postApi.rejectDriverPost(approveIds),
	});
};
