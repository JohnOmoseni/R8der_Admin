import { useCallback, PropsWithChildren } from "react";
import { Cancel, Check } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { BtnLoader } from "@/components/fallback/FallbackLoader";
import { LoadingState } from "@/types";
import DownloadReport from "@/components/DownloadReport";

type TabIndex = 0 | 1 | 2 | 3;

type Props = {
	activeTab: number;
	tableData?: any[];
	filename?: string;
	onApprove: () => Promise<void>;
	onDeactivate: () => Promise<void>;
	isLoading: LoadingState;
};

function HeaderContent({
	activeTab,
	tableData,
	filename,
	onApprove,
	onDeactivate,
	isLoading,
}: PropsWithChildren<Props>) {
	const handleAction = useCallback(
		async (
			actionType: "approve" | "deactivate",
			action: () => Promise<void>
		) => {
			try {
				await action();
			} catch (error) {
				console.error(`Error in ${actionType}:`, error);
			}
		},
		[]
	);

	const deactivateButton = (
		<div
			className={cn(
				"badge min-w-[125px] !gap-2 !bg-transparent !px-3 error !w-full"
			)}
			onClick={() => handleAction("deactivate", onDeactivate)}
		>
			{isLoading?.type === "deactivate" && isLoading?.loading ? (
				<BtnLoader isLoading={true} />
			) : (
				<Cancel className="size-4 text-red-600" />
			)}
			<p className="mt-0.5 font-semibold text-red-600">Deactivate</p>
		</div>
	);

	const approveButton = (
		<div
			className={cn("badge min-w-[125px] !gap-2 !bg-foreground !px-3 !w-full")}
			onClick={() => handleAction("approve", onApprove)}
		>
			{isLoading?.type === "approve" && isLoading?.loading ? (
				<BtnLoader isLoading={true} />
			) : (
				<Check className="size-4 text-white" />
			)}
			<p className="mt-0.5 font-semibold text-background">Approve</p>
		</div>
	);

	const exportButton = (
		<DownloadReport
			data={tableData}
			filename={filename}
			containerStyles="!w-full"
		/>
	);

	const renderHeaderContent = () => {
		switch (activeTab as TabIndex) {
			case 0:
				return (
					<div className="row-flex gap-2.5 max-[430px]:!flex-wrap">
						{deactivateButton}
						{approveButton}
					</div>
				);
			case 1:
			case 2:
				return (
					<div className="row-flex gap-2.5 max-sm:!flex-wrap">
						{exportButton}

						<div className="row-flex gap-2.5 w-full">
							{deactivateButton}
							{approveButton}
						</div>
					</div>
				);
			case 3:
				return <>{exportButton}</>;
			default:
				return <></>;
		}
	};

	return renderHeaderContent();
}

export default HeaderContent;
