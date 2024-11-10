import { ArrowUpRight } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { PropsWithChildren, ReactNode } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx/xlsx.mjs";
import { toast } from "sonner";

type Props = {
	data: any;
	sheet_name?: string;
	filename?: string;
	title?: string;
	trigger?: ReactNode;
};

function DownloadReport({
	data = [],
	filename,
	sheet_name = "Sheet 1",
	title,
	trigger,
	children,
}: Props & PropsWithChildren) {
	// DOWNLOAD DATA AS EXCEL DATA
	const onDownload = async () => {
		if (!Array.isArray(data) || data?.length === 0) {
			console.error("Invalid data for table export");
			toast.info("No data available for table export");
			return;
		}
		const worksheet = XLSX.utils.json_to_sheet(data);
		const workbook = XLSX.utils.book_new();

		XLSX.utils.book_append_sheet(workbook, worksheet, sheet_name);
		XLSX.writeFile(workbook, filename || "default-filename.xlsx");
	};

	// @ts-ignore
	const downloadCSV = () => {
		const csv = data.map((row: any) => Object.values(row).join(",")).join("\n");
		const blob = new Blob([`${title}\n\n${csv}`], {
			type: "text/csv;charset=utf-8;",
		});
		saveAs(blob, `${title}.csv`);
	};

	return (
		<div
			className={cn(children ? "" : "badge self-center leading-3")}
			onClick={onDownload}
		>
			{children ? (
				children
			) : trigger ? (
				trigger
			) : (
				<>
					<ArrowUpRight className="size-4" />
					<p className=" font-semibold">{title || "Export"}</p>
				</>
			)}
		</div>
	);
}

export default DownloadReport;
