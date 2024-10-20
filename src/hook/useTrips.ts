import { tripsApi } from "@/server/actions/trips";
import { AllTripsType, TripsType } from "@/types/server";
import { useQuery } from "@tanstack/react-query";

// TRIPS ----------------------------------------------------------------
// GET ALL TRIPS

export const useGetAllTrips = () => {
	return useQuery({
		queryKey: ["getAllTrips"],
		queryFn: () => tripsApi.getAllTrips(),

		select: (data) => {
			if (!data)
				return {
					trips: [],
					totalTripsVolume: 0,
					totalTripsValue: 0,
				};

			const response = data.data;

			const tripsData = {
				trips: response?.trip?.map((trip: TripsType) => ({
					riderName: trip?.riderName,
					driverName: trip?.driverName,
					tripId: trip?.tripId,
					amount: trip?.amount,
					status: trip?.status,
					date: trip?.date,
				})),
				totalTripsVolume: response?.totalTrips,
				totalTripsValue: response?.totalValue,
			};

			return tripsData;
		},
	});
};

export const useGetTripById = ({ tripId }: { tripId: string }) => {
	return useQuery({
		queryKey: ["getTripById", tripId],
		queryFn: () => tripsApi.getTripById(tripId),

		select: (data) => {
			const response = data.data;
			// TRIP RECEIPT

			const tripData = {
				status: response?.status,
				tripDate: response?.tripDate,
				driverName: response?.driverName,
				customerName: response?.customerName,
				pickUp: response?.pickUp,
				destination: response?.destination,
				car: response?.car, //for customer
				plateNumber: response?.plateNumber,
				fareAmount: response?.fareAmount,
				transactionCharge: response?.transactionCharge,
				vat: response?.vat,
				tripId: response?.tripId,
			};

			return tripData;
		},
		enabled: !!tripId,
	});
};
