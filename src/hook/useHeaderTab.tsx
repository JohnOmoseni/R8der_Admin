import { useState, useEffect, useCallback, PropsWithChildren } from "react";
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
	isLoading: boolean;
};

function useHeaderTab({
	activeTab,
	tableData,
	filename,
	onApprove,
	onDeactivate,
	isLoading,
}: PropsWithChildren<Props>) {
	const [headerContent, setHeaderContent] = useState<JSX.Element | null>(null);
	// @ts-ignore
	const [isLoadingTest, setIsLoading] = useState<LoadingState>({
		type: "",
		loading: false,
	});

	const handleAction = useCallback(
		async (
			actionType: "approve" | "deactivate",
			action: () => Promise<void>
		) => {
			setIsLoading({ type: actionType, loading: true });
			try {
				await action();
			} catch (error) {
				console.error(`Error in ${actionType}:`, error);
			} finally {
				setIsLoading({ type: actionType, loading: false });
			}
		},
		[]
	);

	const deactivateButton = (
		<div
			className={cn("badge min-w-[125px] !gap-2 !bg-transparent !px-3 error")}
			onClick={() => handleAction("deactivate", onDeactivate)}
		>
			{isLoading ? (
				<BtnLoader isLoading />
			) : (
				<Cancel className="size-4 text-red-600" />
			)}
			<p className="mt-0.5 font-semibold text-red-600">Deactivate</p>
		</div>
	);

	const approveButton = (
		<div
			className={cn("badge min-w-[125px] !gap-2 !bg-transparent !px-3")}
			onClick={() => handleAction("approve", onApprove)}
		>
			{isLoading ? (
				<BtnLoader isLoading />
			) : (
				<Check className="size-4 text-white" />
			)}
			<p className="mt-0.5 font-semibold text-background">Approve</p>
		</div>
	);

	const exportButton = <DownloadReport data={tableData} filename={filename} />;

	useEffect(() => {
		const contentByTab: Record<TabIndex, JSX.Element> = {
			0: (
				<div className="row-flex gap-2.5 max-[430px]:!flex-wrap">
					{deactivateButton}
					{approveButton}
				</div>
			),
			1: (
				<div className="row-flex gap-2.5 max-[600px]:!flex-wrap">
					<div className="row-flex gap-2.5">
						{exportButton}
						{deactivateButton}
					</div>
					{approveButton}
				</div>
			),
			2: (
				<div className="row-flex gap-2.5 max-[600px]:!flex-wrap">
					<div className="row-flex gap-2.5">
						{exportButton}
						{deactivateButton}
					</div>
					{approveButton}
				</div>
			),
			3: <>{exportButton}</>,
		};

		setHeaderContent(
			contentByTab[activeTab as keyof typeof contentByTab] || <></>
		);
	}, [activeTab, deactivateButton, approveButton, exportButton, isLoading]);

	return headerContent;
}

export default useHeaderTab;
