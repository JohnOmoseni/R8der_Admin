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
import TableSearch from "@/components/table/TableSearch";
import Filters from "@/components/table/FilterPopover";

const options = [
	{ label: "Completed", value: "completed" },
	{ label: "Cancelled", value: "cancelled" },
];

function Trips() {
	const [columnFilters, setColumnFilters] = useState([]);
	const { data: tripsData, isError, isLoading } = useGetAllTrips();
	const [selectedFilter, setSelectedFilter] = useState("");

	const location = useLocation();
	const isDriver = location?.state === "Driver";
	// const isError = false;
	// const isLoading = false;
	// const tripsData: any = [];
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

					<div className="mt-10 row-flex-btwn gap-4">
						<TableSearch
							placeholder={`Search by ${
								isDriver ? "driver" : "customer"
							} name, amount, trip ID`}
							filterBy={`${isDriver ? "driverName" : "riderName"}`}
							columnFilters={columnFilters}
							setColumnFilters={setColumnFilters}
						/>

						<div className="row-flex gap-2">
							{/* <Filters
								placeholder="Status"
								options={options}
								onChangeHandler={handleClick}
								isArrowDown={true}
							/> */}

							{/* <Filters
								setColumnFilters={setColumnFilters}
								selectedFilter={selectedFilter}
								setSelectedFilter={setSelectedFilter}
								status=""
							/> */}

							<div className="shad-select-trigger capitalize !px-4">
								{isDownloading ? "downloading" : "Download report"}
								{isDownloading ? (
									<BtnLoader isLoading={isDownloading} />
								) : (
									<FileDownload className="size-4" />
								)}
							</div>
						</div>
					</div>

					<div className="mt-6">
						{isDriver ? (
							<DataTable
								columns={driverTripsColumn}
								tableData={tripsData?.trips || []}
								columnFilters={columnFilters}
							/>
						) : (
							<DataTable
								columns={customerTripsColumn}
								tableData={tripsData?.trips || []}
								columnFilters={columnFilters}
							/>
						)}
					</div>
				</>
			)}
		</SectionWrapper>
	);
}

export default Trips;
