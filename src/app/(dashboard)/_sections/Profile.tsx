import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";
import { copyToClipBoard } from "@/utils";
import { Check, Copy } from "@/constants/icons";
import {
	customerInfoMapper,
	driverInfoMapper,
	infoMapper,
	keyMappings,
} from "@/constants";
import { StatusBadge } from "@/components/StatusBadge";

type ProfileProps = {
	isProfileVariant?: boolean;
	profileInfo?: any;
	headingTitle?: string;
	type: "customerInfo" | "driverInfo" | "vehicleInfo" | "documents";
};

function Profile({
	isProfileVariant,
	profileInfo,
	type,
	headingTitle = "Profile",
}: ProfileProps) {
	const [copiedStatus, setCopiedStatus] = useState<Record<string, boolean>>({});

	const info = useMemo(() => {
		switch (type) {
			case "customerInfo":
				return {
					...infoMapper(profileInfo),
					...customerInfoMapper(profileInfo),
				};
			case "driverInfo":
			case "vehicleInfo":
				return { ...infoMapper(profileInfo), ...driverInfoMapper(profileInfo) };
			default:
				return infoMapper(profileInfo);
		}
	}, [profileInfo, type]);

	const keys = keyMappings[type] || keyMappings.default;

	const handleCopyValue = (text: string, key: string) => {
		if (text) copyToClipBoard(text, key, setCopiedStatus);
	};

	return (
		<div className="rounded-sm border border-border text-base">
			<div className="row-flex-btwn w-full gap-4 bg-background-200 px-3 py-3 brightness-105">
				<p className="font-semibold">{headingTitle}</p>
			</div>

			{keys.map(({ key, label }) => (
				<div
					className="row-flex-btwn group w-full gap-4 border-t border-border px-4 py-3.5"
					key={key}
				>
					<p className="flex-1 font-medium tracking-tight text-foreground-100">
						{label}
					</p>

					<div
						className={cn(
							"row-flex-btwn gap-6",
							isProfileVariant
								? ""
								: "flex-1 max-sm:justify-end max-sm:text-end"
						)}
					>
						{label.includes("Status") ? (
							<StatusBadge status={info[key]} />
						) : (
							<p
								className={cn(
									"font-semibold",
									key === "email" &&
										info[key] &&
										"text-sm italic underline break-words max-sm:max-w-[15ch]"
								)}
							>
								{Array.isArray(info[key])
									? info[key].join(", ")
									: info[key] ?? "-"}
							</p>
						)}

						<div
							className="cursor-pointer group-hover:max-sm:block sm:hidden"
							onClick={() => handleCopyValue(info[key], key)}
						>
							{copiedStatus[key] ? (
								<Check className="size-5" />
							) : (
								<Copy className="size-5" />
							)}
						</div>

						<div
							className="hidden cursor-pointer rounded-full border border-border px-3 py-1.5 text-xs font-semibold capitalize transition group-hover:sm:block"
							onClick={() => handleCopyValue(info[key], key)}
						>
							{copiedStatus[key] ? "copied" : "copy"}
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default Profile;
