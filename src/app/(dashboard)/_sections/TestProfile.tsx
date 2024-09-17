import { cn } from "@/lib/utils";
import { useState } from "react";
import { copyToClipBoard } from "@/utils";
import { Copy } from "@/constants/icons";

type ProfileProps = {
	isProfileVariant?: boolean;
	profileInfo?: any;
	headingTitle?: string;
	type?: "customerInfo" | "driverInfo" | "vehicleInfo" | "documents";
};

function TestProfile({
	isProfileVariant,
	profileInfo,
	type,
	headingTitle = "Vehicle Details",
}: ProfileProps) {
	const info: Record<string, any> = {
		name: profileInfo?.fullName,
		email: profileInfo?.emailAddress,
		phone: profileInfo?.phone,
		address: profileInfo?.img || "123 Main St",
		city: profileInfo?.img || "New York",
		state: profileInfo?.img || "NY",
		userSince: profileInfo?.img || "2021-01-01",
		img: profileInfo?.img,
	};

	const customerInfo = {
		deviceType: profileInfo?.deviceType,
		totalSpent: profileInfo?.totalAmountPaid,
		totalTrips: profileInfo?.totalTrips,
		creditCard: "****-****-****-4567",
		paymentMethods: profileInfo?.pyamentMethods || [
			"Credit Card",
			"PayPal",
			"Apple Pay",
		],
	};

	const driverInfo = {
		walletNo: "",
		status: profileInfo?.status,
		rating: profileInfo?.averageRating,
		totalEarnings: profileInfo?.earnings,
		totalTrips: profileInfo?.totalTrips,
		vehicleBrand: profileInfo?.vehicleBrand,
		vehicleModel: profileInfo?.vehicleModel,
		vehiclePlateNumber: profileInfo?.vehiclePlateNumber,
		vehicleColor: profileInfo?.vehicleColour,
		vehicleYear: profileInfo?.vehicleYear,
		vehicleImage: profileInfo?.vehicleImage,
		driverPhotoImage: profileInfo?.driverPhotoImage,
		driverLicenceImage: profileInfo?.driverLicenseImage,
		insuranceDocumentImage: profileInfo?.insuranceDocumentImage,
		inspectionDocumentImage: profileInfo?.inspectionDocumentImage,
		driverTrips: profileInfo?.driverWithdraws,
	};

	const genericKeys = [
		{ key: "name", label: "Full name" },
		{ key: "email", label: "Email address" },
		{ key: "phone", label: "Phone number" },
	];

	const keysOfCustomer = [
		...genericKeys,
		{ key: "paymentMethods", label: "Payment methods" },
		{ key: "orders", label: "Total trips" },
		{ key: "totalSpent", label: "Total amount paid" },
	];

	const keysOfDriver = [
		{ key: "status", label: "Full name" },
		...genericKeys,
		{ key: "walletNo", label: "Wallet number" },
		{ key: "rating", label: "Rating" },
		{ key: "totalTrips", label: "Total trips" },
		{ key: "earnings", label: "Total Earnings" },
	];

	const keysOfVehicleDetails = [
		{ key: "vehicleBrand", label: "Vehicle brand" },
		{ key: "vehicleModel", label: "Vehicle model" },
		{ key: "vehiclePlateNumber", label: "Vehicle plate number" },
		{ key: "vehicleColor", label: "Vehicle colour" },
		{ key: "vehicleYear", label: "Vehicle year of production" },
	];

	const keysOfDocuments = [
		{ key: "driverPhotoImage", label: "Driver's photo" },
		{ key: "driverLicenceImage", label: "Driver's License" },
		{ key: "insuranceDocumentImage", label: "Insurance document" },
		{ key: "vehicleImage", label: "Vehicle Images" },
		{ key: "inspectionDocumentImage", label: "Insepection document" },
	];

	let keys;
	switch (type) {
		case "customerInfo":
			keys = keysOfCustomer;
			break;

		case "driverInfo":
			keys = keysOfDriver;
			break;

		case "vehicleInfo":
			keys = keysOfVehicleDetails;
			break;

		case "documents":
			keys = keysOfDocuments;
			break;

		default:
			keys = genericKeys;
			break;
	}

	const [copiedStatus, setCopiedStatus] = useState<Record<string, boolean>>({});

	const handleCopyValue = (text: string, key: string) => {
		if (!text) return;
		copyToClipBoard(text, key, setCopiedStatus);
	};

	return (
		<div className="rounded-sm border border-border text-base">
			<div className="row-flex-btwn w-full gap-4 bg-background-200 px-3 py-3 brightness-105">
				<p className="font-semibold">{headingTitle}</p>
			</div>

			<>
				{keys.map(
					({ key, label }) =>
						info[key] && (
							<div
								className="row-flex-btwn group w-full gap-4 border-t border-border px-4 py-3"
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
											: "flex-1 max-sm:!justify-end max-sm:text-end"
									)}
								>
									<p
										className={cn(
											"font-medium",
											key === "email" && "text-sm underline"
										)}
									>
										{Array.isArray(info[key])
											? info[key].join(", ")
											: info[key]}
									</p>

									<div
										onClick={() => handleCopyValue(info[key], key)}
										className="cursor-pointer group-hover:max-sm:block sm:hidden"
									>
										<Copy className="size-5" />
									</div>

									<div
										className="hidden cursor-pointer rounded-full border border-border px-3 py-1.5 text-xs font-semibold capitalize transition group-hover:sm:block"
										onClick={() => handleCopyValue(info[key], key)}
									>
										{copiedStatus[key] ? "copied" : "copy"}{" "}
									</div>
								</div>
							</div>
						)
				)}
			</>
		</div>
	);
}

export default TestProfile;
