import { useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import { customerColumns } from "@/components/table/columns/customerColumn";
import { SkeletonLoader } from "@/components/fallback/SkeletonLoader";
import { Download } from "@/constants/icons";
import { toast } from "sonner";
import { useGetRiders } from "@/hook/useUsers";
import clsx from "clsx";
import SectionWrapper from "@/layouts/SectionWrapper";
import TableSearch from "@/components/table/TableSearch";
import DownloadReport from "@/components/DownloadReport";

function Customers() {
	const [columnFilters, setColumnFilters] = useState([]);
	const { data: ridersData, isError, isLoading } = useGetRiders();

	if (isError) toast.error("Error fetching customers details");

	const customerStats = [
		{
			label: "Total registered customers",
			value: ridersData?.totalRiders,
			status: "neutral",
		},
		{
			label: "Customers that have taken trips",
			value: ridersData?.totalRidersWithTrips,
			status: "high",
		},
		{
			label: "Customers that have not taken trips",
			value: ridersData?.totalRidersWithoutTrips,
			status: "low",
		},
	];

	return (
		<SectionWrapper
			headerTitle="Customers"
			customHeaderContent={
				<DownloadReport
					data={ridersData?.data || []}
					filename="Customers.xlsx"
					trigger={
						<>
							<Download className="size-4" />
							<p className="mt-0.5 font-semibold">Export</p>
						</>
					}
				/>
			}
		>
			{isLoading ? (
				<SkeletonLoader />
			) : (
				<>
					<div className="card card-inner">
						{customerStats?.length &&
							customerStats.map(({ label, value, status }, idx) => (
								<div className="row-flex-btwn !items-start gap-4" key={idx}>
									<div className="flex-column gap-2.5">
										<span className="label">{label}</span>
										<p
											className={clsx("font-semibold text-lg uppercase", {
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

					<div className="mt-10">
						<TableSearch
							placeholder="Search by name"
							filterBy="fullName"
							columnFilters={columnFilters}
							setColumnFilters={setColumnFilters}
						/>
					</div>

					<div className="mt-6">
						<DataTable
							columns={customerColumns}
							tableData={ridersData?.data || []}
							columnFilters={columnFilters}
						/>
					</div>
				</>
			)}
		</SectionWrapper>
	);
}

export default Customers;
