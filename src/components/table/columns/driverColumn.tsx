import { Link } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "../../StatusBadge";
import { DriverType } from "@/types/server";

export const driverColumn: ColumnDef<DriverType>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<input
				type="checkbox"
				// Select all rows if this is checked
				checked={table.getIsAllRowsSelected()}
				onChange={table.getToggleAllRowsSelectedHandler()}
			/>
		),
		cell: ({ row }) => (
			<input
				type="checkbox"
				checked={row.getIsSelected()}
				onChange={row.getToggleSelectedHandler()}
			/>
		),
	},
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
			<p className="table-data-sm !lowercase">{row.original?.email}</p>
		),
	},
	{
		accessorKey: "phone",
		header: "Phone number",
		cell: ({ row }) => <p className="table-data-sm">{row.original?.phone}</p>,
	},

	{
		accessorKey: "status",
		header: () => <div className="ml-3 font-semibold">Status</div>,
		cell: ({ row }) => (
			<div className="flex min-w-[80px] max-sm:px-2">
				<StatusBadge status={row.original?.status!} />
			</div>
		),
		enableColumnFilter: true,
		filterFn: (row, columnId, filterValue) => {
			const status = row.getValue(columnId) as string;
			if (filterValue.toLowerCase() === "all") return true;

			return status?.toLowerCase() === filterValue.toLowerCase();
		},
	},
	{
		accessorKey: "totalTrips",
		header: "Total trips",
		cell: ({ row }) => (
			<p className="table-data-sm  !text-center">{row.original?.trips}</p>
		),
	},
	{
		id: "actions",
		header: () => (
			<div className="ml-1 font-semibold min-[430px]:ml-4">Action</div>
		),
		cell: ({ row }) => {
			const driver = row.original;
			return (
				<div className="max-sm:px-2">
					<Link
						to={`/dashboard/drivers/profile/${driver.driverId}`}
						className="w-full"
					>
						<div className="badge !px-5 py-2 sm:min-w-[100px]">View</div>
					</Link>
				</div>
			);
		},
	},
];
