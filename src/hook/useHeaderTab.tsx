import { useState, useEffect, useCallback } from "react";
import { Cancel, Check } from "@/constants/icons";
import { cn } from "@/lib/utils";
import DownloadReport from "@/components/DownloadReport";
import { BtnLoader } from "@/components/fallback/FallbackLoader";

type LoadingState = {
	type: "approve" | "deactivate" | "";
	loading: boolean;
};

type Props = {
	activeTab: number;
	tableData?: any[];
	filename?: string;
	onApprove: () => Promise<void>;
	onDeactivate: () => Promise<void>;
};

function useHeaderTab({
	activeTab,
	tableData,
	filename,
	onApprove,
	onDeactivate,
}: Props) {
	const [headerContent, setHeaderContent] = useState<JSX.Element | null>(null);
	const [isLoading, setIsLoading] = useState<LoadingState>({
		type: "",
		loading: false,
	});

	const action = "badge min-w-[125px] !gap-2  !bg-transparent !px-3";

	const handleApprove = useCallback(async () => {
		try {
			setIsLoading({ type: "approve", loading: true });
			await onApprove();
		} catch (error) {
			console.error("Error approving:", error);
		} finally {
			setIsLoading({ type: "approve", loading: false });
		}
	}, [onApprove]);

	const handleDeactivate = useCallback(async () => {
		try {
			setIsLoading({ type: "deactivate", loading: true });
			await onDeactivate();
		} catch (error) {
			console.error("Error deactivating:", error);
		} finally {
			setIsLoading({ type: "deactivate", loading: false });
		}
	}, [onDeactivate]);

	const deactivate = (
		<div className={cn(action, "error")} onClick={handleDeactivate}>
			{isLoading?.type === "deactivate" && isLoading?.loading ? (
				<BtnLoader isLoading={isLoading?.loading} />
			) : (
				<Cancel className="size-4 text-red-600" />
			)}
			<p className="mt-0.5 font-semibold text-red-600">Deactivate</p>
		</div>
	);

	const approve = (
		<div className={cn(action, "!bg-foreground")} onClick={handleApprove}>
			{isLoading?.type === "approve" && isLoading?.loading ? (
				<BtnLoader isLoading={isLoading?.loading} />
			) : (
				<Check className="size-4 text-white" />
			)}
			<p className="mt-0.5 font-semibold text-background">Approve</p>
		</div>
	);

	const exportBtn = <DownloadReport data={tableData} filename={filename} />;

	useEffect(() => {
		switch (activeTab) {
			case 0:
				setHeaderContent(
					<div className="row-flex gap-2.5 max-[430px]:!flex-wrap">
						{deactivate}
						{approve}
					</div>
				);
				break;
			case 1:
				setHeaderContent(
					<div className="row-flex gap-2.5 max-[600px]:!flex-wrap">
						<div className="row-flex gap-2.5">
							{exportBtn}
							{deactivate}
						</div>
						{approve}
					</div>
				);
				break;
			case 2:
				setHeaderContent(
					<div className="row-flex gap-2.5 max-[600px]:!flex-wrap">
						<div className="row-flex gap-2.5">
							{exportBtn}
							{deactivate}
						</div>
						{approve}
					</div>
				);
				break;
			case 3:
				setHeaderContent(<>{exportBtn}</>);
				break;
			default:
				setHeaderContent(<></>);
				break;
		}
	}, [activeTab]);

	return headerContent;
}

export default useHeaderTab;
