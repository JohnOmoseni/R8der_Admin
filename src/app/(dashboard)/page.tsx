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
	selectOptions,
} from "@/constants";
import { useGetOverview, useGetTrips } from "@/hook/useGetOverview";
import { BarChartComponent } from "@/components/charts/BarChart";
import { DashboardSkeletonLoader } from "@/components/fallback/SkeletonLoader";

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

	console.log("[Summary]", data, tripsData, tripsError);

	if (overviewError) toast.error("Error fetching information");

	const handleDateChange = async (value: string) => {
		if (!value) return;
		setSelectedDateRange(value);

		const range = getDateRange(value);
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

							<SelectDropdown
								value={selectedDateRange}
								options={selectOptions}
								defaultValue={{ label: "Today", value: selectedDateRange }}
								onChangeHandler={handleDateChange}
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
