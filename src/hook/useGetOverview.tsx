import {
	defaultCustomerStats,
	defaultDriverStats,
	defaultTrips,
} from "@/constants";
import { requestApi } from "@/server/actions";
import {
	DriverDetailsType,
	DriverType,
	GetAllEmployeesType,
	GetByIdParams,
	GetDriversResponse,
	GetOverviewParams,
	GetRidersResponse,
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

			return {
				driverStats,
				customerStats,
			};
		},
		enabled: !!startDate || !!endDate,
	});
};

export const useGetTrips = ({ startDate, endDate }: GetOverviewParams) => {
	return useQuery({
		queryKey: ["getTrips", { startDate, endDate }],
		queryFn: () => requestApi.getTrips({ startDate, endDate }),

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
