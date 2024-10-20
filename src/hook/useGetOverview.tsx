import {
	defaultCustomerStats,
	defaultDriverStats,
	defaultRevenueStats,
	defaultTrips,
} from "@/constants";
import { requestApi } from "@/server/actions";
import { SettingsDataType } from "@/types";
import {
	DriverDetailsType,
	DriverType,
	GetAllEmployeesType,
	GetByIdParams,
	GetDriversResponse,
	GetOverviewParams,
	GetRidersResponse,
	SettingsResponse,
} from "@/types/server";
import { useQuery } from "@tanstack/react-query";

// OVERVIEW
export const useGetOverview = ({ startDate, endDate }: GetOverviewParams) => {
	return useQuery({
		queryKey: ["getRiderDriverOverview", { startDate, endDate }],
		queryFn: () => requestApi.getOverview({ startDate, endDate }),
		select: (data) => {
			if (!data)
				return {
					driverStats: defaultDriverStats,
					customerStats: defaultCustomerStats,
					revenueStats: defaultRevenueStats,
				};

			const driverStats = [
				{
					label: "Total registered drivers",
					value: data.data?.totalDrivers,
					status: "high",
				},
				{
					label: "Total verified drivers",
					value: data.data?.verifiedDrivers,
					status: "high",
				},
				{
					label: "Total unverified drivers",
					value: data.data?.unverifiedDrivers,
					status: "low",
				},
			];

			const customerStats = [
				{
					label: "Total registered customers",
					value: data.data?.totalRiders,
					status: "high",
				},
				{
					label: "Customers that have taken trips",
					value: data.data?.totalRidersWithTrips,
					status: "high",
				},
				{
					label: "Total customers without trips",
					value: data.data?.totalRidersWithoutTrips,
					status: "low",
				},
			];

			const revenueStats = [
				{
					label: "Total Revenue Volume",
					value: data?.totalRevenueVolume,
					isValue: false,
				},
				{
					label: "Total Revenue Value",
					value: data?.totalRevenueValue,
					isValue: true,
				},
				{
					label: "Drivers Debts",
					value: data?.totalRevenueValue,
					isValue: true,
				},
			];

			return {
				driverStats,
				customerStats,
				revenueStats,
			};
		},
		enabled: !!startDate || !!endDate,
	});
};

export const useGetTripsOverview = ({
	startDate,
	endDate,
}: GetOverviewParams) => {
	return useQuery({
		queryKey: ["getTrips", { startDate, endDate }],
		queryFn: () => requestApi.getTripsOverview({ startDate, endDate }),

		select: (data) => {
			if (!data) return defaultTrips;
			const trips = [
				{
					label: "Total trips completed",
					volume: data.data?.totalCompletedTrips,
					value: data.data?.totalCompletedTripsValue,
					status: "high",
				},
				{
					label: "Total trips cancelled",
					volume: data.data?.totalCanceledTrips,
					value: data.data?.totalCanceledTripsValue,
					status: "low",
				},
				{
					label: "Total trips in progress",
					volume: data.data?.totalInProgressTrips,
					value: data.data?.totalInProgressTripsValue,
					status: "neutral",
				},
			];
			return trips;
		},
		enabled: !!startDate || !!endDate,
	});
};

// RIDERS ----------------------------------------------------------------
// GET ALL RIDERS
export const useGetRiders = () => {
	return useQuery({
		queryKey: ["getRiders"],
		queryFn: () => requestApi.getRiders(),

		select: (data) => {
			if (!data)
				return {
					data: [],
					totalRiders: 0,
					totalRidersWithTrips: 0,
					totalRidersWithoutTrips: 0,
				};

			const response = data.data;

			const ridersData = {
				data: response?.riders?.map((rider: GetRidersResponse) => ({
					firstName: rider?.firstName,
					lastName: rider?.lastName,
					email: rider?.email,
					phone: rider?.phone,
					dateCreated: rider?.dateCreated,
					riders: rider?.trips,
					riderId: rider?.riderId,
					trips: rider?.trips,
				})),
				totalRiders: response.totalRiders,
				totalRidersWithTrips: response.totalRidersWithTrips,
				totalRidersWithoutTrips: response.totalRidersWithoutTrips,
			};

			return ridersData;
		},
	});
};

// GET RIDER BY ID
export const useGetRiderDetails = ({
	riderId,
	page,
	size,
}: Omit<GetByIdParams, "driverId">) => {
	return useQuery({
		queryKey: ["getRiderDetails", riderId],
		queryFn: () => requestApi.getRiderById({ riderId, page, size }),

		select: (data) => {
			if (!data) return {};

			const rider = data.data;

			return rider;
		},

		enabled: !!riderId,
	});
};

// DRIVERS ----------------------------------------------------------------
// GET ALL DRIVERS

export const useGetDrivers = () => {
	return useQuery({
		queryKey: ["getDrivers"],
		queryFn: () => requestApi.getDrivers(),

		select: (data) => {
			const response: GetDriversResponse = data.data;

			if (!response)
				return {
					data: [],
					totalDrivers: 0,
					unverifiedDrivers: 0,
					verifiedDrivers: 0,
				};

			const driversData = {
				data: response?.drivers?.map((driver: DriverType) => ({
					firstName: driver?.firstName,
					lastName: driver?.lastName,
					email: driver?.email,
					phone: driver?.phone,
					dateCreated: driver?.dateCreated,
					trips: driver?.trips === 0 ? "N/A" : driver?.trips,
					driverId: driver?.driverId,
					status: driver?.status,
					rating: driver?.averageRating,
				})),
				totalDrivers: response.totalDrivers,
				unverifiedDrivers: response.unverifiedDrivers,
				verifiedDrivers: response.verifiedDrivers,
			};

			return driversData;
		},
	});
};

// GET DRIVER BY ID
export const useGetDriverDetails = ({
	driverId,
	page,
	size,
}: Omit<GetByIdParams, "riderId">) => {
	return useQuery({
		queryKey: ["getDriverDetails", driverId],
		queryFn: () => requestApi.getDriverById({ driverId, page, size }),

		select: (data) => {
			if (!data) return {};

			const {
				status,
				fullName,
				emailAddress,
				phoneNumber,
				wallet,
				averageRating,
				totalTrips,
				earnings,
				vehicleBrand,
				vehicleModel,
				vehiclePlateNumber,
				vehicleColour,
				vehicleYear,
				vehicleImage,
				driverPhotoImage,
				driverLicenceImage,
				insuranceDocumentImage,
				inspectionDocumentImage,
				driverWithdraws,
				driverTrips,
			}: DriverDetailsType = data.data;

			return {
				status,
				fullName,
				emailAddress,
				img: driverPhotoImage,
				phone: phoneNumber,
				wallet,
				rating: averageRating,
				totalTrips,
				earnings,
				vehicleBrand,
				vehicleModel,
				vehiclePlateNumber,
				vehicleColour,
				vehicleYear,
				vehicleImage,
				driverPhotoImage,
				driverLicenceImage,
				insuranceDocumentImage,
				inspectionDocumentImage,
				driverTrips,
				driverWithdraws,
			};
		},
		enabled: Boolean(driverId),
	});
};

// STAFFS ----------------------------------------------------------------
// GET ALL STAFFS

export const useGetStaffs = () => {
	return useQuery({
		queryKey: ["getStaffsAndAdmins"],
		queryFn: () => requestApi.getAllEmployee(),

		select: (data) => {
			const res: GetAllEmployeesType[] = data.data;

			const employees = res?.map((item) => ({
				...item,
				roleName: item?.roleName === "admin-user" ? "Admin" : "Staff",
			}));

			return employees;
		},
	});
};

// WITHDRAWALS ----------------------------------------------------------------
// GET ALL WITHDRAWALS

export const useGetWithdrawals = () => {
	return useQuery({
		queryKey: ["getWithdrawals"],
		queryFn: () => requestApi.getWithdrawals(),

		select: (data) => {
			const response = data.data;

			const withdrawals = {
				fullName: response?.fullName,
				destination: response?.destination,
				tripId: response?.tripId,
				amount: response?.amount,
				dateCreated: response?.dateCreated,
				status: response?.status,
			};

			return withdrawals;
		},
	});
};

// SETTINGS ----------------------------------------------------------------
// GET SETTINGS LIST

export const useGetSettingsList = () => {
	return useQuery({
		queryKey: ["getSettingsList"],
		queryFn: () => requestApi.getSettingsList(),

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
		queryFn: () => requestApi.getAllCouponCodes(),

		select: (data) => {
			const response = data.data;

			return response;
		},
	});
};
