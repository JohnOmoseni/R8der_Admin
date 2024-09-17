import { useEffect } from "react";
import { Cancel, Check } from "@/constants/icons";
import { cn } from "@/lib/utils";

const tabIDs = ["Profile", "Vehicle and KYC Details", "Trips", "Withdrawals"];

function useHeaderTab(activeTab: string) {
	let headerContent;
	const action = "badge min-w-[125px] gap-2 !bg-transparent !pl-2.5 !pr-4";

	useEffect(() => {
		switch (activeTab) {
			case tabIDs[0]:
				headerContent = (
					<div className="row-flex gap-2.5 max-[430px]:!flex-wrap">
						<div className={cn(action, "error")}>
							<Cancel className="size-4 text-red-600" />
							<p className="mt-0.5 font-semibold text-red-600">Deactivate</p>
						</div>
						<div className={cn(action, "!bg-foreground")}>
							<Check className="size-4 text-white" />
							<p className="mt-0.5 font-semibold text-background">Activate</p>
						</div>
					</div>
				);
				break;
			case tabIDs[1]:
				headerContent = (
					<div className="row-flex gap-2.5 max-[600px]:!flex-wrap">
						<div className="row-flex gap-2.5">
							<div className={cn(action, "")}>
								<Cancel className="size-4" />
								<p className="mt-0.5 font-semibold">Export</p>
							</div>
							<div className={cn(action, "!error")}>
								<Cancel className="size-4 text-red-600" />
								<p className="mt-0.5 font-semibold text-red-600">Deactivate</p>
							</div>
						</div>
						<div className={cn(action, "!bg-foreground")}>
							<Check className="size-4 text-white" />
							<p className="mt-0.5 font-semibold text-background">Activate</p>
						</div>
					</div>
				);
				break;
			case tabIDs[2]:
				headerContent = (
					<div className="row-flex gap-2.5 max-[600px]:!flex-wrap">
						<div className="row-flex gap-2.5">
							<div className={cn(action, "")}>
								<Cancel className="size-4" />
								<p className="mt-0.5 font-semibold">Export</p>
							</div>
							<div className={cn(action, "!error")}>
								<Cancel className="size-4 text-red-600" />
								<p className="mt-0.5 font-semibold text-red-600">Deactivate</p>
							</div>
						</div>
						<div className={cn(action, "!bg-foreground")}>
							<Check className="size-4 text-white" />
							<p className="mt-0.5 font-semibold text-background">Activate</p>
						</div>
					</div>
				);
				break;
			case tabIDs[3]:
				headerContent = (
					<div className="badge gap-2 !pl-2.5 !pr-4">
						<Cancel className="size-4" />
						<p className="mt-0.5 font-semibold">Export</p>
					</div>
				);
				break;
			default:
				headerContent = <></>;
		}
	}, [activeTab]);

	return headerContent;
}

export default useHeaderTab;
