import { cn } from "@/lib/utils";
import { DataTable } from "@/components/table/DataTable";
import { useState } from "react";
import { driverColumn } from "@/components/table/columns/driverColumn";
import { ColumnFiltersState } from "@tanstack/react-table";
import { DriverStandingParams, DriverType } from "@/types/server";
import { toast } from "sonner";
import { SkeletonLoader } from "@/components/fallback/SkeletonLoader";
import {
	useApproveDriver,
	useRejectDriver,
	useGetDrivers,
} from "@/hook/useUsers";
import { BtnLoader } from "@/components/fallback/FallbackLoader";

import clsx from "clsx";
import SectionWrapper from "@/layouts/SectionWrapper";
import TableSearch from "@/components/table/TableSearch";
import Filters from "@/components/table/filters";

const options = [
	{ label: "All", value: "all" },
	{ label: "Verified", value: "verified" },
	{ label: "Not-verified", value: "unverified" },
	{ label: "Owing", value: "owing" },
];
function Drivers() {
	const [selectedRows, setSelectedRows] = useState<DriverType[]>([]);
	const [selectedFilter, setSelectedFilter] = useState("all");
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const {
		data: driverData,
		isError,
		isLoading,
		refetch,
	} = useGetDrivers(selectedFilter?.toUpperCase() as DriverStandingParams);
	const approveMutation = useApproveDriver();
	const rejectMutation = useRejectDriver();

	if (isError) toast.error("Error fetching customers details");

	const driverStats = [
		{
			label: "Total registered drivers",
			value: driverData?.totalDrivers,
			status: "high",
		},
		{
			label: "Total verified drivers",
			value: driverData?.verifiedDrivers,
			status: "high",
		},
		{
			label: "Total unverified drivers",
			value: driverData?.unverifiedDrivers,
			status: "low",
		},
		{
			label: "Total owing drivers",
			value: driverData?.owingDrivers,
			status: "low",
		},
	];

	const handleAction = async (id: "approve" | "reject") => {
		const selectedIds = selectedRows.map((row) => row.driverId);

		if (selectedIds.length === 0) {
			toast.error("No drivers selected!");
			return;
		}

		try {
			if (id === "approve") {
				await approveMutation.mutateAsync(selectedIds);
				toast.success("Drivers approved successfully");
			} else if (id === "reject") {
				await rejectMutation.mutateAsync(selectedIds);
				toast.success("Drivers rejected successfully");
			}

			refetch();
		} catch (error) {
			toast.error("Error processing request");
		}
	};

	return (
		<SectionWrapper headerTitle="Drivers">
			{isLoading ? (
				<SkeletonLoader />
			) : (
				<>
					<div className="card card-inner">
						{driverStats?.length &&
							driverStats.map(({ label, value, status }, idx) => (
								<div className="row-flex-btwn !items-start gap-4" key={idx}>
									<div className="flex-column gap-2.5">
										<span className="label">{label || "Total stats"}</span>
										<p
											className={clsx("font-semibold uppercase text-lg", {
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

					<div className="flex-column mt-10 gap-4">
						<div className="row-flex-btwn gap-3.5">
							<TableSearch
								placeholder="Search by name"
								columnFilters={columnFilters}
								setColumnFilters={setColumnFilters}
								filterBy="fullName"
							/>

							<Filters
								selectedFilter={selectedFilter}
								setSelectedFilter={setSelectedFilter}
								columnId="status"
								options={options}
								setColumnFilters={setColumnFilters}
								placeholder="Filter by status"
							/>
						</div>

						{selectedRows.length > 0 && (
							<div className="row-flex-btwn gap-3 rounded-sm bg-background-200 px-2.5 py-2 brightness-105 sm:gap-4">
								<p className="text-xs font-semibold">
									{selectedRows.length} row(s) selected
								</p>

								<div className="row-flex gap-2.5">
									<div
										className={cn("badge-long")}
										onClick={() => handleAction("approve")}
									>
										Approve
										{approveMutation.isPending && (
											<BtnLoader
												isLoading={approveMutation.isPending}
												color="#16a34a "
											/>
										)}
									</div>
									<div
										className={cn("badge-long")}
										onClick={() => handleAction("reject")}
									>
										Reject
										{rejectMutation.isPending && (
											<BtnLoader isLoading={rejectMutation.isPending} />
										)}
									</div>
								</div>
							</div>
						)}

						<DataTable
							columns={driverColumn}
							tableData={driverData?.data || []}
							columnFilters={columnFilters}
							setSelectedRows={setSelectedRows}
						/>
					</div>
				</>
			)}
		</SectionWrapper>
	);
}

export default Drivers;
