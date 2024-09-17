import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../CustomButton";

interface FormWrapperProps {
	children: ReactNode;
	buttonLabel: string;
	isSubmitting?: boolean;
	containerStyles?: string;
	btnStyles?: string; // Custom styles for the submit button. Example: "bg-blue-500 text-white"
	onSubmit?: () => void;
}

function FormWrapper({
	children,
	buttonLabel,
	isSubmitting,
	containerStyles,
	btnStyles,
	onSubmit,
}: FormWrapperProps) {
	return (
		<div className={cn("mt-8 h-full w-full max-w-lg", containerStyles)}>
			<form onSubmit={onSubmit} className="flex-column flex-1 gap-4">
				<div className="flex-column gap-2 space-y-3">{children}</div>

				<Button
					type="submit"
					title={isSubmitting ? "Submitting..." : buttonLabel}
					className={cn("!mt-auto !w-full", btnStyles)}
					disabled={isSubmitting}
					isLoading={isSubmitting}
				/>
			</form>
		</div>
	);
}

export default FormWrapper;
