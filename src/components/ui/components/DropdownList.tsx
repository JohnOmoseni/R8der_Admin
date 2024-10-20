import React from "react";

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
import { BtnLoader } from "@/components/fallback/FallbackLoader";

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
	const [loadingStates, setLoadingStates] = useState<boolean[]>(
		list!?.map(() => false)
	);

	const handleItemClick = async (idx: number) => {
		if (onClickHandlers && onClickHandlers[idx]) {
			setLoadingStates((prev) => {
				const newStates = [...prev];
				newStates[idx] = true; // Set loading state for clicked item
				return newStates;
			});

			try {
				await onClickHandlers[idx]();
			} finally {
				setLoadingStates((prev) => {
					const newStates = [...prev];
					newStates[idx] = false;
					return newStates;
				});
			}
		}
	};

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
				{list && list?.length > 0 ? (
					list?.map((item, idx) => (
						<React.Fragment key={idx}>
							{idx !== 0 && showSeparator && (
								<DropdownMenuSeparator
									key="separator"
									className="h-px bg-background-200"
								/>
							)}
							<DropdownMenuGroup>
								<DropdownMenuItem
									key={idx}
									onClick={() => handleItemClick(idx)}
								>
									<div className="row-flex-btwn w-full gap-2">
										{typeof item === "object" && "label" in item
											? item?.label
											: item}
										{loadingStates[idx] && (
											<BtnLoader isLoading={loadingStates[idx]} />
										)}{" "}
									</div>
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</React.Fragment>
					))
				) : (
					<DropdownMenuItem>
						<div className="row-flex text-center w-full">No item</div>
					</DropdownMenuItem>
				)}

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
