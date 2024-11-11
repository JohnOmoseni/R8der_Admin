import Receipt from "@/app/(dashboard)/_sections/Receipt";
import { PopoverWrapper } from "@/components/ui/components/PopoverWrapper";
import { SheetMenu } from "@/components/ui/components/SheetMenu";
import { KeyboardArrowDown } from "@/constants/icons";
import { SettlementType } from "@/types/server";

function SettlementActions({ settlement }: { settlement: SettlementType }) {
	const dropdownList = [
		{
			label: (
				<SheetMenu
					trigger={<span className="cursor-pointer">View Details</span>}
					content={
						<Receipt
							details={settlement}
							id={settlement.id}
							type="transactionReceipt"
							specificType="settlement_receipt"
						/>
					}
				/>
			),
		},
		{
			label: (
				<SheetMenu
					trigger={
						<span className="cursor-pointer mt-1">Go to Trip details</span>
					}
					content={
						<Receipt
							details={settlement}
							id={settlement?.trip_id}
							type="tripReceipt"
							specificType="driver_receipt"
						/>
					}
				/>
			),
		},
	];

	return (
		<>
			<PopoverWrapper
				trigger={
					<p className="badge-long">
						Action
						<KeyboardArrowDown className="size-4" />
					</p>
				}
				list={dropdownList}
				containerStyles=""
				renderItem={(item) => {
					return <>{item?.label}</>;
				}}
			/>
		</>
	);
}

export default SettlementActions;
