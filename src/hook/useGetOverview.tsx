import { ChartResponseData } from "@/components/charts/options";
import {
	defaultCustomerStats,
	defaultDriverStats,
	defaultRevenueStats,
	defaultTrips,
} from "@/constants";
import { requestApi } from "@/server/actions/dashboard";
import { GetOverviewParams, PeriodTypeParams } from "@/types/server";
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

export const useGetRevenueStats = ({
	periodType,
}: {
	periodType?: PeriodTypeParams;
}) => {
	return useQuery({
		queryKey: ["getRevenueStats", periodType],
		queryFn: () => requestApi.getRevenueStats(periodType),

		select: (data) => {
			const responseData = data?.data;

			const revenueStats = [
				{
					label: "Total Revenue Volume",
					value: responseData?.revVolume,
					isValue: false,
				},
				{
					label: "Total Revenue Value",
					value: responseData?.revValue,
					isValue: true,
				},
				{
					label: "Drivers Debts",
					value: responseData?.debts,
					isValue: true,
				},
			];

			return revenueStats;
		},
		enabled: !!periodType,
	});
};

// TRIPS DATA
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

export const useGetTripsPerformance = ({
	periodType,
}: {
	periodType?: PeriodTypeParams;
}) => {
	return useQuery({
		queryKey: ["getTripsPerformance", periodType],
		queryFn: () => requestApi.getTripsPerformance(periodType),

		select: (data) => {
			const response: ChartResponseData = data?.data;

			// TRIP PERFORMANCE
			const performanceData = {
				summary: response?.summary?.map(({ period, count, amount }) => ({
					period,
					count,
					amount: amount || 0.5,
				})),
				totalCount: response?.totalCount,
				totalAmount: response?.totalAmount,
			};

			return performanceData;
		},
		enabled: !!periodType,
	});
};
