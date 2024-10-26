//@ts-ignore
const rawData = {
	summary: [
		{ period: "2024-10-18", count: 1, amount: null },
		{ period: "2024-10-20", count: 1, amount: null },
		{ period: "2024-10-25", count: 1, amount: null },
	],
	totalCount: "3",
	totalAmount: "371.0",
};

export type ChartResponseData = {
	summary: { period: string; count: number; amount: number | null }[];
	totalCount: string;
	totalAmount: string;
};

export const defaultChartData = [
	{ month: "January", count: 186, amount: 80 },
	{ month: "February", count: 305, amount: 200 },
	{ month: "March", count: 237, amount: 120 },
];

const isValidDateString = (dateStr: string) => {
	// Check if the string is in the correct format (YYYY-MM-DD)
	const regex = /^\d{4}-\d{2}-\d{2}$/;
	if (!regex.test(dateStr)) return false;

	return true;
};

// Helper function to get month name from date
export const getMonthName = (dateStr: string) => {
	if (!isValidDateString(dateStr)) {
		return dateStr;
	}

	const date = new Date(dateStr);
	return date.toLocaleString("en-US", { month: "long" });
};
