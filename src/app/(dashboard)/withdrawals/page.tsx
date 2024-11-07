import { useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import { SkeletonLoader } from "@/components/fallback/SkeletonLoader";
import { toast } from "sonner";

import { FileDownload } from "@/constants/icons";
import { BtnLoader } from "@/components/fallback/FallbackLoader";
import { withdrawalColumn } from "@/components/table/columns/withdrawalColumn";
import { useGetWithdrawals } from "@/hook/useTransactions";
import SectionWrapper from "@/layouts/SectionWrapper";
import TableGlobalSearch from "@/components/table/TableGlobalSearch";
import DownloadReport from "@/components/DownloadReport";
import Filters from "@/components/table/filters";

const options = [
	{ label: "All", value: "all" },
	{ label: "Success", value: "successful" },
	{ label: "Pending", value: "pending" },
	{ label: "Failed", value: "failed" },
];

function Withdrawals() {
	const { data: withdrawalData, isLoading, isError } = useGetWithdrawals();
	const [selectedFilter, setSelectedFilter] = useState("");
	const [globalFilter, setGlobalFilter] = useState("");
	const [columnFilters, setColumnFilters] = useState([]);

	const isDownloading = false;

	if (isError) toast.error("Error fetching information");

	return (
		<SectionWrapper
			headerTitle={`Withdrawals: (${withdrawalData?.length || 0})`}
		>
			{isLoading ? (
				<SkeletonLoader loaderVariant />
			) : (
				<>
					<div className="mt-5 flex-column min-[500px]:row-flex-btwn gap-y-3 gap-x-4">
						<TableGlobalSearch
							placeholder="Search by customer name, amount, trip ID"
							globalValue={globalFilter}
							onChange={(value: string) => setGlobalFilter(value)}
						/>

						<div className="row-flex max-[500px]:!justify-end gap-2">
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
								data={withdrawalData || []}
								filename={"Transactions.xlsx"}
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
							columns={withdrawalColumn}
							tableData={withdrawalData || []}
							globalFilter={globalFilter}
							columnFilters={columnFilters}
						/>
					</div>
				</>
			)}
		</SectionWrapper>
	);
}

export default Withdrawals;
