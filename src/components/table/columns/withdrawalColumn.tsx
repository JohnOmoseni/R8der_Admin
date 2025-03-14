import { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "../../StatusBadge";
import { WithdrawalType } from "@/types/server";
import { SheetMenu } from "@/components/ui/components/SheetMenu";
import { truncateString } from "@/utils";
import Receipt from "@/app/(dashboard)/_sections/Receipt";

export const withdrawalColumn: ColumnDef<WithdrawalType>[] = [
	{
		accessorKey: "customer_name",
		header: "Customer Name",
		cell: ({ row }) => (
			<p className="table-data-sm line-clamp-2">
				{row.original?.customer_name}
			</p>
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
		accessorKey: "transaction_id",
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
		enableColumnFilter: false,
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
			const withdrawal = row.original;

			return (
				<SheetMenu
					trigger={<div className="badge-long">View receipt</div>}
					content={
						<Receipt
							details={withdrawal}
							id={withdrawal.transaction_id}
							type="transactionReceipt"
							specificType="withdrawal_receipt"
						/>
					}
				/>
			);
		},
	},
];
