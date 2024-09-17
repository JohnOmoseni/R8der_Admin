import { Bar, BarChart, XAxis } from "recharts";

import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
	{ month: "January", desktop: 186, mobile: 80 },
	{ month: "February", desktop: 305, mobile: 200 },
	{ month: "March", desktop: 237, mobile: 120 },
	{ month: "April", desktop: 73, mobile: 190 },
	{ month: "May", desktop: 209, mobile: 130 },
	{ month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "var(--chart-1)",
	},
	mobile: {
		label: "Mobile",
		color: "var(--chart-2)",
	},
} satisfies ChartConfig;

export function BarChartComponent() {
	return (
		<ChartContainer
			config={chartConfig}
			className="max-h-[440px] min-h-[200px] w-full"
		>
			<BarChart accessibilityLayer data={chartData}>
				<XAxis
					dataKey="month"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					tickFormatter={(value) => value.slice(0, 3)}
					color="#5F738C"
				/>

				<ChartTooltip content={<ChartTooltipContent />} />
				<ChartLegend content={<ChartLegendContent />} />

				<Bar dataKey="mobile" fill="var(--color-mobile)" radius={8} />
				<Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
			</BarChart>
		</ChartContainer>
	);
}
