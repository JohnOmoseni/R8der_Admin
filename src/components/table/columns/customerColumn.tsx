import { GetRidersResponse } from "@/types/server";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

export const customerColumns: ColumnDef<GetRidersResponse>[] = [
	{
		id: "fullName",
		header: "Full name",
		accessorFn: (row) => `${row.firstName} ${row.lastName}`,
		cell: ({ row }) => (
			<p className="table-data-sm">{`${row.original.firstName} ${row.original.lastName}`}</p>
		),
	},

	{
		accessorKey: "email",
		header: "Email",
		cell: ({ row }) => (
			<p className="table-data-sm !lowercase">{row.original.email}</p>
		),
	},
	{
		accessorKey: "phone",
		header: "Phone number",
		cell: ({ row }) => <p className="table-data-sm">{row.original.phone}</p>,
	},
	{
		accessorKey: "created_at",
		header: "Date created",
		cell: ({ row }) => (
			<p className="table-data-sm">{row.original.dateCreated}</p>
		),
	},
	{
		accessorKey: "trips",
		header: "Trips",
		cell: ({ row }) => (
			<p className="table-data-sm !text-center">{row.original.trips}</p>
		),
	},
	{
		id: "actions",
		header: "actions",
		cell: ({ row }) => {
			const customer = row.original;

			return (
				<div className="max-sm:px-2">
					<Link
						to={`/dashboard/customers/profile/${customer.riderId}`}
						className="w-full"
					>
						<div className="badge !px-5 py-2 sm:min-w-[100px]">View</div>
					</Link>
				</div>
			);
		},
	},
];
