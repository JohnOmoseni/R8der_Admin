import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { CellContext } from "@tanstack/react-table";

function EditableRateCell({
	row,
	column,
	table,
	getValue,
}: CellContext<any, unknown>) {
	const [value, setValue] = useState("");
	const initialValue = getValue() || "";

	useEffect(() => {
		// @ts-ignore
		setValue(initialValue);
	}, [initialValue]);

	const onBlur = () => {
		// @ts-ignore
		table.options.meta?.updateData(row.index, column.id, value);
	};

	return (
		<Input
			value={value}
			onBlur={onBlur}
			onChange={(e) => setValue(e.target.value)}
			className="table-data-sm h-8 border border-border px-1.5 text-foreground"
		/>
	);
}

export default EditableRateCell;
