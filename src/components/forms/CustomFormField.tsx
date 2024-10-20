import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { FormikErrors, FormikTouched } from "formik";
import { FocusEventHandler, KeyboardEventHandler, useState } from "react";
import {
	Select,
	SelectContent,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Eye, EyeOff } from "@/constants/icons";
import { Checkbox } from "../ui/checkbox";

export enum FormFieldType {
	INPUT = "input",
	CHECKBOX = "checkbox",
	SELECT = "select",
	SKELETON = "skeleton",
}

interface CustomProps {
	name: string;
	field?: {
		value: any;
		type?: string;
		placeholder?: string;
	};
	isShowPasswordError?: boolean;
	containerStyles?: string;
	fieldType: FormFieldType;
	label?: string;
	tag?: string;
	iconSrc?: any;
	dir?: "left" | "right";
	disabled?: boolean;
	children?: React.ReactNode;
	errors?: FormikErrors<any>;
	touched?: FormikTouched<any>;
	required?: boolean;
	inputStyles?: string;
	renderSkeleton?: (field: any) => React.ReactNode;
	onKeyDown?: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
	onChange?: any;
	onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const RenderInput = ({ props }: { props: CustomProps }) => {
	const [showPassword, setShowPassword] = useState(false);
	const {
		field,
		label,
		fieldType,
		name,
		onBlur,
		onChange,
		inputStyles,
		iconSrc: IconSrc,
	} = props;
	const placeholder = field?.placeholder ?? "";

	const changePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	switch (fieldType) {
		case FormFieldType.INPUT:
			return (
				<>
					{IconSrc && (
						<span className="ml-2.5 mr-0.5 block mt-[1px]">
							<IconSrc className="w-[18px] h-fit " />
						</span>
					)}
					<Input
						name={name}
						{...field}
						{...(field?.type === "password" && {
							type: showPassword ? "text" : "password",
						})}
						value={field?.value as string}
						onChange={onChange}
						onBlur={onBlur}
						className={cn("i-reset", inputStyles)}
					/>

					{field?.type === "password" && (
						<span
							className="icon absolute right-3 z-10"
							onClick={changePasswordVisibility}
						>
							{showPassword ? (
								<Eye size={20} className="text-secondary" />
							) : (
								<EyeOff size={20} className="text-secondary" />
							)}
						</span>
					)}
				</>
			);

		case FormFieldType.SELECT:
			return (
				<Select onValueChange={onChange} defaultValue={field?.value as string}>
					<SelectTrigger
						className={cn("shad-select-trigger !w-full", inputStyles)}
					>
						<SelectValue
							placeholder={
								<span className="text-placeholder">
									{placeholder || "Select"}
								</span>
							}
						/>
					</SelectTrigger>
					<SelectContent className="shad-select-content">
						{props.children}
					</SelectContent>
				</Select>
			);

		case FormFieldType.CHECKBOX:
			return (
				<div className="row-flex-start gap-2.5">
					<Checkbox
						id={name}
						name={name}
						checked={field?.value}
						onCheckedChange={(checked) => onChange(checked)}
					/>
					<Label
						htmlFor={name}
						className="mt-0.5 cursor-pointer leading-4 text-grey"
					>
						{label}
					</Label>
				</div>
			);

		case FormFieldType.SKELETON:
			return props.renderSkeleton ? props.renderSkeleton(field) : null;

		default:
			return null;
	}
};

const CustomFormField = (props: CustomProps) => {
	const {
		name,
		label,
		errors,
		touched,
		containerStyles,
		isShowPasswordError,
		fieldType,
	} = props;

	const result = (
		<div
			className={cn(
				"relative w-full row-flex-start gap-0.5 overflow-hidden",
				containerStyles,
				fieldType !== FormFieldType.CHECKBOX &&
					"rounded-lg border border-border bg-background shadow-sm",
				errors?.[name] && touched?.[name] && "border-red-400"
			)}
		>
			<RenderInput props={props} />
		</div>
	);

	return (
		<div
			className={cn(
				"group",
				fieldType !== FormFieldType.CHECKBOX && "w-full",
				errors?.[name] && touched?.[name] ? "is-error" : ""
			)}
		>
			{label && fieldType !== FormFieldType.CHECKBOX && (
				<Label className="relative mb-2.5 ml-0.5 inline-flex after:absolute after:-right-6 after:top-0 after:text-sm after:text-red-500 after:content-[*]">
					{label}
				</Label>
			)}
			{result}

			<p
				className={cn(
					"transition-sm hidden group-[.is-error]:my-1.5 ml-0.5 line-clamp-2 h-0 text-xs font-semibold leading-4 text-red-500 group-[.is-error]:block group-[.is-error]:h-auto group-[.is-error]:animate-in",
					isShowPasswordError && "md:min-h-5"
				)}
			>
				{errors?.[name] as string}
			</p>
		</div>
	);
};

export default CustomFormField;
