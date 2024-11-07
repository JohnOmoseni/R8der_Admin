import { useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import { SkeletonLoader } from "@/components/fallback/SkeletonLoader";
import { toast } from "sonner";
import { useGetAllTrips } from "@/hook/useTrips";
import { useLocation } from "react-router-dom";
import { FileDownload, Volume, Wallet } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { BtnLoader } from "@/components/fallback/FallbackLoader";
import { driverTripsColumn } from "@/components/table/columns/driverTripsColumn";
import { customerTripsColumn } from "@/components/table/columns/customerTripsColumn";

import clsx from "clsx";
import SectionWrapper from "@/layouts/SectionWrapper";
import Filters from "@/components/table/filters";
import DownloadReport from "@/components/DownloadReport";
import TableGlobalSearch from "@/components/table/TableGlobalSearch";

const statusOptions = [
	{ label: "All", value: "all" },
	{ label: "Requested", value: "requested" },
	{ label: "In-progress", value: "in_progress" },
	{ label: "Cancelled", value: "cancelled" },
];
function Trips() {
	const { data: tripsData, isError } = useGetAllTrips();
	const [selectedFilter, setSelectedFilter] = useState("");
	const [globalFilter, setGlobalFilter] = useState("");
	const [columnFilters, setColumnFilters] = useState([]);

	const location = useLocation();
	const isDriver = location?.state === "Driver";
	const isDownloading = false;

	if (isError) toast.error("Error fetching trips");

	const tripsStats = [
		{
			label: "Total Trips Volume",
			value: tripsData?.totalTripsVolume || "0",
		},
		{
			label: "Total Trips Value",
			value: tripsData?.totalTripsValue || "NGN 0",
		},
	];

	const isLoading = false;

	return (
		<SectionWrapper
			headerTitle={`${isDriver ? "Drivers" : "Customers"} Trips (${
				tripsData?.trips?.length || 0
			})`}
		>
			{isLoading ? (
				<SkeletonLoader />
			) : (
				<>
					<div className="card card-inner">
						{tripsStats?.length &&
							tripsStats.map(({ label, value }, idx) => (
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
											{value}
										</h3>
									</div>

									<div
										className={cn(
											"icon-div !size-12 !border-none shadow-sm !cursor-default",
											idx === 0 ? "!bg-[#EBF4FF]" : "!bg-[#FAF3FF]"
										)}
									>
										{idx === 0 ? (
											<Volume className="size-5" />
										) : (
											<Wallet className="size-5" />
										)}
									</div>
								</div>
							))}
					</div>

					<div className="mt-10 flex-column sm:row-flex-btwn gap-y-3 gap-x-4">
						<TableGlobalSearch
							placeholder={`Search by ${
								isDriver ? "driver" : "customer"
							} name, amount, trip ID`}
							globalValue={globalFilter || ""}
							onChange={(value: string) => setGlobalFilter(value)}
						/>

						<div className="row-flex max-[500px]:!justify-end gap-2">
							<Filters
								placeholder="Status"
								columnId="status"
								showAsDropdown={true}
								options={statusOptions}
								isArrowDown={true}
								selectedFilter={selectedFilter}
								setSelectedFilter={setSelectedFilter}
								setColumnFilters={setColumnFilters}
							/>

							<DownloadReport
								data={tripsData?.trips || []}
								filename={
									isDriver ? "Drivers_Trip.xlsx" : "Customers_Trip.xlsx"
								}
								trigger={
									<>
										<p className="mt-0.5 font-semibold capitalize">
											{isDownloading ? "downloading" : "Download report"}
										</p>
										{isDownloading ? (
											<BtnLoader isLoading={isDownloading} />
										) : (
											<FileDownload className="size-4" />
										)}
									</>
								}
							/>
						</div>
					</div>

					<div className="mt-6">
						<DataTable
							columns={isDriver ? driverTripsColumn : customerTripsColumn}
							tableData={tripsData?.trips || []}
							globalFilter={globalFilter}
							columnFilters={columnFilters}
						/>
					</div>
				</>
			)}
		</SectionWrapper>
	);
}

export default Trips;
