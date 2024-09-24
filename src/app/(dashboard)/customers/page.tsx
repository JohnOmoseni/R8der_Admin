import { useState } from "react";
import { ArrowRight } from "@/constants/icons";
import { DataTable } from "@/components/table/DataTable";
import { customerColumns } from "@/components/table/columns/customerColumn";
import { useGetRiders } from "@/hook/useGetOverview";
import { SkeletonLoader } from "@/components/fallback/SkeletonLoader";
import { toast } from "sonner";
import clsx from "clsx";
import SectionWrapper from "@/layouts/SectionWrapper";
import TableSearch from "@/components/table/TableSearch";

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
		<SectionWrapper headerTitle="Customers">
			{isLoading ? (
				<SkeletonLoader />
			) : (
				<>
					<div className="card card-inner">
						{customerStats?.length &&
							customerStats.map(({ label, value, status }, idx) => (
								<div className="row-flex-btwn !items-start gap-4" key={idx}>
									<div className="flex-column gap-3">
										<span className="label">{label}</span>
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
