import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "@/constants/icons";
import { useEffect, useState } from "react";

type TableGlobalSearchProps = {
	containerStyles?: string;
	placeholder?: string;
	globalValue: string;
	onChange: (value: string) => void;
};

function TableGlobalSearch({
	onChange,
	globalValue,
	containerStyles,
	placeholder,
}: TableGlobalSearchProps) {
	const [value, setValue] = useState(globalValue);

	useEffect(() => {
		setValue(globalValue);
	}, [globalValue]);

	useEffect(() => {
		const timeout = setTimeout(() => onChange(value), 100);

		return () => clearTimeout(timeout);
	}, [value]);

	return (
		<div
			className={cn(
				"row-flex-start w-48 rounded-md border border-border px-3.5 py-1 max-[430px]:px-2.5 sm:w-[250px] lg:w-[300px]",
				containerStyles
			)}
		>
			<SearchIcon className="size-5 text-grey" />
			<Input
				value={value}
				placeholder={placeholder ?? "Search..."}
				className="i-reset h-8"
				onChange={(e) => setValue(e.target.value)}
			/>
		</div>
	);
}

export default TableGlobalSearch;