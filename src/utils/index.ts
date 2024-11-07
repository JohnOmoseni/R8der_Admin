import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import dayjs from "dayjs";

export const handleApiError = (error: any, message?: string) => {
	console.error(`API Error - ${message}:`, error);
	if (error.response) {
		// Server returned a responnse not in the 200 range
		console.error("Response data:", error.response.data);
		console.error("Response status:", error.response.status);
	} else if (error.request) {
		console.error("Request data:", error.request);
	} else {
		// No response from server - 404
		console.error("Error message:", error.message);
	}
	throw error;
};

export function getInitials(name: string) {
	if (!name) return "TA";
	return name
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase())
		.join("");
}

export function toTitleCase(value: unknown): string {
	if (typeof value !== "string") {
		return "";
	}

	return value
		?.split("_")
		?.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter of each word
		?.join(" ");
}

export const getDateRange = (value: string | Date) => {
	const today = dayjs().format("YYYY-MM-DD");

	if (value instanceof Date) {
		const formattedDate = dayjs(value).format("YYYY-MM-DD");
		return {
			startDate: formattedDate,
			endDate: today,
		};
	}

	switch (value) {
		case "today":
			return {
				startDate: today,
				endDate: today,
			};
		case "yesterday":
			return {
				startDate: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
				endDate: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
			};
		case "week":
			return {
				startDate: dayjs().subtract(7, "day").format("YYYY-MM-DD"),
				endDate: today,
			};
		case "month":
			return {
				startDate: dayjs().subtract(30, "day").format("YYYY-MM-DD"),
				endDate: today,
			};
		case "year":
			return {
				startDate: dayjs().startOf("year").format("YYYY-MM-DD"),
				endDate: today,
			};
		case "custom":
			// Assuming you will let the user input custom dates in the UI
			return {
				startDate: "2024-07-01",
				endDate: "2024-09-09",
			};
		default:
			return {
				startDate: today,
				endDate: today,
			};
	}
};

export const copyToClipBoard = (
	text: string,
	key: string,
	setCopiedStatus: Dispatch<SetStateAction<Record<string, boolean>>>
) => {
	navigator.clipboard.writeText(text).then(
		() => {
			setCopiedStatus((prevStatus) => ({
				...prevStatus,
				[key]: true,
			}));

			setTimeout(() => {
				setCopiedStatus((prevStatus) => ({
					...prevStatus,
					[key]: false,
				}));
			}, 2000); // Reset the copy status after 2 seconds
		},
		(error) => {
			toast.error("Error copying text", { description: error.message });
			setCopiedStatus((prevStatus) => ({
				...prevStatus,
				[key]: false,
			}));
		}
	);
};

export const wait = (ms: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
};
