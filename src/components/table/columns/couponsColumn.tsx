import { ColumnDef } from "@tanstack/react-table";
import { CouponResponseType } from "@/types/server";
import { StatusBadge } from "@/components/StatusBadge";
import CouponActions from "@/app/(dashboard)/settings/CouponActions";

export const couponsColumn: ColumnDef<CouponResponseType>[] = [
	{
		accessorKey: "code",
		header: "Code",
		cell: ({ row }) => (
			<p className="table-data-sm line-clamp-2">{row.original?.code}</p>
		),
		size: 100,
	},
	{
		accessorKey: "description",
		header: "Description",
		cell: ({ row }) => (
			<p className="table-data-sm">{row.original?.description}</p>
		),
	},
	{
		accessorKey: "target",
		header: "Target",
		cell: ({ row }) => (
			<p className="table-data-sm">
				{row.original?.target === "DRIVERS" ? "Drivers" : "Customers"}
			</p>
		),
	},
	{
		accessorKey: "type",
		header: "Type",
		cell: ({ row }) => (
			<p className="table-data-sm">
				{row.original?.discountType === "PERCENTAGE" ? "Percentage" : "Fixed"}
			</p>
		),
	},
	{
		accessorKey: "amount",
		header: "Amount",
		cell: ({ row }) => (
			<p className="table-data-sm !text-center">{row.original?.amount}</p>
		),
	},
	{
		accessorKey: "expiryDate",
		header: "Expiry Date",
		cell: ({ row }) => (
			<p className="table-data-sm">{row.original?.expiryDate as string}</p>
		),
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => (
			<div className="flex min-w-[80px] max-sm:px-2">
				<StatusBadge
					status={row.original?.active === true ? "Active" : "Inactive"}
				/>
			</div>
		),
		enableColumnFilter: true,
	},
	{
		id: "actions",
		header: "Action",
		cell: ({ row }) => {
			const coupon = row.original;
			return <CouponActions coupon={coupon} />;
		},
	},
];
