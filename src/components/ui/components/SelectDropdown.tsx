import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Option = { label: ReactNode; value: string };

type SelectProps = {
	options: Option[];
	value?: string;
	defaultValue?: Option;
	placeholder?: ReactNode;
	trigger?: ReactNode;
	triggerStyles?: string;
	isArrowDown?: boolean;

	onChangeHandler?: (value: string) => void;
};

const SelectDropdown = ({
	options,
	defaultValue,
	value,
	placeholder,
	trigger,
	triggerStyles,
	isArrowDown = false,
	onChangeHandler,
}: SelectProps) => {
	return (
		<Select
			onValueChange={onChangeHandler && onChangeHandler}
			value={value}
			defaultValue={defaultValue?.value}
		>
			<SelectTrigger
				className={cn("shad-select-trigger", triggerStyles)}
				isArrowDown={isArrowDown}
			>
				{trigger ? (
					trigger
				) : (
					<SelectValue placeholder={placeholder || "Select"} />
				)}
			</SelectTrigger>
			<SelectContent className="shad-select-content">
				{options?.length > 0 &&
					options.map((option, idx) => {
						const isAllOption = option.value === "all";
						return (
							<SelectItem
								key={idx}
								value={option.value!}
								className={cn("shad-select-item", isAllOption && "!hidden")}
							>
								{option.label}
							</SelectItem>
						);
					})}
			</SelectContent>
		</Select>
	);
};

export default SelectDropdown;
