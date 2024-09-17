import { cn } from "@/lib/utils";
import { ArrowRight } from "@/constants/icons";
import { DataTable } from "@/components/table/DataTable";
import { useState } from "react";
import { driverColumn } from "@/components/table/columns/driverColumn";
import { ColumnFiltersState } from "@tanstack/react-table";
import { DriverType } from "@/types/server";
import { toast } from "sonner";
import { useGetDrivers } from "@/hook/useGetOverview";
import { SkeletonLoader } from "@/components/fallback/SkeletonLoader";

import clsx from "clsx";
import SectionWrapper from "@/layouts/SectionWrapper";
import TableSearch from "@/components/table/TableSearch";
import Filters from "@/components/table/filters";
import { useApproveDriver, useRejectDriver } from "@/hook/usePostQuery";

function Drivers() {
	const [selectedRows, setSelectedRows] = useState<DriverType[]>([]);
	const [selectedFilter, setSelectedFilter] = useState("all");
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const { data: driverData, isError, isLoading } = useGetDrivers();
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
	];

	const handleAction = async (id: "approve" | "reject") => {
		const selectedIds = selectedRows.map((row) => row.driverId);

		if (id === "approve") {
			try {
				// const response = await axios.post("/api/drivers/select", {
				// 	ids: selectedIds,
				// });
				// console.log("Request successful:", response);
			} catch (error) {
				console.error("Error sending request:", error);
			}
			return;
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

									<ArrowRight className="size-5 text-grey" />
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
								setColumnFilters={setColumnFilters}
							/>
						</div>

						<div className="row-flex-btwn gap-3 rounded-sm bg-background-200 px-2.5 py-2 brightness-105 sm:gap-4">
							{selectedRows.length > 0 ? (
								<p className="text-xs font-semibold">
									{selectedRows.length} row(s) selected
								</p>
							) : (
								<p className="text-xs font-semibold">No rows selected</p>
							)}

							<div className="row-flex gap-2.5">
								<div
									className={cn("action-styles")}
									onClick={() => handleAction("approve")}
								>
									Approve
								</div>
								<div
									className={cn("action-styles")}
									onClick={() => handleAction("reject")}
								>
									Reject
								</div>
							</div>
						</div>

						<DataTable
							columns={driverColumn}
							tableData={driverData?.data || []}
							columnFilters={columnFilters}
						/>
					</div>
				</>
			)}
		</SectionWrapper>
	);
}

export default Drivers;
