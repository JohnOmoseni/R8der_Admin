import { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "../../StatusBadge";
import { WithdrawalType } from "@/types/server";
import { SheetMenu } from "@/components/ui/components/SheetMenu";
import Receipt from "@/app/(dashboard)/_sections/Receipt";

export const withdrawalColumn: ColumnDef<WithdrawalType>[] = [
	{
		accessorKey: "customerName",
		header: "Customer Name",
		cell: ({ row }) => (
			<p className="table-data-sm line-clamp-2">{row.original?.customerName}</p>
		),
	},
	{
		accessorKey: "amount",
		header: "Amount",
		cell: ({ row }) => (
			<p className="table-data-sm !text-center">
				&#8358;{row.original?.amount}
			</p>
		),
	},
	{
		accessorKey: "transactionId",
		header: "Transaction ID",
		cell: ({ row }) => (
			<p className="table-data-sm !text-center">
				{row.original?.transactionId}
			</p>
		),
	},

	{
		accessorKey: "date",
		header: "Date",
		cell: ({ row }) => <p className="table-data-sm">{row.original?.date}</p>,
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
		filterFn: (row, columnId, filterStatuses) => {
			if (filterStatuses.length === 0) true;
			const status = row.getValue(columnId);

			return filterStatuses.includes(status);
		},
	},
	{
		id: "actions",
		header: "Action",
		cell: ({ row }) => {
			const withdrawal = row.original;

			return (
				<SheetMenu
					trigger={<div className="badge-long">View receipt</div>}
					content={<Receipt details={withdrawal} type="withdrawalReceipt" />}
				/>
			);
		},
	},
];
