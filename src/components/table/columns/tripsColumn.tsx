import { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "../../StatusBadge";
import { Link } from "react-router-dom";
import { TripsType } from "@/types/server";

export const tripsColumn: ColumnDef<TripsType>[] = [
	{
		accessorKey: "id",
		header: "Trip ID",
		cell: ({ row }) => (
			<p className="table-data-sm line-clamp-2">{row.original?.tripId}</p>
		),
		size: 100,
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
			const trip = row.original;
			return (
				<Link to={`/dashboard/trips/${trip.tripId}`} className="max-sm:px-2">
					<p className="badge !font-medium !px-5 py-2">View receipt</p>
				</Link>
			);
		},
	},
];
