import { Dispatch, SetStateAction } from "react";

type Props = {
	setSelectedFilter: Dispatch<SetStateAction<string>>;
	selectedFilter: string;
	isSelected?: string;
	columnFilters?: any;
	setColumnFilters?: any;
	status: any;
};

function Filters({ columnFilters, status, setColumnFilters }: Props) {
	// @ts-ignore
	const selectedStyle = "!bg-foreground text-secondary-foreground shadow-sm";
	const filterStatuses =
		columnFilters.find((f: any) => f.id === status)?.value || [];
	const isActive = filterStatuses.includes(status.id);
	// @ts-ignore
	const onClick = () => {
		// setColumnFilters([{id: "status", value: [1]}])
		setColumnFilters((prev: any) => {
			const statuses =
				prev?.find((filter: any) => filter.id === "status")?.value || "";
			if (!statuses) {
				return prev.concat({
					id: "status",
					value: [status.id],
				});
			}

			return prev.map((filter: any) =>
				filter.id === "status"
					? {
							...filter,
							value: isActive
								? statuses.filter((s: any) => s !== status.id)
								: statuses.concat(status.id),
					  }
					: filter
			);
		});
	};

	return <div className="row-flex-start gap-3.5 max-[430px]:gap-1.5"></div>;
}

export default Filters;
