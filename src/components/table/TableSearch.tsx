import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "@/constants/icons";

type TableSearchProps = {
	containerStyles?: string;
	placeholder?: string;
	columnFilters?: any;
	setColumnFilters?: any;
	filterBy?: string;
};

function TableSearch({
	columnFilters,
	setColumnFilters,
	containerStyles,
	placeholder,
	filterBy = "name",
}: TableSearchProps) {
	const taskName =
		columnFilters?.find((filter: any) => filter.id === filterBy)?.value || "";

	const onFilterChange = (columnId: string, value: string) => {
		setColumnFilters((prev: any) =>
			prev
				?.filter((filter: any) => filter.id !== columnId)
				?.concat({ id: columnId, value })
		);
	};

	return (
		<div
			className={cn(
				"row-flex-start w-48 rounded-md border border-border px-3.5 py-1 max-[430px]:px-2.5 sm:w-[250px] lg:w-[300px]",
				containerStyles
			)}
		>
			<SearchIcon className="size-5 text-grey" />
			<Input
				value={taskName}
				placeholder={placeholder ?? "Search..."}
				className="i-reset h-8"
				onChange={(e) => onFilterChange(filterBy, e.target.value)}
			/>
		</div>
	);
}

export default TableSearch;
