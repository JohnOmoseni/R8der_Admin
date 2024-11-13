import { WithdrawType } from "@/types/server";
import { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "../../StatusBadge";
import { truncateString } from "@/utils";

export const driverWithdrawalColumn: ColumnDef<WithdrawType>[] = [
	{
		accessorKey: "type",
		header: "Type",
		cell: ({ row }) => <p className="table-data-sm">{row.original.type}</p>,
	},

	{
		accessorKey: "refId",
		header: "Reference ID",
		cell: ({ row }) => {
			const id = row.original?.refId
				? truncateString(row.original?.refId, 20)
				: "-";

			return <p className="table-data-sm !lowercase">{id}</p>;
		},
	},
	{
		accessorKey: "amount",
		header: "Amount",
		cell: ({ row }) => <p className="table-data-sm">{row.original.amount}</p>,
	},
	{
		accessorKey: "bank",
		header: "Destination Bank",
		cell: ({ row }) => <p className="table-data-sm">{row.original.bank}</p>,
	},
	{
		accessorKey: "accountNo",
		header: "Account number",
		cell: ({ row }) => (
			<p className="table-data-sm">{row.original.accountNo}</p>
		),
	},
	{
		accessorKey: "date",
		header: "Date",
		cell: ({ row }) => <p className="table-data-sm">{row.original.date}</p>,
	},
	{
		accessorKey: "status",
		header: () => <div className="ml-3 font-semibold">Status</div>,
		cell: ({ row }) => (
			<div className="flex min-w-[80px] max-sm:px-2">
				<StatusBadge status={row.original?.status!} />
			</div>
		),
	},
];
