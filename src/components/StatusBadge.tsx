import clsx from "clsx";

import { Status } from "@/types";
import { toTitleCase } from "@/utils";

export const StatusBadge = ({ status }: { status: Status }) => {
	const green = [
		"VERIFIED",
		"COMPLETED",
		"APPROVED",
		"REQUESTED",
		"ACCEPTED",
		"SUCCESS",
		"ACTIVE",
		"PAID",
		"Verified",
		"Active",
	];
	const error = [
		"CANCELLED",
		"NOT_VERIFIED",
		"FAILED",
		"NOT_VERIFIED",
		"Not Verified",
		"Deactivated",
	];
	const yellow = ["IN_PROGRESS", "PENDING"];

	return (
		<div
			className={clsx("row-flex rounded-full bg-blue-200 px-3 py-1.5", {
				"bg-green-200": green.includes(status),
				"bg-red-100": error.includes(status),
				"bg-yellow-100": yellow.includes(status),
			})}
		>
			<p
				className={clsx(
					"whitespace-nowrap text-xs text-blue-500 font-medium !capitalize",
					{
						"text-green-700": green.includes(status),
						"text-red-600": error.includes(status),
						"text-yellow-600": yellow.includes(status),
					}
				)}
			>
				{toTitleCase(status || "") || "Unknown"}
			</p>
		</div>
	);
};
