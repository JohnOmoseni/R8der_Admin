import { SettingsResponse } from "@/types/server";
import { useQuery } from "@tanstack/react-query";
import { CouponResponseType, UpdatePasswordParams } from "@/types/server";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { settingsApi } from "@/server/actions/settings";
import { SettingsDataType } from "@/types";

// SETTINGS ----------------------------------------------------------------
// GET SETTINGS LIST

export const useGetSettingsList = () => {
	return useQuery({
		queryKey: ["getSettingsList"],
		queryFn: () => settingsApi.getSettingsList(),

		select: (data) => {
			const response = data.data;

			const settingsData: SettingsDataType = {
				basicTripFee: undefined,
				luxuryTripFee: undefined,
				driverCommissionType: undefined,
				driverCommissionAmount: undefined,
			};

			response?.forEach((item: SettingsResponse) => {
				switch (item.settingsType) {
					case "BASIC_TRIP_FEE":
						settingsData.basicTripFee = item.value;
						break;
					case "LUXURY_TRIP_FEE":
						settingsData.luxuryTripFee = item.value;
						break;
					case "DRIVER_COMM_FEE":
						settingsData.driverCommissionType = item.commissionType;
						settingsData.driverCommissionAmount = item.value;
						break;
					default:
						break;
				}
			});

			return {
				...data,
				settingsData,
			};
		},
	});
};

export const useGetAllCouponCodes = () => {
	return useQuery({
		queryKey: ["getAllCouponCodes"],
		queryFn: () => settingsApi.getAllCouponCodes(),

		select: (data) => {
			const response = data.data;

			return response;
		},
	});
};

//  SETTINGS CONFIG MUTATION
export const useUpdateSettings = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: SettingsDataType) => settingsApi.updateSetting(data),
		onError: (error) => console.error("[Update Settings Config Error]", error),
		onSuccess: (_values) => {
			queryClient.invalidateQueries({ queryKey: ["getSettingsList"] });
		},
	});
};

export const useUpdatePassword = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: UpdatePasswordParams) =>
			settingsApi.updatePassword(data),
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
		mutationFn: (data: CouponResponseType) => settingsApi.createCoupon(data),
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
		mutationFn: (data: CouponResponseType) => settingsApi.updateDiscount(data),
		onError: (error) => console.error("[Updated Discount Error]", error),
		onSuccess: (_values) => {
			queryClient.invalidateQueries({ queryKey: ["getAllCouponCodes"] });
		},
	});
};

export const useDeactivateCoupon = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: string) => settingsApi.deactivateCouponById(data),
		onError: (error) => console.error("[Deactivated Discount Error]", error),
		onSuccess: (_values) => {
			queryClient.invalidateQueries({ queryKey: ["getAllCouponCodes"] });
		},
	});
};

export const useDeleteCoupon = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: string) => settingsApi.deleteCouponById(data),
		onError: (error) => console.error("[Deleted Discount Error]", error),
		onSuccess: (_values) => {
			queryClient.invalidateQueries({ queryKey: ["getAllCouponCodes"] });
		},
	});
};
