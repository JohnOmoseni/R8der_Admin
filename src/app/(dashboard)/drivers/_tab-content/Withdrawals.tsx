import { useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import { withdrawColumn } from "@/components/table/columns/withdrawColumn";
import { WithdrawType } from "@/types/server";
import Filters from "@/components/table/filters";
import TableSearch from "@/components/table/TableSearch";
import { ColumnFiltersState } from "@tanstack/react-table";

function Withdrawals({ withdrawals }: { withdrawals?: Array<WithdrawType> }) {
	const [selectedFilter, setSelectedFilter] = useState("all");
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	return (
		<div className="flex-column gap-4">
			<div className="row-flex-btwn gap-4">
				<TableSearch
					placeholder="Search by amount"
					columnFilters={columnFilters}
					setColumnFilters={setColumnFilters}
					filterBy="amount"
				/>

				<Filters
					selectedFilter={selectedFilter}
					setSelectedFilter={setSelectedFilter}
				/>
			</div>

			<DataTable columns={withdrawColumn} tableData={withdrawals || []} />
		</div>
	);
}

export default Withdrawals;
