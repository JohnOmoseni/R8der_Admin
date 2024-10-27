import {
	ApproveDriverDocument,
	DriverDetailsType,
	DriverStandingParams,
	DriverType,
	GetByIdParams,
	GetDriversResponse,
	GetRidersResponse,
} from "@/types/server";
import { useQuery } from "@tanstack/react-query";
import { SELECTEDTYPE } from "@/types/server";
import {
	useMutation,
	UseMutationResult,
	useQueryClient,
} from "@tanstack/react-query";
import { usersApi } from "@/server/actions/users";

// RIDERS ----------------------------------------------------------------
// GET ALL RIDERS
export const useGetRiders = () => {
	return useQuery({
		queryKey: ["getRiders"],
		queryFn: () => usersApi.getRiders(),

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
	periodType,
}: Omit<GetByIdParams, "driverId">) => {
	return useQuery({
		queryKey: ["getRiderDetails", riderId],
		queryFn: () => usersApi.getRiderById({ riderId, periodType }),

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

export const useGetDrivers = (standing?: DriverStandingParams) => {
	return useQuery({
		queryKey: ["getDrivers"],
		queryFn: () => usersApi.getDrivers(standing),

		select: (data) => {
			const response: GetDriversResponse = data.data;

			if (!response)
				return {
					data: [],
					totalDrivers: 0,
					unverifiedDrivers: 0,
					verifiedDrivers: 0,
					owningDrivers: 0,
				};

			const driversData = {
				data: response?.drivers?.map((driver: DriverType) => ({
					firstName: driver?.firstName,
					lastName: driver?.lastName,
					email: driver?.email,
					phone: driver?.phone,
					dateCreated: driver?.dateCreated,
					trips: driver?.trips ?? "N/A",
					driverId: driver?.driverId,
					status: driver?.status,
					rating: driver?.averageRating,
				})),
				totalDrivers: response.totalDrivers,
				unverifiedDrivers: response.unverifiedDrivers,
				verifiedDrivers: response.verifiedDrivers,
				owningDrivers: response.owningDrivers,
			};

			return driversData;
		},
	});
};

// GET DRIVER BY ID
export const useGetDriverDetails = ({
	driverId,
}: Omit<GetByIdParams, "riderId">) => {
	return useQuery({
		queryKey: ["getDriverDetails", driverId],
		queryFn: () => usersApi.getDriverById({ driverId }),

		select: (data) => {
			if (!data) return {};

			const {
				dateJoined,
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
				vehicleImagesApproved,
				driversLicenseApproved,
				driversPhotoApproved,
				insuranceDocumentApproved,
				otherInspectionDocumentApproved,
			}: DriverDetailsType = data.data;

			return {
				dateJoined,
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

				vehicleImagesApproved,
				driversLicenseApproved,
				driversPhotoApproved,
				insuranceDocumentApproved,
				otherInspectionDocumentApproved,
			};
		},
		enabled: Boolean(driverId),
	});
};

// POSTS MUTATIONS

// DRIVER MUTATION - APPROVE DRIVER
export const useApproveDriver = (): UseMutationResult<
	any,
	unknown,
	SELECTEDTYPE,
	unknown
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (approveIds: SELECTEDTYPE) =>
			usersApi.approveDriverPost(approveIds),
		onError: (error) => console.error("[Driver Approve Status Error]", error),
		onSuccess: (_values) => {
			queryClient.invalidateQueries({ queryKey: ["getDrivers"] });
		},
	});
};

// DRIVER MUTATION - REJCECT DRIVER
export const useRejectDriver = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (approveIds: SELECTEDTYPE) =>
			usersApi.rejectDriverPost(approveIds),

		onError: (error) => console.error("[Driver Reject Status Error]", error),
		onSuccess: (_values) => {
			queryClient.invalidateQueries({ queryKey: ["getDrivers"] });
		},
	});
};

// DRIVER MUTATION - REJCECT DRIVER
export const useApproveDriverDocument = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: ApproveDriverDocument) =>
			usersApi.approveDriverDocument(payload),

		onError: (error) =>
			console.error("[Driver Document Approval Error]", error),
		onSuccess: (_values) => {
			queryClient.invalidateQueries({ queryKey: ["getDrivers"] });
		},
	});
};
