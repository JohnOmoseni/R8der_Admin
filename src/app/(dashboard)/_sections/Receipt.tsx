import { Button } from "@/components/CustomButton";
import { StatusBadge } from "@/components/StatusBadge";
import { SheetClose } from "@/components/ui/sheet";
import { useGetWithdrawalById } from "@/hook/useTransactions";
import { useGetTripById } from "@/hook/useTrips";
import { Status } from "@/types";
import { toTitleCase } from "@/utils";
import { toast } from "sonner";
import FallbackLoader from "@/components/fallback/FallbackLoader";
import DownloadReport from "@/components/DownloadReport";
import EmptyList from "@/components/EmptyList";

type ReceiptProps = {
	type?: "transactionReceipt" | "tripReceipt";
	details?: any;
	specificType?:
		| "customer_receipt"
		| "driver_receipt"
		| "withdrawal_receipt"
		| "settlement_receipt";
};

function Receipt({ details, type, specificType }: ReceiptProps) {
	const {
		data: tripReceipt,
		isLoading: isFetchingTripReceipt,
		isError: isTripReceiptError,
	} = useGetTripById({ tripId: details?.tripId });
	const {
		data: withdrawalReceipt,
		isLoading: isFetchingTxnReceipt,
		isError: isTxnReceiptError,
	} = useGetWithdrawalById({
		transactionId: details?.transactionId,
		enabled: specificType === "withdrawal_receipt",
	});

	const isLoading = isFetchingTripReceipt || isFetchingTxnReceipt;
	const isError = isTripReceiptError || isTxnReceiptError;

	if (isError) {
		toast.error("Error fetching receipt details");
	}

	const receiptData =
		type === "transactionReceipt" ? withdrawalReceipt : tripReceipt;

	const isStatusField = (key: string) => key.toLowerCase().includes("status");

	const formatValue = (key: string, value: any) => {
		if (specificType === "customer_receipt" && key === "customer_name") {
			return null; // Remove driver_name
		}
		if (specificType === "driver_receipt" && key === "driver_name") {
			return null; // Remove customer_name
		}
		if (specificType === "driver_receipt" && key === "car") {
			return null; // Remove car name
		}
		if (specificType === "driver_receipt" && key === "plate_number") {
			return null; // remove plate_number when showing driver trip
		}

		if (value === 0) {
			return value; // Display the value if it is 0
		}
		return value || <span className="font-mono italic">Unknown</span>; // Display "Unknown" for null or undefined
	};

	const formatKey = (key: string) => {
		if (key.includes("id")) {
			const words = key.split("_");

			words[0] =
				words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();

			if (words.length > 1) {
				words[1] = words[1].toUpperCase();
			}

			return words.join(" ");
		}

		if (key === "vat") {
			return String(key).toUpperCase();
		}

		return toTitleCase(key);
	};

	const dataForExport =
		receiptData &&
		Object.entries(receiptData).map(([key, value]) => ({
			Field: key.replace(/_/g, " "),
			Value: value,
		}));

	return (
		<div className="pt-4 md:px-2 flex-column gap-3">
			<div>
				<h2 className="text-3xl">
					{type === "transactionReceipt"
						? "Withdrawal Details"
						: "Trip Details"}
				</h2>
				<p className="text-foreground-100 mt-0.5">Your transaction receipt</p>
			</div>

			<div className="my-5 px-1 grid place-items-center min-h-[63vh]">
				{isLoading ? (
					<div className="loader-container">
						<FallbackLoader />
					</div>
				) : receiptData ? (
					<div className="flex-column gap-3.5">
						{Object.entries(receiptData || []).map(([key, value], idx) => {
							const formattedValue = formatValue(key, value);

							// If formattedValue is null, skip this field
							if (formattedValue === null) return null;

							return (
								<div
									key={idx}
									className="row-flex-btwn gap-4 py-2.5 px-0.5 border-b border-grey-100 last:border-none"
								>
									<span className="font-semibold capitalize min-w-[10ch]">
										{formatKey(key || "")}
									</span>
									{isStatusField(key) ? (
										<StatusBadge status={value as Status} />
									) : (
										<p className="font-light text-foreground-100 capitalize max-w-[60ch] text-end">
											{formattedValue}
										</p>
									)}
								</div>
							);
						})}
					</div>
				) : (
					<EmptyList
						emptyTitle="No data"
						emptySubText=""
						containerStyles="h-full"
					/>
				)}
			</div>

			<div className="mt-auto grid grid-cols-1 gap-y-3 sm:grid-cols-[1fr_max-content] gap-x-6">
				<SheetClose asChild>
					<div className="badge-long !w-full h-10 whitespace-nowrap !px-7 !py-3.5">
						Close
					</div>
				</SheetClose>

				<DownloadReport data={dataForExport || []} filename="Receipt.xlsx">
					<Button title="Download receipt" />
				</DownloadReport>
			</div>
		</div>
	);
}

// @ts-ignore
const handleDownloadReceipt = (receiptData: any) => {
	const receipt = JSON.stringify(receiptData, null, 2);
	const blob = new Blob([receipt], { type: "application/json" });
	const link = document.createElement("a");
	link.href = URL.createObjectURL(blob);
	link.download = "receipt.json";
	link.click();
};

export default Receipt;
