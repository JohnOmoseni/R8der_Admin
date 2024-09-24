import clsx from "clsx";
import SectionWrapper from "@/layouts/SectionWrapper";
import SelectDropdown from "@/components/ui/components/SelectDropdown";
import { useState } from "react";
import { getDateRange } from "@/utils";
import { toast } from "sonner";
import {
	defaultCustomerStats,
	defaultDriverStats,
	defaultTrips,
} from "@/constants";
import { useGetOverview, useGetTrips } from "@/hook/useGetOverview";
import { BarChartComponent } from "@/components/charts/BarChart";
import { DashboardSkeletonLoader } from "@/components/fallback/SkeletonLoader";
import { DropdownList } from "@/components/ui/components/DropdownList";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const selectOptions = [
	{ label: "Today", value: "today" },
	{ label: "Yesterday", value: "yesterday" },
	{ label: "Last 7 days", value: "week" },
	{ label: "Last 30 days", value: "month" },
	{ label: "This Year", value: "year" },
];

function Dashboard() {
	const [selectedDateRange, setSelectedDateRange] = useState("today");
	const [dateRange, setDateRange] = useState(() => getDateRange("today"));

	const {
		data,
		isError: overviewError,
		isLoading,
	} = useGetOverview({
		startDate: dateRange.startDate,
		endDate: dateRange.endDate,
	});
	const { data: tripsData, isError: tripsError } = useGetTrips({
		startDate: dateRange.startDate,
		endDate: dateRange.endDate,
	});

	if (overviewError) toast.error("Error fetching information!");

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

	const trips = tripsError ? defaultTrips : tripsData;
	const driverStats = overviewError ? defaultDriverStats : data?.driverStats;
	const customerStats = overviewError
		? defaultCustomerStats
		: data?.customerStats;

	return (
		<SectionWrapper headerTitle="Overview" mainContainerStyles="dashboard-main">
			{isLoading ? (
				<DashboardSkeletonLoader />
			) : (
				<>
					<div className="">
						<div className="row-flex-start gap-3">
							<h3>Trips</h3>

							<DropdownList
								trigger={
									<div className={cn("action-styles", "sm:!px-4")}>
										<p className="mt-0.5 font-semibold">{selectedDateRange}</p>
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
								<div className="row-flex-start" key={idx}>
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
								</div>
							))}
						</div>
					</div>

					<div>
						<h3>Customers</h3>
						<div className="card card-inner">
							{customerStats?.map(({ label, value, status }, idx) => (
								<div className="row-flex-start" key={idx}>
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
								</div>
							))}
						</div>
					</div>

					<div>
						<div className="card !block">
							<div className="flex-column gap-6 px-4 py-3.5">
								<div className="row-flex-start gap-4">
									<h3>Trips Performance</h3>

									<SelectDropdown
										options={selectOptions}
										defaultValue={selectOptions[3]}
										// onChangeHandler={() => null}
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
