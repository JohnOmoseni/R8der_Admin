import { ColumnDef } from "@tanstack/react-table";
import { StaffType } from "../staffData";
import { StatusBadge } from "@/components/StatusBadge";

export const staffColumn: ColumnDef<StaffType>[] = [
	{
		accessorKey: "user",
		header: "User",
		cell: ({ row }) => <p className="table-data-sm">{row.original?.user}</p>,
		size: 100,
	},

	{
		accessorKey: "email",
		header: "Email",
		cell: ({ row }) => (
			<p className="table-data-sm !lowercase">{row.original?.email}</p>
		),
	},
	{
		accessorKey: "role",
		header: "Role",
		cell: ({ row }) => <p className="table-data-sm">{row.original?.role}</p>,
		enableColumnFilter: true,
		filterFn: (row, columnId, filterValue) => {
			const role = row.getValue(columnId) as string;
			if (filterValue.toLowerCase() === "all") return true;

			return role?.toLowerCase().includes(filterValue.toLowerCase());
		},
	},
	{
		accessorKey: "created_at",
		header: "Date added",
		cell: ({ row }) => (
			<p className="table-data-sm">{row.original?.created_at}</p>
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
	},
];
