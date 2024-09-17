import { Dispatch, SetStateAction } from "react";
import dayjs from "dayjs";

// export function handleFallback(
//   error: Error | null,
//   loading: boolean,
// ): ReactNode {
//   if (error) return <ErrorModal />;

//   if (loading) return <Loading loading={loading} />;
// }

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

export const getDateRange = (value: string) => {
	const today = dayjs().format("YYYY-MM-DD");

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
				startDate: "2024-07-01", // You can modify this with actual custom input values
				endDate: "2024-09-09", // Modify this as needed
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

			// Reset after a few seconds
			setTimeout(() => {
				setCopiedStatus((prevStatus) => ({
					...prevStatus,
					[key]: false,
				}));
			}, 2000); // Reset the copy status after 2 seconds
		},
		(error) => {
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
