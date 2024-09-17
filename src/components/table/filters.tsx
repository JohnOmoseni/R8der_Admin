import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import SelectDropdown from "../ui/components/SelectDropdown";
import { FilterIcon } from "lucide-react";
import { DropdownList } from "../ui/components/DropdownList";

type Props = {
	setSelectedFilter: Dispatch<SetStateAction<string>>;
	selectedFilter: string;
	isSelected?: string;
	columnId?: string;
	setColumnFilters?: any;
};

const options = [
	{ label: "All", value: "All" },
	{ label: "Verified", value: "VERIFIED" },
	{ label: "Not-verified", value: "NOT_VERIFIED" },
];

function Filters({
	setSelectedFilter,
	selectedFilter,
	setColumnFilters,
	columnId = "role",
}: Props) {
	const selectedStyle = "!bg-foreground text-secondary-foreground shadow-sm";

	const handleClick = (filter: string) => {
		setSelectedFilter(filter);
		setColumnFilters((prev: any) =>
			prev
				?.filter((f: any) => f.id !== columnId)
				?.concat({ id: columnId, value: filter })
		);
	};

	return (
		<>
			<div className="sm:hidden block">
				<SelectDropdown
					value={selectedFilter}
					options={options}
					onChangeHandler={handleClick}
					trigger={
						<div className="row-flex-start gap-2">
							<FilterIcon className="size-4" />
							<p>Filter by status</p>
						</div>
					}
				/>

				<DropdownList
					list={options}
					trigger={
						<div className="row-flex-start gap-2">
							<FilterIcon className="size-4" />
							<p>Filter by status</p>
						</div>
					}
				/>
			</div>

			<div className="sm:row-flex-start gap-3.5 max-[430px]:gap-1.5 hidden">
				{options?.map((option) => (
					<div
						key={option.value}
						className={cn(
							"filter-div transition-colors",
							selectedFilter === option.value && selectedStyle
						)}
						onClick={() => handleClick(option.value)}
					>
						{option.label}
					</div>
				))}
			</div>
		</>
	);
}

export default Filters;
