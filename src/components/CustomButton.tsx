import { cn } from "@/lib/utils";
import { IconType } from "react-icons/lib";
import ClipLoader from "react-spinners/ClipLoader";
import { BtnLoader } from "./fallback/FallbackLoader";

type BtnProps = {
	title: string;
	className?: string;
	type?: "button" | "submit" | "reset";
	btnType?: "variant" | "outline";
	icon?: IconType;
	isLoading?: boolean;
	dir?: string;
	disabled?: boolean;
	onClick?: (e?: any) => void;
};

export const Button = ({
	title,
	btnType = "variant",
	className,
	type,
	dir = "left",
	icon: Icon,
	onClick,
	isLoading,
	disabled,
}: BtnProps) => {
	return (
		<button
			type={type || "button"}
			disabled={disabled}
			onClick={onClick}
			className={cn(
				"btn-variant",
				Icon && "gap-3",
				btnType === "outline" && "btn-outline",
				className
			)}
		>
			{disabled && isLoading ? (
				<ClipLoader
					loading={disabled}
					size={20}
					aria-label="Loading"
					data-testid="loader"
					className="row-flex mr-1.5 text-secondary"
				/>
			) : (
				<>
					{Icon && !disabled && dir == "left" && <Icon className="size-5" />}
					{title}
					{Icon && !disabled && dir == "right" && <Icon className="size-5" />}
				</>
			)}
		</button>
	);
};
