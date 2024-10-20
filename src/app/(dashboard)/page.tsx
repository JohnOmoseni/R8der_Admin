import clsx from "clsx";
import SectionWrapper from "@/layouts/SectionWrapper";
import SelectDropdown from "@/components/ui/components/SelectDropdown";
import { useState } from "react";
import { getDateRange } from "@/utils";
import { toast } from "sonner";
import {
	defaultCustomerStats,
	defaultDriverStats,
	defaultRevenueStats,
	defaultTrips,
} from "@/constants";
import { useGetOverview, useGetTripsOverview } from "@/hook/useGetOverview";
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

	const { data, isError, isLoading, status } = useGetOverview({
		startDate: dateRange.startDate,
		endDate: dateRange.endDate,
	});
	const { data: tripsData } = useGetTripsOverview({
		startDate: dateRange.startDate,
		endDate: dateRange.endDate,
	});

	let overviewError = status === "error";
	if (isError) toast.error("Error fetching information!");

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
		console.log("[DATE VALUE]", value, range);

		setDateRange(range);
	};

	const trips = overviewError ? defaultTrips : tripsData;
	const driverStats = overviewError ? defaultDriverStats : data?.driverStats;
	const customerStats = overviewError
		? defaultCustomerStats
		: data?.customerStats;
	const revenueStats = overviewError ? defaultRevenueStats : data?.revenueStats;

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
									<div className="shad-select-trigger !capitalize">
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
							{revenueStats?.map(({ label, value, isValue }, idx) => (
								<div
									className="grid grid-cols-[1fr_max-content] items-center gap-4"
									key={idx}
								>
									<div className="flex-column gap-1">
										<span className="grey-text">{label}</span>
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
												"icon-div !size-10 sm:!size-12 !border-none shadow-sm !cursor-default",
												idx === 0 ? "!bg-[#EBF4FF]" : "!bg-[#FAF3FF]"
											)}
										>
											{idx === 0 ? (
												<Volume className="size-5" />
											) : (
												<Wallet className="size-5" />
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
									<div className="shad-select-trigger">
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
									<span className="label">{label || "Total trips"} </span>

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
										<span className="label">{label || "Total stats"}</span>
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
										<span className="label">{label || "Total stats"}</span>
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
						<div className="card !block">
							<div className="flex-column gap-6 px-4 pt-3.5 pb-2">
								<div className="row-flex-start gap-4">
									<h3>Trips Performance</h3>

									<SelectDropdown
										options={selectOptions}
										defaultValue={selectOptions[3]}
									/>
								</div>

								{/* charts */}
								<div>
									<BarChartComponent />
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</SectionWrapper>
	);
}

export default Dashboard;
