import { Button } from "@/components/CustomButton";
import { ClockIcon, StopIcon, WarningIcon } from "@/constants/icons";
import { useMemo } from "react";

type Props = {
	type?: "time" | "alert" | "stop";
	title: string;
	description: string;
	btnTitle?: string;
	onClick?: () => void;
};

const getIcon = (type: Props["type"]) => {
	switch (type) {
		case "time":
			return ClockIcon;
		case "alert":
			return WarningIcon;
		case "stop":
			return StopIcon;
		default:
			return WarningIcon;
	}
};

function InfoModal({
	title,
	type = "alert",
	description,
	btnTitle = "OK",
	onClick,
}: Props) {
	const Icon = useMemo(() => getIcon(type), [type]);

	return (
		<div className="grid place-items-center">
			<div className="flex-column items-center gap-4">
				<div className="relative mt-3">
					<Icon className="h-fit w-fit" />
				</div>

				<div className="flex-column mt-2 items-center gap-2">
					<h3 className="text-center font-semibold text-lg max-w-sm">
						{title}
					</h3>
					<p className="max-w-[38ch] text-base text-center text-gray-600 leading-5">
						{description}
					</p>

					<Button
						onClick={onClick}
						title={btnTitle}
						className="mt-6 bg-red-600 border-red-500 w-[80%]"
					/>
				</div>
			</div>
		</div>
	);
}

export default InfoModal;
