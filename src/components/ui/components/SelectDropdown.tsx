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
	placeholder?: string;
	trigger?: ReactNode;
	triggerStyles?: string;
	onChangeHandler?: (value: string) => void;
};

const SelectDropdown = ({
	options,
	defaultValue,
	value,
	placeholder,
	trigger,
	triggerStyles,
	onChangeHandler,
}: SelectProps) => {
	return (
		<Select
			onValueChange={onChangeHandler && onChangeHandler}
			value={value}
			defaultValue={defaultValue?.value}
		>
			<SelectTrigger className={cn("shad-select-trigger", triggerStyles)}>
				{trigger ? (
					trigger
				) : (
					<SelectValue placeholder={placeholder || "Select"} />
				)}
			</SelectTrigger>
			<SelectContent className="shad-select-content">
				{options?.length > 0 &&
					options.map((option, idx) => (
						<SelectItem
							key={idx}
							value={option.value!}
							className="shad-select-item"
						>
							{option.label}
						</SelectItem>
					))}
			</SelectContent>
		</Select>
	);
};

export default SelectDropdown;
