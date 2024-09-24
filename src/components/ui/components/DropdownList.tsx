import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThreeDots } from "@/constants/icons";
import { ReactNode, useState } from "react";
import {
	DropdownMenuGroup,
	DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";

import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
	trigger?: ReactNode;
	list?: any[];
	showSeparator?: boolean;
	onClickHandlers?: Array<(...array: any[]) => void>;
	onCalendarPopup?: (date: Date) => void;
};

export function DropdownList({
	trigger,
	list,
	showSeparator,
	onClickHandlers,
	onCalendarPopup,
}: Props) {
	const [date, setDate] = useState<Date>();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				{trigger ? (
					trigger
				) : (
					<div className="icon-div">
						<ThreeDots size={20} className="" />
					</div>
				)}
			</DropdownMenuTrigger>
			<DropdownMenuContent className="right-0 w-44">
				{list?.map((item, idx) => (
					<>
						{idx !== 0 && showSeparator && (
							<DropdownMenuSeparator className="h-px bg-background-200" />
						)}
						<DropdownMenuGroup>
							<DropdownMenuItem
								key={idx}
								onClick={() => {
									if (onClickHandlers && onClickHandlers[idx]) {
										onClickHandlers[idx]();
									}
								}}
							>
								{typeof item === "object" && "label" in item
									? item?.label
									: item}
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</>
				))}

				{onCalendarPopup && (
					<Popover>
						<PopoverTrigger asChild>
							<span className="text-sm relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5">
								Custom
							</span>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0">
							<Calendar
								mode="single"
								selected={date}
								onSelect={(date) => {
									setDate(date);
									onCalendarPopup(date!);
								}}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
