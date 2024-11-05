import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

export const announcementsColumn: ColumnDef<any>[] = [
	{
		accessorKey: "broadcasts",
		header: "Broadcasts",
		cell: ({ row }) => (
			<p className="table-data-sm line-clamp-2">{row.original?.broadcasts}</p>
		),
		size: 100,
	},
	{
		accessorKey: "target",
		header: "Target",
		cell: ({ row }) => <p className="table-data-sm">{row.original?.target}</p>,
	},
	{
		accessorKey: "sub_target",
		header: "Sub-Target",
		cell: ({ row }) => (
			<p className="table-data-sm">{row.original?.sub_target}</p>
		),
	},
	{
		accessorKey: "date",
		header: "Date",
		cell: ({ row }) => <p className="table-data-sm">{row.original?.date}</p>,
	},
	{
		id: "actions",
		header: "Action",
		cell: ({ row }) => {
			const announcement = row.original;

			return (
				<div className="max-sm:px-2">
					<Link
						to={`/dashboard/customers/profile/${announcement?.riderId}`}
						className="w-full"
					>
						<div className="badge !px-5 py-2 sm:min-w-[100px]">View</div>
					</Link>
				</div>
			);
		},
	},
];
