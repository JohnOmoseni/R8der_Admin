import { useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import { SkeletonLoader } from "@/components/fallback/SkeletonLoader";
import { toast } from "sonner";

import { ColumnFiltersState } from "@tanstack/react-table";
import { FileDownload } from "@/constants/icons";
import { BtnLoader } from "@/components/fallback/FallbackLoader";
import { withdrawalColumn } from "@/components/table/columns/withdrawalColumn";
import { useGetWithdrawals } from "@/hook/useTransactions";
import SectionWrapper from "@/layouts/SectionWrapper";
import TableSearch from "@/components/table/TableSearch";
import SelectDropdown from "@/components/ui/components/SelectDropdown";

const options = [
	{ label: "All", value: "all" },
	{ label: "Success", value: "successful" },
	{ label: "Pending", value: "pending" },
	{ label: "Failed", value: "failed" },
];

function Withdrawals() {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const { data: withdrawalData, isLoading, isError } = useGetWithdrawals();

	const isDownloading = false;

	if (isError) toast.error("Error fetching information");

	const handleClick = () => {};

	return (
		<SectionWrapper
			headerTitle={`Withdrawals: (${withdrawalData?.length || 0})`}
		>
			{isLoading ? (
				<SkeletonLoader loaderVariant />
			) : (
				<>
					<div className="mt-5 row-flex-btwn gap-4">
						<TableSearch
							placeholder="Search by customer name, amount, trip ID"
							filterBy="fullName"
							columnFilters={columnFilters}
							setColumnFilters={setColumnFilters}
						/>

						<div className="row-flex gap-2">
							<SelectDropdown
								// defaultValue={options[0]}
								options={options}
								onChangeHandler={handleClick}
								placeholder="Status"
								isArrowDown={true}
							/>

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
						<DataTable
							columns={withdrawalColumn}
							tableData={withdrawalData || []}
							columnFilters={columnFilters}
						/>
					</div>
				</>
			)}
		</SectionWrapper>
	);
}

export default Withdrawals;
