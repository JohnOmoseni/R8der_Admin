import clsx from "clsx";

import { Status } from "@/types";

export const StatusBadge = ({ status }: { status: Status }) => {
	const green = [
		"VERIFIED",
		"COMPLETED",
		"REQUESTED",
		"ACCEPTED",
		"SUCCESS",
		"ACTIVE",
	];
	const error = ["CANCELLED", "NOT_VERIFIED", "FAILED", "NOT_VERIFIED"];
	const yellow = ["IN_PROGRESS", "PENDING"];

	return (
		<div
			className={clsx("row-flex rounded-full bg-blue-200 px-2.5 py-1.5", {
				"bg-green-300": green.includes(status),
				"bg-red-200": error.includes(status),
				"bg-yellow-200": yellow.includes(status),
			})}
		>
			<p
				className={clsx(
					"whitespace-nowrap text-xs text-blue-500 font-medium !capitalize",
					{
						"text-green-600": green.includes(status),
						"text-red-500": error.includes(status),
						"text-yellow-500": yellow.includes(status),
					}
				)}
			>
				{status || "Unknown"}
			</p>
		</div>
	);
};
