import { useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import { SkeletonLoader } from "@/components/fallback/SkeletonLoader";
import { toast } from "sonner";

import { ColumnFiltersState } from "@tanstack/react-table";
import { FileDownload } from "@/constants/icons";
import { BtnLoader } from "@/components/fallback/FallbackLoader";
import { settlementColumn } from "@/components/table/columns/settlementColumn";

import SectionWrapper from "@/layouts/SectionWrapper";
import TableSearch from "@/components/table/TableSearch";
import SelectDropdown from "@/components/ui/components/SelectDropdown";

const options = [
	{ label: "All", value: "all" },
	{ label: "Success", value: "successful" },
	{ label: "Pending", value: "pending" },
	{ label: "Failed", value: "failed" },
];

function Settlements() {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const isError = false;
	const isLoading = false;

	if (isError) toast.error("Error fetching information");
	const isDownloading = false;

	const handleClick = () => {};

	return (
		<SectionWrapper headerTitle="Settlements">
			{isLoading ? (
				<SkeletonLoader loaderVariant />
			) : (
				<>
					<div className="mt-5 row-flex-btwn gap-4">
						<TableSearch
							placeholder="Search by customer name, amount, txn ID"
							filterBy="fullName"
							columnFilters={columnFilters}
							setColumnFilters={setColumnFilters}
						/>

						<div className="row-flex gap-2">
							<SelectDropdown
								defaultValue={options[0]}
								options={options}
								onChangeHandler={handleClick}
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
							columns={settlementColumn}
							tableData={[]}
							columnFilters={columnFilters}
						/>
					</div>
				</>
			)}
		</SectionWrapper>
	);
}

export default Settlements;
