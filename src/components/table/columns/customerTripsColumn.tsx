import { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "../../StatusBadge";
import { TripsType } from "@/types/server";
import { SheetMenu } from "@/components/ui/components/SheetMenu";
import { truncateString } from "@/utils";
import Receipt from "@/app/(dashboard)/_sections/Receipt";

export const customerTripsColumn: ColumnDef<TripsType>[] = [
	{
		accessorKey: "riderName",
		header: "Customer Name",
		cell: ({ row }) => (
			<p className="table-data-sm line-clamp-2">
				{row.original?.riderName || "Unknown"}
			</p>
		),
	},
	{
		accessorKey: "tripId",
		header: "Trip ID",
		cell: ({ row }) => {
			const id = row.original?.tripId
				? truncateString(row.original?.tripId, 20)
				: "-";

			return <p className="table-data-sm">{id}</p>;
		},
	},

	{
		accessorKey: "amount",
		header: "Amount",
		cell: ({ row }) => (
			<p className="table-data-sm !text-center">{row.original?.amount}</p>
		),
	},
	{
		accessorKey: "date",
		header: "Date",
		cell: ({ row }) => <p className="table-data-sm">{row.original?.date}</p>,
		enableColumnFilter: false,
		enableGlobalFilter: false,
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
			if (filterValue.toLowerCase() === "all") return true;

			return status?.toLowerCase() === filterValue.toLowerCase();
		},
	},
	{
		id: "actions",
		header: "Action",
		cell: ({ row }) => {
			const trip = row.original;

			return (
				<SheetMenu
					trigger={<div className="badge-long">View receipt</div>}
					content={
						<Receipt
							details={trip}
							id={trip.tripId}
							type="tripReceipt"
							specificType="customer_receipt"
						/>
					}
				/>
			);
		},
	},
];
