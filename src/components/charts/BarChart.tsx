import { Bar, BarChart, XAxis } from "recharts";

import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const chartConfig = {
	count: {
		label: "Count",
		color: "var(--chart-1)",
	},
	amount: {
		label: "Amount",
		color: "var(--chart-2)",
	},
} satisfies ChartConfig;

export function BarChartComponent({ data }: { data: any }) {
	const [chartData, setChartData] = useState<any>();

	useEffect(() => {
		setChartData(data?.summary);
	}, [data?.summary]);

	return chartData && chartData?.length > 0 ? (
		<ChartContainer
			config={chartConfig}
			className={cn("w-full min-h-[200px] max-h-[350px]")}
		>
			<BarChart
				accessibilityLayer
				data={chartData && chartData?.length > 0 ? chartData : ([] as any)}
			>
				<XAxis
					dataKey="period"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					tickFormatter={(value) => value}
					color="#5F738C"
				/>

				<ChartTooltip content={<ChartTooltipContent />} />
				<ChartLegend content={<ChartLegendContent />} />

				<Bar dataKey="count" fill="var(--color-count)" radius={8} />
				<Bar dataKey="amount" fill="var(--color-amount)" radius={8} />
			</BarChart>
		</ChartContainer>
	) : (
		<h3 className="text-center h-[200px] grid place-items-center text-gray-400">
			No data available
		</h3>
	);
}
