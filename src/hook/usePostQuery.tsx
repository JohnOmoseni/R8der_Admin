import { postApi } from "@/server/actions/post";
import { SettingsDataType } from "@/types";
import {
	AddStaffParams,
	CouponResponseType,
	CouponTargetParmas,
	UpdateRoleParams,
	SELECTEDTYPE,
	UpdatePasswordParams,
} from "@/types/server";
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

// STAFFS MUTATION
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

// UPDATE ROLE
export const useUpdateRole = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: UpdateRoleParams) => postApi.updateRole(data),
		onError: (error) => console.error("[Updating User Role Error]", error),
		onSuccess: (_values) => {
			queryClient.invalidateQueries({ queryKey: ["getStaffsAndAdmins"] });
		},
	});
};

//  SETTINGS CONFIG MUTATION
export const useUpdateSettings = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: SettingsDataType) => postApi.updateSetting(data),
		onError: (error) => console.error("[Update Settings Config Error]", error),
		onSuccess: (_values) => {
			queryClient.invalidateQueries({ queryKey: ["getSettingsList"] });
		},
	});
};

export const useUpdatePassword = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: UpdatePasswordParams) => postApi.updatePassword(data),
		onError: (error) => console.error("[Update Password Error]", error),
		onSuccess: (_values) => {
			queryClient.invalidateQueries({ queryKey: ["getUserPassword"] });
		},
	});
};

// CREATE DISCOUNT
export const useCreateCoupon = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CouponResponseType) => postApi.createCoupon(data),
		onError: (error) => console.error("[Creating Discount Error]", error),
		onSuccess: (_values) => {
			queryClient.invalidateQueries({ queryKey: ["getDiscountAndCoupons"] });
		},
	});
};

// UPDATE DISCOUNTS & COUPONS
export const useUpdateDiscount = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CouponResponseType) => postApi.updateDiscount(data),
		onError: (error) => console.error("[Updated Discount Error]", error),
		onSuccess: (_values) => {
			queryClient.invalidateQueries({ queryKey: ["getAllCouponCodes"] });
		},
	});
};

export const useDeactivateCoupon = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CouponTargetParmas) =>
			postApi.deactivateCouponById(data),
		onError: (error) => console.error("[Deactivated Discount Error]", error),
		onSuccess: (_values) => {
			queryClient.invalidateQueries({ queryKey: ["getAllCouponCodes"] });
		},
	});
};

export const useDeleteCoupon = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: string) => postApi.deleteCouponById(data),
		onError: (error) => console.error("[Deleted Discount Error]", error),
		onSuccess: (_values) => {
			queryClient.invalidateQueries({ queryKey: ["getAllCouponCodes"] });
		},
	});
};
