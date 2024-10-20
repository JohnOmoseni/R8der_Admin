import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";

type Props = {
	selected: Date;
	onChange: (date: Date) => void;
};

function DatePicker({ selected, onChange }: Props) {
	return (
		<Popover>
			<PopoverTrigger className="shad-select-trigger !w-full" asChild>
				<div className="row-flex-btwn gap-4 w-full text-placeholder">
					{selected ? (
						format(selected, "PPP")
					) : (
						<span className="text-sm relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5">
							Pick a date
						</span>
					)}
					<CalendarIcon className="mr-2 h-4 w-4" />
				</div>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={selected}
					onSelect={(date) => {
						onChange(date!);
					}}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}

export default DatePicker;
