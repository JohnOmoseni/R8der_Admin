import { Button } from "@/components/CustomButton";
import { StatusBadge } from "@/components/StatusBadge";
import { SheetClose } from "@/components/ui/sheet";
import { useGetWithdrawalById } from "@/hook/useTransactions";
import { useGetTripById } from "@/hook/useTrips";
import { Status } from "@/types";

type ReceiptProps = {
	type?:
		| "customerReceipt"
		| "driverReceipt"
		| "withdrawalReceipt"
		| "settlementReceipt"
		| "transactionReceipt"
		| "tripReceipt";
	details?: any;
};

function Receipt({ details, type }: ReceiptProps) {
	const { data: tripReceipt } = useGetTripById({ tripId: details?.tripId });
	const { data: withdrawalReceipt } = useGetWithdrawalById({
		transactionId: details?.transactionId,
	});

	const receiptData =
		type === "withdrawalReceipt" ? withdrawalReceipt : tripReceipt;

	const isStatusField = (key: string) => key.toLowerCase().includes("status");

	return (
		<div className="pt-4 md:px-2 h-full flex-column gap-3">
			<div>
				<h2 className="text-3xl">
					{type === "withdrawalReceipt" ? "Withdrawal Details" : "Trip Details"}
				</h2>
				<p className="text-foreground-100 mt-0.5">Your transaction receipt</p>
			</div>

			<div className="my-5 flex-column gap-3.5 px-1">
				{Object.entries(receiptData || {}).map(([key, value], idx) => (
					<div
						key={idx}
						className="row-flex-btwn gap-4 py-2.5 px-0.5 border-b border-grey-100"
					>
						<span className="font-semibold capitalize">{key}</span>
						{isStatusField(key) ? (
							<StatusBadge status={value as Status} />
						) : (
							<p className="font-light text-foreground-100 capitalize max-w-[60ch] text-end">
								{(value as string) || (
									<span className="font-mono italic">Unknown</span>
								)}
							</p>
						)}
					</div>
				))}
			</div>

			<div className="mt-auto grid grid-cols-1 gap-y-3 sm:grid-cols-[1fr_max-content] gap-x-6">
				<SheetClose asChild>
					<div className="badge-long !w-full h-10 whitespace-nowrap !px-7 !py-3.5">
						Close
					</div>
				</SheetClose>
				<Button
					onClick={() => handleDownloadReceipt(receiptData)}
					title="Download receipt"
				/>
			</div>
		</div>
	);
}

const handleDownloadReceipt = (receiptData: any) => {
	const receipt = JSON.stringify(receiptData, null, 2);
	const blob = new Blob([receipt], { type: "application/json" });
	const link = document.createElement("a");
	link.href = URL.createObjectURL(blob);
	link.download = "receipt.json";
	link.click();
};

export default Receipt;
