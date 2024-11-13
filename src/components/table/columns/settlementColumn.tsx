import { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "../../StatusBadge";
import { SettlementType } from "@/types/server";
import { truncateString } from "@/utils";
import SettlementActions from "@/app/(dashboard)/settlements/settlement-actions";

export const settlementColumn: ColumnDef<SettlementType>[] = [
	{
		accessorKey: "driverName",
		header: "Driver Name",
		cell: ({ row }) => (
			<p className="table-data-sm line-clamp-2">{row.original?.driver_name}</p>
		),
	},
	{
		accessorKey: "tripAmount",
		header: "Trip amount",
		cell: ({ row }) => (
			<p className="table-data-sm !text-center">
				&#8358;{row.original?.trip_amount}
			</p>
		),
	},
	{
		accessorKey: "transactionId",
		header: "Transaction ID",
		cell: ({ row }) => {
			const id = row.original?.transaction_id
				? truncateString(row.original?.transaction_id, 20)
				: "-";

			return <p className="table-data-sm !text-center">{id}</p>;
		},
	},

	{
		accessorKey: "date",
		header: "Date",
		cell: ({ row }) => <p className="table-data-sm">{row.original?.date}</p>,
	},
	{
		accessorKey: "driverCommission",
		header: "Driver Commission",
		cell: ({ row }) => (
			<p className="table-data-sm !text-center">
				&#8358;{row.original?.driver_commission}
			</p>
		),
	},
	{
		accessorKey: "percentage",
		header: "Percentage",
		cell: ({ row }) => (
			<p className="table-data-sm !text-center">{row.original?.percentage}%</p>
		),
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => (
			<div className="flex min-w-[80px] max-sm:px-2">
				<StatusBadge status={row.original?.status} />
			</div>
		),
		enableColumnFilter: true,
		enableSorting: false,
		filterFn: (row, columnId, filterValue) => {
			const status = row.getValue(columnId) as string;
			if (filterValue.toLowerCase() === "all" || filterValue === "")
				return true;

			return status?.toLowerCase() === filterValue.toLowerCase();
		},
	},
	{
		id: "actions",
		header: "Action",
		cell: ({ row }) => {
			const settlement = row.original;

			return <SettlementActions settlement={settlement} />;
		},
	},
];
