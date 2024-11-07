import { useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import { SkeletonLoader } from "@/components/fallback/SkeletonLoader";
import { toast } from "sonner";

import { ColumnFiltersState } from "@tanstack/react-table";
import { FileDownload } from "@/constants/icons";
import { BtnLoader } from "@/components/fallback/FallbackLoader";
import { settlementColumn } from "@/components/table/columns/settlementColumn";
import { useGetSettlements } from "@/hook/useTransactions";

import SectionWrapper from "@/layouts/SectionWrapper";
import Filters from "@/components/table/filters";
import DownloadReport from "@/components/DownloadReport";
import TableGlobalSearch from "@/components/table/TableGlobalSearch";

const options = [
	{ label: "All", value: "all" },
	{ label: "Paid", value: "paid" },
	{ label: "Pending", value: "pending" },
	{ label: "Failed", value: "failed" },
];

function Settlements() {
	const { data: settlementData, isLoading, isError } = useGetSettlements();
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [selectedFilter, setSelectedFilter] = useState("");
	const [globalFilter, setGlobalFilter] = useState("");

	const isDownloading = false;

	if (isError) toast.error("Error fetching information");

	return (
		<SectionWrapper headerTitle="Settlements">
			{isLoading ? (
				<SkeletonLoader loaderVariant />
			) : (
				<>
					<div className="mt-3.5 flex-column sm:row-flex-btwn gap-y-3 gap-x-4">
						<TableGlobalSearch
							placeholder="Search by customer name, amount, ID"
							globalValue={globalFilter}
							onChange={(value: string) => setGlobalFilter(value)}
						/>

						<div className="row-flex  max-[500px]:!justify-end  gap-2">
							<Filters
								placeholder="Status"
								columnId="status"
								showAsDropdown={true}
								options={options}
								isArrowDown={true}
								selectedFilter={selectedFilter}
								setSelectedFilter={setSelectedFilter}
								setColumnFilters={setColumnFilters}
							/>

							<DownloadReport
								data={settlementData || []}
								filename={"Settlement Transactions.xlsx"}
								trigger={
									<>
										<p className="mt-0.5 font-semibold capitalize">
											{isDownloading ? "Downloading" : "Download report"}
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
							columns={settlementColumn}
							tableData={settlementData || []}
							columnFilters={columnFilters}
							globalFilter={globalFilter}
						/>
					</div>
				</>
			)}
		</SectionWrapper>
	);
}

export default Settlements;
