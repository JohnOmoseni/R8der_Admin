import React, { useEffect, useRef, useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThreeDots } from "@/constants/icons";
import { ReactNode } from "react";
import {
	DropdownMenuGroup,
	DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";

type Props = {
	trigger?: ReactNode;
	list?: any[];
	showSeparator?: boolean;
	renderItem: (
		item: any,
		index: number,
		closeDropdown: () => void
	) => ReactNode;
	onClickHandlers?: Array<(...array: any[]) => void>;
	onCalendarPopup?: (date: Date) => void;
};

export function DropdownVariant({
	trigger,
	list,
	showSeparator,
	renderItem,
}: Props) {
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement | null>(null);
	const dropdownTriggerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;

			// Check if the click is outside the dropdown content or the dropdown trigger
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(target) &&
				dropdownTriggerRef.current &&
				!dropdownTriggerRef.current.contains(target)
			) {
				closeDropdown();
			}
		};

		// Add event listener only when dropdown is open
		if (open) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [open]);

	const toggleDropdown = () => setOpen((prevOpen) => !prevOpen);

	const closeDropdown = () => setOpen(false);

	const handleMenuClick = (value: boolean) => {
		if (value) {
			setOpen(true); // Only open manually, no auto-close
		}
	};

	return (
		<DropdownMenu
			open={open}
			onOpenChange={(value) => handleMenuClick(value)} // Control opening via this handler
		>
			<DropdownMenuTrigger
				// @ts-ignore
				ref={dropdownTriggerRef}
				onClick={toggleDropdown} // Toggle the dropdown on click
			>
				{trigger ? (
					trigger
				) : (
					<div className="icon-div">
						<ThreeDots size={20} className="" />
					</div>
				)}
			</DropdownMenuTrigger>

			<DropdownMenuContent
				ref={dropdownRef}
				className="right-0 w-44"
				onClick={(event) => event.stopPropagation()}
			>
				{list?.map((item, idx) => (
					<React.Fragment key={idx}>
						{idx !== 0 && showSeparator && (
							<DropdownMenuSeparator
								key="separator"
								className="h-px bg-background-200"
							/>
						)}
						<DropdownMenuGroup>
							{/* Render dropdown items */}
							{renderItem(item, idx, closeDropdown)}
						</DropdownMenuGroup>
					</React.Fragment>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
