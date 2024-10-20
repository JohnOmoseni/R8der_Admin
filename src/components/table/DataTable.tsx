import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	getFilteredRowModel,
	getSortedRowModel,
	ColumnSort,
	ColumnFiltersState,
	getPaginationRowModel,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ArrowDown, ArrowUp } from "@/constants/icons";
import { useEffect, useState } from "react";
import TablePaginate from "./TablePaginate";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	tableData: TData[];
	columnFilters?: ColumnFiltersState;
	setSelectedRows?: (rows: TData[]) => void;
}

export function DataTable<TData, TValue>({
	columns,
	tableData,
	columnFilters,
	setSelectedRows,
}: DataTableProps<TData, TValue>) {
	const [data, setData] = useState(tableData);
	const [sorting, setSorting] = useState<ColumnSort[]>([]);
	const [rowSelection, setRowSelection] = useState({});

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnFilters,
			rowSelection,
		},
		meta: {
			updateData: (
				rowIndex: string | number,
				columnId: string,
				value: string | number
			) =>
				setData((prev) =>
					prev.map((row, index) =>
						index === rowIndex ? { ...prev[rowIndex], [columnId]: value } : row
					)
				),
		},
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		onRowSelectionChange: setRowSelection,
	});

	useEffect(() => {
		const selectedRows = table
			.getSelectedRowModel()
			.rows.map((row) => row.original);
		setSelectedRows && setSelectedRows(selectedRows); // Pass selected rows to parent
	}, [table.getSelectedRowModel().rows, setSelectedRows]);

	return (
		<div className="flex-column gap-4">
			<div className="data-table">
				<Table className="scroll-thin small-text min-h-[120px] overflow-x-auto rounded-sm">
					<TableHeader className="">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id} className="bg-background-200">
								{headerGroup.headers.map((header) => {
									const sortStatus = header.column.getIsSorted();
									const sortIcons = {
										asc: (
											<ArrowUp
												size={22}
												className="absolute left-full flex-[1_1_100%]"
											/>
										),
										desc: (
											<ArrowDown
												size={22}
												className="absolute left-full flex-[1_1_100%]"
											/>
										),
									};
									const sortIcon = sortStatus ? sortIcons[sortStatus] : "";

									return (
										<TableHead
											key={header.id}
											className="shad-table-row-header"
										>
											{header.isPlaceholder ? null : (
												<div
													className="row-flex sm:justify-start relative cursor-default font-semibold max-[430px]:!justify-center"
													onClick={header.column.getToggleSortingHandler()}
												>
													{flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
													{header.column.getCanSort() && sortIcon}
												</div>
											)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>

					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row?.id}
									data-state={row.getIsSelected() && "selected"}
									className="shad-table-row"
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											className="text-foreground-100 max-sm:p-2.5"
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-32 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<TablePaginate table={table} />
		</div>
	);
}
