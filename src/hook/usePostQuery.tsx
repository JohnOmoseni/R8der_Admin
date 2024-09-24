import { postApi } from "@/server/actions/post";
import { AddStaffParams, SELECTEDTYPE } from "@/types/server";
import {
	useMutation,
	UseMutationResult,
	useQueryClient,
} from "@tanstack/react-query";

// DRIVER - APPROVE DRIVER
export const useApproveDriver = (): UseMutationResult<
	any,
	unknown,
	SELECTEDTYPE,
	unknown
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (approveIds: SELECTEDTYPE) =>
			postApi.approveDriverPost(approveIds),
		onError: (error) => console.error("[Driver Approve Status Error]", error),
		onSuccess: (_values) => {
			queryClient.invalidateQueries({ queryKey: ["getDrivers"] });
		},
	});
};

// DRIVER - REJCECT DRIVER
export const useRejectDriver = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (approveIds: SELECTEDTYPE) =>
			postApi.rejectDriverPost(approveIds),

		onError: (error) => console.error("[Driver Reject Status Error]", error),
		onSuccess: (_values) => {
			queryClient.invalidateQueries({ queryKey: ["getDrivers"] });
		},
	});
};

// STAFFS
// ACTIVATE STAFF
export const useActivateStaff = (): UseMutationResult<
	any,
	unknown,
	SELECTEDTYPE,
	unknown
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (selectedIds: SELECTEDTYPE) =>
			postApi.activateStaff(selectedIds),
		onError: (error) => console.error("[Activate Staff Error]", error),
		onSuccess: (_values) => {
			queryClient.invalidateQueries({ queryKey: ["getStaffsAndAdmins"] });
		},
	});
};

// DEACTIVATE STAFF
export const useDeactivateStaff = (): UseMutationResult<
	any,
	unknown,
	SELECTEDTYPE,
	unknown
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (selectedIds: SELECTEDTYPE) =>
			postApi.deactivateStaff(selectedIds),
		onError: (error) => console.error("[Deactivate Staff Error]", error),
		onSuccess: (_values) => {
			queryClient.invalidateQueries({ queryKey: ["getStaffsAndAdmins"] });
		},
	});
};

// ADD STAFF
export const useAddStaff = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: AddStaffParams) => postApi.addStaffPost(data),
		onError: (error) => console.error("[Adding Staff Error]", error),
		onSuccess: (_values) => {
			queryClient.invalidateQueries({ queryKey: ["getStaffsAndAdmins"] });
		},
	});
};
