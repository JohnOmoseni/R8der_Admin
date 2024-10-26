import { KeyboardArrowDown } from "@/constants/icons";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { BtnLoader } from "@/components/fallback/FallbackLoader";
import { PopoverWrapper } from "@/components/ui/components/PopoverWrapper";

const popoverList = ["View Details", "Go to Trip Details", "Retry Settlement"];

function SettlementAction({}: { id: string }) {
	const navigate = useNavigate();

	const [loadingStates, setLoadingStates] = useState<boolean[]>(
		popoverList!?.map(() => false)
	);

	const onClickHandlers: { [index: number]: () => Promise<void> | null } = {
		0: () => null,
		1: () => handleRetrySettlement(),
	};

	const handleItemClick = async (idx: number, event: React.MouseEvent) => {
		event.stopPropagation();
		if (!onClickHandlers || typeof onClickHandlers[idx] !== "function") return;

		setLoadingStates((prev) => {
			const newStates = [...prev];
			newStates[idx] = true;
			return newStates;
		});

		try {
			await onClickHandlers[idx]();
		} finally {
			setLoadingStates((prev) => {
				const newStates = [...prev];
				newStates[idx] = false;
				return newStates;
			});
		}
	};

	const handleRetrySettlement = async () => {
		try {
			toast.success("Coupon deleted successfully");
			navigate(0);
		} catch {
			toast.error("Something went wrong");
		}
	};

	return (
		<>
			<PopoverWrapper
				trigger={
					<p className="badge-long">
						Action
						<KeyboardArrowDown className="size-4" />
					</p>
				}
				list={popoverList}
				renderItem={(item, index) => {
					return (
						<>
							<div
								className="row-flex-btwn w-full gap-2"
								onClick={(event) => handleItemClick(index, event)}
							>
								{item?.icon && <item.icon className="mr-2 size-4" />}

								{item}
								{loadingStates[index] && (
									<BtnLoader isLoading={loadingStates[index]} />
								)}
							</div>
						</>
					);
				}}
			/>
		</>
	);
}

export default SettlementAction;
