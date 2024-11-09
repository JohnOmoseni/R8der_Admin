import clsx from "clsx";
import SectionWrapper from "@/layouts/SectionWrapper";
import { useState } from "react";
import { getDateRange } from "@/utils";
import { toast } from "sonner";
import {
	defaultCustomerStats,
	defaultDriverStats,
	defaultRevenueStats,
	defaultTrips,
} from "@/constants";
import {
	useGetOverview,
	useGetRevenueStats,
	useGetTripsOverview,
	useGetTripsPerformance,
} from "@/hook/useGetOverview";
import { BarChartComponent } from "@/components/charts/BarChart";
import { DashboardSkeletonLoader } from "@/components/fallback/SkeletonLoader";
import { DropdownList } from "@/components/ui/components/DropdownList";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
	ArrowRight,
	KeyboardArrowDown,
	Volume,
	Wallet,
} from "@/constants/icons";
import { Link } from "react-router-dom";
import { PeriodTypeParams } from "@/types/server";
import FallbackLoader from "@/components/fallback/FallbackLoader";

const selectOptions = [
	{ label: "Today", value: "today" },
	{ label: "Yesterday", value: "yesterday" },
	{ label: "Last 7 days", value: "week" },
	{ label: "Last 30 days", value: "month" },
	{ label: "This Year", value: "year" },
];

function Dashboard() {
	const [selectedDateRange, setSelectedDateRange] = useState("Today");
	const [dateRange, setDateRange] = useState(() => getDateRange("today"));
	const [periodTypeTripPerf, setPeriodTypeTripPerf] = useState<
		PeriodTypeParams | undefined
	>("YEAR");
	const [periodTypeRevenueStats, setPeriodTypeRevenueStats] = useState<
		PeriodTypeParams | undefined
	>("YEAR");

	const { data, isLoading, isError, status } = useGetOverview({
		startDate: dateRange.startDate,
		endDate: dateRange.endDate,
	});

	const { data: tripsData } = useGetTripsOverview({
		startDate: dateRange.startDate,
		endDate: dateRange.endDate,
	});

	const { data: revenueStatsData } = useGetRevenueStats({
		periodType: periodTypeRevenueStats,
	});

	const { data: tripsPerf, isLoading: isFetchingPerf } = useGetTripsPerformance(
		{
			periodType: periodTypeTripPerf,
		}
	);

	const handlePeriodTypeChange = (
		value: any,
		type: "tripPerf" | "revenueStats"
	) => {
		if (!value) return;
		if (type === "tripPerf") {
			setPeriodTypeTripPerf(value.toUpperCase());
		} else if (type === "revenueStats") {
			setPeriodTypeRevenueStats(value.toUpperCase());
		}
	};

	const handleDateChange = (value: string | Date) => {
		if (!value) return;

		if (value instanceof Date) {
			setSelectedDateRange(format(value, "PPP"));
		} else {
			const selectedObj = selectOptions.find((item) => item?.value === value);
			selectedObj
				? setSelectedDateRange(selectedObj.label as string)
				: setSelectedDateRange(value);
		}

		const range = getDateRange(value);

		setDateRange(range);
	};

	let overviewError = status === "error";
	if (isError) toast.error("Error fetching information!");

	const trips = overviewError ? defaultTrips : tripsData;
	const driverStats = overviewError ? defaultDriverStats : data?.driverStats;
	const customerStats = overviewError
		? defaultCustomerStats
		: data?.customerStats;
	const revenueStats = revenueStatsData || defaultRevenueStats;

	return (
		<SectionWrapper headerTitle="Overview" mainContainerStyles="dashboard-main">
			{isLoading ? (
				<DashboardSkeletonLoader />
			) : (
				<>
					<div className="">
						<div className="row-flex-start gap-3">
							<h3>Revenue</h3>

							<DropdownList
								trigger={
									<div className="shad-select-trigger !min-w-fit !capitalize">
										{selectOptions?.find(
											(option) =>
												option.value === periodTypeRevenueStats?.toLowerCase()
										)?.label || "This Year"}{" "}
										<KeyboardArrowDown className="size-4" />
									</div>
								}
								list={selectOptions}
								renderItem={(item) => {
									return (
										<div
											className={cn(
												"row-flex-btwn w-full cursor-pointer",
												item?.value === periodTypeRevenueStats?.toLowerCase() &&
													"text-secondary font-semibold"
											)}
											onClick={() =>
												handlePeriodTypeChange(item?.value, "revenueStats")
											}
										>
											{item?.label}
										</div>
									);
								}}
							/>
						</div>

						<div className="card card-inner">
							{revenueStats?.map(({ label, value, isValue }, idx) => (
								<div
									className="grid grid-cols-[1fr_max-content] items-center gap-4"
									key={idx}
								>
									<div className="flex-column gap-1">
										<span
											className={cn(
												"grey-text max-md:max-w-[10ch]",
												idx === revenueStats.length - 1 && "max-md:max-w-[8ch]"
											)}
										>
											{label}
										</span>
										<h3
											className={clsx(
												"font-bold !leading-6 text-xl sm:text-2xl xl:text-3xl"
											)}
										>
											{isValue ? `NGN ${value || 0}` : value || "0"}
										</h3>
									</div>

									{idx !== revenueStats.length - 1 && (
										<div
											className={cn(
												"icon-div !size-8 min-[500px]:!size-12 !border-none shadow-sm !cursor-default",
												idx === 0 ? "!bg-[#EBF4FF]" : "!bg-[#FAF3FF]"
											)}
										>
											{idx === 0 ? (
												<Volume className="size-4 min-[500px]:size-5" />
											) : (
												<Wallet className="size-4 min-[500px]:size-5" />
											)}
										</div>
									)}
								</div>
							))}
						</div>
					</div>

					<div className="">
						<div className="row-flex-start gap-3">
							<h3>Trips</h3>

							<DropdownList
								trigger={
									<div className="shad-select-trigger justify-between">
										{selectedDateRange} <KeyboardArrowDown className="size-4" />
									</div>
								}
								list={selectOptions}
								onClickHandlers={[
									() => handleDateChange(selectOptions[0]?.value),
									() => handleDateChange(selectOptions[1]?.value),
									() => handleDateChange(selectOptions[2]?.value),
									() => handleDateChange(selectOptions[3]?.value),
									() => handleDateChange(selectOptions[4]?.value),
								]}
								onCalendarPopup={(date: Date) => handleDateChange(date)}
							/>
						</div>

						<div className="card card-inner">
							{trips?.map(({ label, volume, value, status }, idx) => (
								<div className="flex-column gap-3" key={idx}>
									<span className="label ">{label || "Total trips"} </span>

									<div>
										<span className="grey-text">Volume</span>
										<p className="font-semibold">{volume || 0}</p>
									</div>

									<div>
										<span className="grey-text">Value</span>
										<p
											className={clsx("font-semibold uppercase", {
												"text-green-500": status === "high",
												"text-red-500": status === "low",
											})}
										>
											A${value || "0.00"}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>

					<div>
						<h3>Drivers</h3>
						<div className="card card-inner">
							{driverStats?.map(({ label, value, status }, idx) => (
								<div
									className="grid grid-cols-[1fr_max-content] gap-4"
									key={idx}
								>
									<div className="flex-column gap-3">
										<span className="label max-[430px]:max-w-[8ch]">
											{label || "Total stats"}
										</span>
										<p
											className={clsx("font-semibold uppercase", {
												"text-green-500": status === "high",
												"text-red-500": status === "low",
											})}
										>
											{value || 0}
										</p>
									</div>
									<Link to="/dashboard/drivers" className="w-full">
										<ArrowRight className="size-4 text-grey" />
									</Link>
								</div>
							))}
						</div>
					</div>

					<div>
						<h3>Customers</h3>
						<div className="card card-inner">
							{customerStats?.map(({ label, value, status }, idx) => (
								<div
									className="grid grid-cols-[1fr_max-content] gap-4"
									key={idx}
								>
									<div className="flex-column gap-3">
										<span className="label max-[500px]:max-w-[7ch]">
											{label || "Total stats"}
										</span>
										<p
											className={clsx("font-semibold uppercase", {
												"text-green-500": status === "high",
												"text-red-500": status === "low",
											})}
										>
											{value || 0}
										</p>
									</div>
									<Link to="/dashboard/customers" className="w-full">
										<ArrowRight className="size-4 text-grey" />
									</Link>
								</div>
							))}
						</div>
					</div>

					<div>
						<div className="flex-column gap-7 pb-2">
							<div className="row-flex-start gap-4">
								<h3>Trips Performance</h3>

								<DropdownList
									trigger={
										<div className="shad-select-trigger !min-w-fit !capitalize">
											{selectOptions?.find(
												(option) =>
													option.value === periodTypeTripPerf?.toLowerCase()
											)?.label || "This Year"}{" "}
											<KeyboardArrowDown className="size-4" />
										</div>
									}
									list={selectOptions}
									renderItem={(item) => {
										return (
											<div
												className={cn(
													"row-flex-btwn w-full cursor-pointer",
													item?.value === periodTypeTripPerf?.toLowerCase() &&
														"text-secondary font-semibold"
												)}
												onClick={() =>
													handlePeriodTypeChange(item?.value, "tripPerf")
												}
											>
												{item?.label}
											</div>
										);
									}}
								/>
							</div>

							{/* charts */}
							<div className="">
								{isFetchingPerf ? (
									<div className="loader-container !h-[200px]">
										<FallbackLoader />
									</div>
								) : (
									<BarChartComponent data={tripsPerf || []} />
								)}
							</div>
						</div>
					</div>
				</>
			)}
		</SectionWrapper>
	);
}

export default Dashboard;
