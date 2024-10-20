import { useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import { Calendar, Volume, Wallet } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { tripsColumn } from "@/components/table/columns/driverTripColumn";

import clsx from "clsx";
import TableSearch from "@/components/table/TableSearch";
import SelectDropdown from "@/components/ui/components/SelectDropdown";

const statusOptions = [
	{ label: "Completed", value: "completed" },
	{ label: "Cancelled", value: "cancelled" },
];

const selectOptions = [
	{ label: "Today", value: "today" },
	{ label: "Yesterday", value: "yesterday" },
	{ label: "Last 7 days", value: "week" },
	{ label: "Last 30 days", value: "month" },
	{ label: "This Year", value: "year" },
];

function Trips({ riderData }: { riderData: any }) {
	const [selectedDateRange, setSelectedDateRange] = useState("today");
	const [columnFilters, setColumnFilters] = useState([]);

	const handleDateChange = (value: string | Date) => {
		console.log(value);
	};
	const handleSelectClick = () => {};

	const tripsStats = [
		{
			label: "Total Trips",
			value: riderData?.totalTrips || "0",
		},
		{
			label: "Total Amount Paid",
			value: riderData?.totalAmountPaid || "0",
		},
	];

	return (
		<div className="flex-column gap-6">
			<div className="card card-inner">
				{tripsStats?.length &&
					tripsStats.map(({ label, value }, idx) => (
						<div
							className="grid grid-cols-[1fr_max-content] items-center gap-4"
							key={idx}
						>
							<div className="flex-column gap-1">
								<span className="grey-text">{label}</span>
								<h3 className={clsx("font-bold !leading-6 text-lg sm:text-xl")}>
									{label.includes("Total Amount Paid") ? `NGN ${value}` : value}
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

			<div className="row-flex-btwn gap-4">
				<TableSearch
					placeholder="Search by amount"
					filterBy="amount"
					columnFilters={columnFilters}
					setColumnFilters={setColumnFilters}
				/>

				<div className="row-flex gap-2">
					<SelectDropdown
						placeholder="Status"
						options={statusOptions}
						onChangeHandler={handleSelectClick}
						isArrowDown={true}
					/>

					<SelectDropdown
						trigger={
							<div className="row-flex gap-2 leading-3">
								<Calendar className="size-4" />
								{selectedDateRange}
							</div>
						}
						placeholder="Custom"
						defaultValue={selectOptions[0]}
						options={selectOptions}
						onChangeHandler={handleSelectClick}
						isArrowDown={true}
					/>
				</div>
			</div>

			<div className="mt-2">
				<DataTable
					columns={tripsColumn}
					columnFilters={columnFilters}
					tableData={riderData?.riderTrips || []}
				/>
			</div>
		</div>
	);
}

export default Trips;
