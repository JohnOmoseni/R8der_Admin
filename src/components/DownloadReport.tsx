import { ArrowUpRight } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx/xlsx.mjs";

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
}: Props) {
	const onDownload = async () => {
		if (!Array.isArray(data)) {
			console.error("Invalid data for table export");
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
			className={cn(
				"badge !grid grid-cols-[max-content,_1fr] !gap-2 !px-4",
				""
			)}
			onClick={onDownload}
		>
			{trigger ? (
				trigger
			) : (
				<>
					<ArrowUpRight className="size-4" />
					<p className="mt-0.5 font-semibold">{title || "Export"}</p>
				</>
			)}
		</div>
	);
}

export default DownloadReport;
