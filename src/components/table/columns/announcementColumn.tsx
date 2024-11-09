import { AnnouncementType } from "@/types/server";
import { stripHtmlTags } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";

type ColumnsProps = {
	setOpenPreview: React.Dispatch<React.SetStateAction<boolean>>;
	setPreviewInfo: React.Dispatch<
		React.SetStateAction<AnnouncementType | undefined>
	>;
};

export const useAnnouncementsColumn = ({
	setOpenPreview,
	setPreviewInfo,
}: ColumnsProps): ColumnDef<any>[] => {
	return [
		{
			accessorKey: "content",
			header: "Broadcasts",
			cell: ({ row }) => (
				<p className="table-data-sm line-clamp-3">
					{stripHtmlTags(row.original?.content)}
				</p>
			),
		},
		{
			accessorKey: "targetAudience",
			header: "Target",
			cell: ({ row }) => (
				<p className="table-data-sm">{row.original?.targetAudience}</p>
			),
		},
		{
			accessorKey: "subTargetAudience",
			header: "Sub-Target",
			cell: ({ row }) => (
				<p className="table-data-sm">{row.original?.subTargetAudience}</p>
			),
		},
		{
			accessorKey: "publishDate",
			header: "Date",
			cell: ({ row }) => (
				<p className="table-data-sm">{row.original?.publishDate}</p>
			),
		},
		{
			id: "actions",
			header: "Action",
			cell: ({ row }) => {
				const announcement = row.original;

				return (
					<div
						className="max-sm:px-2"
						onClick={() => {
							setOpenPreview(true);
							setPreviewInfo(announcement);
						}}
					>
						<div className="badge !px-5 py-2 sm:min-w-[100px]">View</div>
					</div>
				);
			},
		},
	];
};
